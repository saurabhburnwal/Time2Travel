Verify coordinates in CSVs using OpenStreetMap Nominatim
=====================================================

What this does
---------------
- Reads `Places_Table.csv`, `Hotels_Table.csv`, and `Destination_Table.csv`.
- Queries OpenStreetMap Nominatim to get canonical coordinates for each place/hotel.
- Computes distance between existing coordinates and OSM coordinates.
- Writes updated CSVs to the output directory with added columns: `verified_latitude`, `verified_longitude`, `distance_meters`, `updated`.

Prerequisites
-------------
- Python 3.8+
- Install dependencies:

```bash
pip install -r tools/requirements.txt
```

Usage
-----
Run against your local copies of the CSVs. Example (Windows cmd):

```cmd
python tools/verify_coordinates.py --places "f:\\CHRIST UNIVERSITY MCA\\III Trimester\\SPD\\Telangana\\Places_Table.csv" \
  --hotels "f:\\CHRIST UNIVERSITY MCA\\III Trimester\\SPD\\Telangana\\Hotels_Table.csv" \
  --destinations "f:\\CHRIST UNIVERSITY MCA\\III Trimester\\SPD\\Telangana\\Destination_Table.csv" \
  --outdir verified_output --threshold 1000
```

Notes
-----
- Nominatim requires a pause between requests. The script defaults to 1.1s per request (`--sleep`).
- For large runs, consider caching or using your own Nominatim instance to avoid rate limits.
- The script does not automatically overwrite original CSVs; it writes `<originalname>_verified.csv` in `--outdir`.

Next steps
----------
- Run the script locally. If you want, I can run it here but that may hit the public Nominatim rate limits and policy.
