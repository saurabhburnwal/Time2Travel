#!/usr/bin/env python3
"""Verify and optionally update coordinates in place/hotels CSVs using OpenStreetMap Nominatim.

Usage example:
  python tools/verify_coordinates.py \
    --places dataset/Places_Table.csv \
    --hotels f:/path/to/Hotels_Table.csv \
    --destinations f:/path/to/Destination_Table.csv \
    --outdir verified_output --threshold 1000

The script writes <originalname>_verified.csv into `--outdir` and respects Nominatim rate limits.
"""
from __future__ import annotations
import argparse
import os
from typing import Optional

import pandas as pd
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from geopy.distance import geodesic
from tqdm import tqdm


def build_query(name: str, dest_name: Optional[str]) -> str:
    parts = [name]
    if dest_name:
        parts.append(dest_name)
    parts.append("Telangana")
    parts.append("India")
    return ", ".join([p for p in parts if p and not pd.isna(p)])


def verify_dataframe(
    df: pd.DataFrame,
    name_col: str,
    lat_col: str,
    lon_col: str,
    dest_map: Optional[dict],
    geocode_fn,
    threshold_meters: float,
    max_rows: Optional[int] = None,
):
    results = []
    it = df.itertuples(index=False)
    if max_rows:
        it = list(df.itertuples(index=False))[:max_rows]

    total = max_rows or len(df)
    for row in tqdm(it, total=total, desc=f"Verifying {name_col}"):
        # row is a namedtuple; convert to dict-like access
        if hasattr(row, "_asdict"):
            rowd = row._asdict()
        else:
            # fallback for older pandas versions
            rowd = {c: getattr(row, c) for c in df.columns}

        name = rowd.get(name_col)
        dest_name = None
        if dest_map and "destination_id" in rowd:
            dest_name = dest_map.get(rowd.get("destination_id"))

        query = build_query(name, dest_name)
        verified_lat = None
        verified_lon = None
        try:
            loc = geocode_fn(query)
            if loc:
                verified_lat = float(loc.latitude)
                verified_lon = float(loc.longitude)
        except Exception:
            verified_lat = None
            verified_lon = None

        orig_lat = rowd.get(lat_col)
        orig_lon = rowd.get(lon_col)
        distance_m = None
        updated = False
        if verified_lat is not None and orig_lat is not None and orig_lon is not None:
            try:
                distance_m = geodesic((orig_lat, orig_lon), (verified_lat, verified_lon)).meters
                if distance_m > threshold_meters:
                    updated = True
            except Exception:
                distance_m = None

        outrow = {col: rowd.get(col) for col in df.columns}
        outrow.update({
            "verified_latitude": verified_lat,
            "verified_longitude": verified_lon,
            "distance_meters": distance_m,
            "updated": updated,
        })
        results.append(outrow)

    return pd.DataFrame(results)


def load_destinations(path: str) -> dict:
    # try utf-8 first, fall back to latin1 for files with special characters
    try:
        df = pd.read_csv(path)
    except UnicodeDecodeError:
        df = pd.read_csv(path, encoding="latin1")
    return dict(zip(df["destination_id"], df["name"]))


def main():
    parser = argparse.ArgumentParser(description="Verify and update coordinates using OSM Nominatim")
    parser.add_argument("--places", help="Path to places CSV (Places_Table.csv)")
    parser.add_argument("--hotels", help="Path to hotels CSV (Hotels_Table.csv)")
    parser.add_argument("--destinations", help="Path to Destination_Table.csv (for city names)")
    parser.add_argument("--outdir", default="verified_output", help="Directory to write verified CSVs")
    parser.add_argument("--threshold", type=float, default=1000.0, help="Distance threshold in meters to consider coordinates mismatched")
    parser.add_argument("--max-rows", type=int, default=0, help="(optional) limit rows for quick tests; 0 = all")
    parser.add_argument("--sleep", type=float, default=1.1, help="Seconds between geocoding requests (Nominatim policy: >=1s)")
    args = parser.parse_args()

    os.makedirs(args.outdir, exist_ok=True)

    if not args.destinations:
        print("--destinations is required to resolve destination names for queries")
        return

    dest_map = load_destinations(args.destinations)

    # Initialize geocoder
    geolocator = Nominatim(user_agent="telangana-csv-verifier")
    geocode_fn = RateLimiter(geolocator.geocode, min_delay_seconds=args.sleep)

    max_rows = args.max_rows or None

    if args.places:
        try:
            places_df = pd.read_csv(args.places)
        except UnicodeDecodeError:
            places_df = pd.read_csv(args.places, encoding="latin1")
        verified_places = verify_dataframe(
            places_df,
            name_col="place_name",
            lat_col="latitude",
            lon_col="longitude",
            dest_map=dest_map,
            geocode_fn=geocode_fn,
            threshold_meters=args.threshold,
            max_rows=max_rows,
        )
        out_path = os.path.join(args.outdir, os.path.splitext(os.path.basename(args.places))[0] + "_verified.csv")
        verified_places.to_csv(out_path, index=False)
        print(f"Wrote verified places to {out_path}")

    if args.hotels:
        try:
            hotels_df = pd.read_csv(args.hotels)
        except UnicodeDecodeError:
            hotels_df = pd.read_csv(args.hotels, encoding="latin1")
        verified_hotels = verify_dataframe(
            hotels_df,
            name_col="name",
            lat_col="latitude",
            lon_col="longitude",
            dest_map=dest_map,
            geocode_fn=geocode_fn,
            threshold_meters=args.threshold,
            max_rows=max_rows,
        )
        out_path = os.path.join(args.outdir, os.path.splitext(os.path.basename(args.hotels))[0] + "_verified.csv")
        verified_hotels.to_csv(out_path, index=False)
        print(f"Wrote verified hotels to {out_path}")


if __name__ == "__main__":
    main()
