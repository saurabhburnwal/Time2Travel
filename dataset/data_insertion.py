#!/usr/bin/env python3
"""
Import CSV data from dataset folder into Supabase database
"""
import csv
import re
import sys
from pathlib import Path
from supabase import create_client, Client

# Add the parent directory to the path to import modules if needed
sys.path.append(str(Path(__file__).parent))

BATCH_SIZE = 500  # Max rows per Supabase insert call

def read_csv(filepath):
    """Read CSV file and return rows"""
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)

def fetch_all_rows(supabase: Client, table: str, columns: str):
    """Fetch all rows from a Supabase table using pagination (default limit is 1000)"""
    all_rows = []
    page_size = 1000
    offset = 0
    while True:
        res = supabase.table(table).select(columns).range(offset, offset + page_size - 1).execute()
        all_rows.extend(res.data)
        if len(res.data) < page_size:
            break
        offset += page_size
    return all_rows

def batch_insert(supabase: Client, table: str, data: list):
    """Insert data in batches to avoid request-size limits"""
    inserted = 0
    for i in range(0, len(data), BATCH_SIZE):
        chunk = data[i:i + BATCH_SIZE]
        supabase.table(table).insert(chunk).execute()
        inserted += len(chunk)
    return inserted

def clean_entry_fee(fee_str):
    """Extract numeric value from entry fee strings like 'INR 20' or 'Free'"""
    if not fee_str:
        return 0.0
    fee_str = fee_str.strip().lower()
    if 'free' in fee_str or 'varies' in fee_str:
        return 0.0
    
    match = re.search(r'\d+(\.\d+)?', fee_str)
    if match:
        return float(match.group())
    return 0.0

def insert_data(supabase: Client):
    """Insert data from CSV files into Supabase tables"""
    dataset_dir = Path(__file__).parent
    
    # Read all CSV files (4 updated state-specific files)
    ka_kl_hotels = (
        read_csv(dataset_dir / 'karnataka_hotels_updated.csv') +
        read_csv(dataset_dir / 'kerala_hotels_updated.csv')
    )
    ka_kl_places = (
        read_csv(dataset_dir / 'karnataka_places_updated.csv') +
        read_csv(dataset_dir / 'kerala_places_updated.csv')
    )
    
    # ==========================================
    # 1. DYNAMICALLY MAP & INSERT TRAVEL TYPES
    # ==========================================
    print("Processing Travel Types...")
    # Query existing travel types
    existing_tt_data = fetch_all_rows(supabase, 'travel_types', 'travel_type_id, name')
    existing_tt_map = {row['name']: row['travel_type_id'] for row in existing_tt_data}
    
    categories = set(row.get('category', '').strip() for row in ka_kl_places if row.get('category', '').strip())
    travel_type_map = existing_tt_map.copy()
    
    current_max_tt_id = max((row['travel_type_id'] for row in existing_tt_data), default=0)
    next_tt_id = current_max_tt_id + 1
    
    for cat in categories:
        if cat not in travel_type_map:
            res = supabase.table('travel_types').insert({'travel_type_id': next_tt_id, 'name': cat}).execute()
            if res.data:
                travel_type_map[cat] = next_tt_id
                next_tt_id += 1
                
    print(f"Processed {len(travel_type_map)} travel types.")

    # ==========================================
    # 2. DYNAMICALLY MAP & INSERT DESTINATIONS
    # ==========================================
    print("Processing Destinations...")
    # Query existing destinations
    existing_dest_data = fetch_all_rows(supabase, 'destinations', 'destination_id, name, state')
    existing_dest_map = {(row['state'], row['name']): row['destination_id'] for row in existing_dest_data}
    
    destinations_map = existing_dest_map.copy()
    
    current_max_dest_id = max((row['destination_id'] for row in existing_dest_data), default=0)
    next_dest_id = current_max_dest_id + 1
    
    for row in ka_kl_hotels + ka_kl_places:
        city = row.get('city', '').strip()
        state = row.get('state', '').strip()
        
        if city and state and (state, city) not in destinations_map:
            # Insert destination and immediately capture the generated destination_id
            res = supabase.table('destinations').insert({'destination_id': next_dest_id, 'name': city, 'state': state}).execute()
            
            if res.data:
                destinations_map[(state, city)] = next_dest_id
                next_dest_id += 1
                
    print(f"Processed {len(destinations_map)} unique destinations.")

    # ==========================================
    # 3. BULK INSERT HOTELS
    # ==========================================
    print("Preparing Hotels...")
    # Query existing hotels
    existing_hotel_data = fetch_all_rows(supabase, 'hotels', 'hotel_id, name, destination_id')
    existing_hotel_set = {(row['name'], row['destination_id']) for row in existing_hotel_data}
    
    hotel_data = []
    for row in ka_kl_hotels:
        state = row.get('state', '').strip()
        city = row.get('city', '').strip()
        hotel_name = row.get('hotel_name', '').strip()
        price = row.get('avg_price_per_night_inr', '').strip()
        rating = row.get('rating', '').strip()
        lat = row.get('latitude', '').strip()
        lon = row.get('longitude', '').strip()
        
        dest_id = destinations_map.get((state, city))
        if not hotel_name or not dest_id or (hotel_name, dest_id) in existing_hotel_set:
            continue
            
        hotel_data.append({
            'destination_id': dest_id,
            'name': hotel_name,
            'price_per_night': float(price) if price else None,
            'rating': float(rating) if rating else None,
            'latitude': float(lat) if lat else None,
            'longitude': float(lon) if lon else None
        })
    
    if hotel_data:
        count = batch_insert(supabase, 'hotels', hotel_data)
        print(f"Inserted {count} hotels.")
    else:
        print("No new hotels to insert (all already exist).")

    # ==========================================
    # 4. BULK INSERT PLACES
    # ==========================================
    print("Preparing Places...")
    # Query existing places
    existing_place_data = fetch_all_rows(supabase, 'places', 'place_id, name, destination_id')
    existing_place_set = {(row['name'], row['destination_id']) for row in existing_place_data}
    
    place_data = []
    for row in ka_kl_places:
        state = row.get('state', '').strip()
        city = row.get('city', '').strip()
        place_name = row.get('place_name', '').strip()
        category = row.get('category', '').strip()
        lat = row.get('latitude', '').strip()
        lon = row.get('longitude', '').strip()
        visit_time = row.get('avg_visit_duration_minutes', '').strip()
        
        dest_id = destinations_map.get((state, city))
        type_id = travel_type_map.get(category)
        
        if not place_name or not dest_id or (place_name, dest_id) in existing_place_set:
            continue
            
        place_data.append({
            'destination_id': dest_id,
            'travel_type_id': type_id,
            'name': place_name,
            'latitude': float(lat) if lat else None,
            'longitude': float(lon) if lon else None,
            'entry_fee': clean_entry_fee(row.get('entry_fee', '')),
            'avg_visit_time': int(float(visit_time)) if visit_time else None
        })
    
    if place_data:
        count = batch_insert(supabase, 'places', place_data)
        print(f"Inserted {count} places.")
    else:
        print("No new places to insert (all already exist).")
    
    print("✅ Data insertion completed successfully!")

def main():
    """Main function"""
    print("Initiating Supabase Seed Process...")
    
    # Supabase configuration (Localhost)
    url = "http://localhost:54321"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
    
    try:
        supabase: Client = create_client(url, key)
        insert_data(supabase)
    except Exception as e:
        print(f"❌ Error connecting to Supabase or inserting data: {e}")
        print("Make sure Supabase is running locally. Run 'supabase start' in the Time2Travel directory.")

if __name__ == "__main__":
    main()