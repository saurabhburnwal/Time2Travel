-- Fix all schema mismatches between migrations and seed.sql
-- These columns/tables were previously created at runtime by backend controllers,
-- which caused seed.sql to fail on fresh setups (supabase db reset).

-- 1. Create host_reviews table (was created at runtime in reviewController.js)
CREATE TABLE IF NOT EXISTS host_reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    roadmap_id INTEGER REFERENCES roadmaps(roadmap_id),
    host_name VARCHAR(200),
    property_type VARCHAR(50),
    cleanliness_rating INTEGER,
    communication_rating INTEGER,
    hospitality_rating INTEGER,
    overall_rating INTEGER,
    payment_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add destination_id to travel_preferences (was added at runtime in preferencesController.js)
ALTER TABLE travel_preferences ADD COLUMN IF NOT EXISTS destination_id INTEGER REFERENCES destinations(destination_id);

-- 3. Add missing columns to roadmaps (were added at runtime in roadmapController.js)
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS stay_type VARCHAR(20);
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS selected_stay VARCHAR(200);
