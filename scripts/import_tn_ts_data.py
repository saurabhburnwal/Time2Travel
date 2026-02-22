#!/usr/bin/env python3
"""
Import TN, TS and TRAVEL_TYPES data from dataset folder into Supabase database.
Appends to the existing seed.sql file (which already has AP + Goa data).

Existing seed.sql state:
  - 42 destinations (IDs 1-42)
  - 400 hotels     (IDs 1-400)
  - 400 places     (IDs 1-400)

New data adds:
  - TN: 20 destinations, 200 hotels, 200 places
  - TS: 20 destinations, 200 hotels, 200 places
  - 5 travel_types
"""
import csv
import sys
from pathlib import Path

# Try to import openpyxl for .xlsx files
try:
    import openpyxl
except ImportError:
    print("ERROR: openpyxl is required. Install it with: pip install openpyxl")
    sys.exit(1)


def read_csv(filepath):
    """Read CSV file and return rows as list of dicts."""
    for enc in ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252']:
        try:
            with open(filepath, 'r', encoding=enc) as f:
                reader = csv.DictReader(f)
                return list(reader)
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Cannot decode {filepath}")


def read_xlsx(filepath):
    """Read XLSX file and return rows as list of dicts."""
    wb = openpyxl.load_workbook(filepath)
    ws = wb.active
    assert ws is not None, f"No active worksheet in {filepath}"
    row_iter = ws.iter_rows(values_only=True)
    first_row = next(row_iter, None)
    if first_row is None:
        return []
    assert first_row is not None
    headers = [str(h).strip() for h in first_row]
    result = []
    for row in row_iter:
        d = {}
        for i, val in enumerate(row):
            d[headers[i]] = val
        result.append(d)
    return result


def escape_sql(val):
    """Escape single quotes for SQL."""
    if val is None:
        return ''
    return str(val).replace("'", "''")


def safe_num(val, fallback='NULL'):
    """Convert a value to a number string or NULL."""
    if val is None or str(val).strip() == '':
        return fallback
    return str(val).strip()


def generate_sql():
    """Generate SQL INSERT statements for TN, TS and TRAVEL_TYPES data."""
    dataset_dir = Path(__file__).parent.parent / 'dataset'

    # --- Read all files ---
    tn_destinations = read_csv(dataset_dir / 'TN_Destination_Table.csv')
    tn_hotels = read_csv(dataset_dir / 'TN_Hotels_Table.csv')
    tn_places = read_xlsx(dataset_dir / 'TN_Places_Table.xlsx')
    ts_destinations = read_csv(dataset_dir / 'TS_Destination_Table.csv')
    ts_hotels = read_csv(dataset_dir / 'TS_Hotels_Table.csv')
    ts_places = read_csv(dataset_dir / 'TS_Places_Table.csv')
    travel_types = read_xlsx(dataset_dir / 'TRAVEL_TYPES.xlsx')

    print(f"Read: TN dest={len(tn_destinations)}, TN hotels={len(tn_hotels)}, TN places={len(tn_places)}")
    print(f"Read: TS dest={len(ts_destinations)}, TS hotels={len(ts_hotels)}, TS places={len(ts_places)}")
    print(f"Read: travel_types={len(travel_types)}")

    # Offsets (existing data ends at these IDs)
    DEST_OFFSET = 42    # existing destinations 1-42
    HOTEL_OFFSET = 400  # existing hotels 1-400
    PLACE_OFFSET = 400  # existing places 1-400

    sql = []
    sql.append("")
    sql.append("-- ============================================")
    sql.append("-- Tamil Nadu + Telangana + Travel Types Data")
    sql.append("-- ============================================")
    sql.append("")

    # --- TRAVEL_TYPES ---
    sql.append("-- Insert travel_types")
    for row in travel_types:
        type_id = int(float(str(row.get('travel_type_id', row.get('type_id', 0)))))
        name = escape_sql(row.get('name', ''))
        sql.append(
            f"INSERT INTO travel_types (travel_type_id, name) "
            f"VALUES ({type_id}, '{name}');"
        )
    sql.append("")

    # --- TN DESTINATIONS ---
    sql.append("-- Insert Tamil Nadu destinations")
    for row in tn_destinations:
        old_id = int(row['destination_id'])
        new_id = DEST_OFFSET + old_id  # 42 + 1 = 43, 42 + 20 = 62
        name = escape_sql(row['name'])
        state = escape_sql(row['state'])
        description = escape_sql(row.get('description', ''))
        best_season = escape_sql(row.get('best_season', ''))
        sql.append(
            f"INSERT INTO destinations (destination_id, name, state, description, best_season) "
            f"VALUES ({new_id}, '{name}', '{state}', '{description}', '{best_season}');"
        )
    sql.append("")

    # --- TS DESTINATIONS ---
    sql.append("-- Insert Telangana destinations")
    for row in ts_destinations:
        old_id = int(row['destination_id'])
        new_id = DEST_OFFSET + 20 + old_id  # 62 + 1 = 63, 62 + 20 = 82
        name = escape_sql(row['name'])
        state = escape_sql(row['state'])
        description = escape_sql(row.get('description', ''))
        best_season = escape_sql(row.get('best_season', ''))
        sql.append(
            f"INSERT INTO destinations (destination_id, name, state, description, best_season) "
            f"VALUES ({new_id}, '{name}', '{state}', '{description}', '{best_season}');"
        )
    sql.append("")

    # --- TN HOTELS ---
    sql.append("-- Insert Tamil Nadu hotels")
    for row in tn_hotels:
        old_id = int(row['hotel_id'])
        new_id = HOTEL_OFFSET + old_id  # 400 + 1 = 401, etc.
        old_dest_id = int(row['destination_id'])
        new_dest_id = DEST_OFFSET + old_dest_id
        name = escape_sql(row['name'])
        price = safe_num(row.get('price_per_night_INR', ''))
        rating = safe_num(row.get('rating', ''))
        lat = safe_num(row.get('latitude', ''))
        lon = safe_num(row.get('longitude', ''))
        sql.append(
            f"INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) "
            f"VALUES ({new_id}, {new_dest_id}, '{name}', {price}, {rating}, {lat}, {lon});"
        )
    sql.append("")

    # --- TS HOTELS ---
    sql.append("-- Insert Telangana hotels")
    for row in ts_hotels:
        old_id = int(row['hotel_id'])
        new_id = HOTEL_OFFSET + 200 + old_id  # 600 + 1 = 601, etc.
        old_dest_id = int(row['destination_id'])
        new_dest_id = DEST_OFFSET + 20 + old_dest_id
        name = escape_sql(row['name'])
        price = safe_num(row.get('price_per_night_INR', ''))
        rating = safe_num(row.get('rating', ''))
        lat = safe_num(row.get('latitude', ''))
        lon = safe_num(row.get('longitude', ''))
        sql.append(
            f"INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) "
            f"VALUES ({new_id}, {new_dest_id}, '{name}', {price}, {rating}, {lat}, {lon});"
        )
    sql.append("")

    # --- TN PLACES ---
    sql.append("-- Insert Tamil Nadu places")
    for row in tn_places:
        old_id = int(row.get('place_id', 0))
        new_id = PLACE_OFFSET + old_id  # 400 + 1 = 401, etc.
        old_dest_id = int(row.get('dest_id', 0))
        new_dest_id = DEST_OFFSET + old_dest_id
        type_id = safe_num(row.get('type_id', ''))
        name = escape_sql(row.get('name', ''))
        lat = safe_num(row.get('latitude', ''))
        lon = safe_num(row.get('longitude', ''))
        fee = safe_num(row.get('fee', ''))
        time_min = safe_num(row.get('time (min)', ''))
        sql.append(
            f"INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) "
            f"VALUES ({new_id}, {new_dest_id}, {type_id}, '{name}', {lat}, {lon}, {fee}, {time_min});"
        )
    sql.append("")

    # --- TS PLACES ---
    # TS CSV columns: place_id, destination_id, travel_type_id, place_name, latitude, longitude, entry_fee, avg_time_minutes
    sql.append("-- Insert Telangana places")
    for row in ts_places:
        old_id = int(row.get('place_id', 0))
        new_id = PLACE_OFFSET + 200 + old_id  # 600 + 1 = 601, etc.
        old_dest_id = int(row.get('destination_id', 0))
        new_dest_id = DEST_OFFSET + 20 + old_dest_id
        type_id = safe_num(row.get('travel_type_id', ''))
        name = escape_sql(row.get('place_name', row.get('name', '')))
        lat = safe_num(row.get('latitude', ''))
        lon = safe_num(row.get('longitude', ''))
        fee = safe_num(row.get('entry_fee', ''))
        time_min = safe_num(row.get('avg_time_minutes', ''))
        sql.append(
            f"INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) "
            f"VALUES ({new_id}, {new_dest_id}, {type_id}, '{name}', {lat}, {lon}, {fee}, {time_min});"
        )
    sql.append("")

    # --- Update sequences ---
    new_dest_max = DEST_OFFSET + 20 + 20  # 82
    new_hotel_max = HOTEL_OFFSET + 200 + 200  # 800
    new_place_max = PLACE_OFFSET + 200 + 200  # 800
    sql.append("-- Reset sequences")
    sql.append(f"SELECT setval('destinations_destination_id_seq', {new_dest_max + 1});")
    sql.append(f"SELECT setval('hotels_hotel_id_seq', {new_hotel_max + 1});")
    sql.append(f"SELECT setval('places_place_id_seq', {new_place_max + 1});")

    return '\n'.join(sql)


def main():
    print("Generating SQL for TN, TS and TRAVEL_TYPES data...")

    sql = generate_sql()

    # Read existing seed.sql
    seed_file = Path(__file__).parent.parent / 'supabase' / 'seed.sql'
    existing = seed_file.read_text(encoding='utf-8')

    # Remove existing sequence reset lines at the end
    lines = existing.rstrip().split('\n')
    # Find and remove old sequence reset lines
    clean_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("SELECT setval("):
            continue
        if stripped == '-- Reset sequences':
            continue
        clean_lines.append(line)

    # Write updated seed.sql
    with open(seed_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(clean_lines))
        f.write('\n')
        f.write(sql)
        f.write('\n')

    print(f"[OK] Updated {seed_file}")
    print(f"  Added 40 destinations (IDs 43-82)")
    print(f"  Added 400 hotels (IDs 401-800)")
    print(f"  Added 400 places (IDs 401-800)")
    print(f"  Added 5 travel_types")
    print()
    print("To import the data, run:")
    print("  supabase db reset")


if __name__ == '__main__':
    main()
