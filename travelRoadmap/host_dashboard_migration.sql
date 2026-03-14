-- host_dashboard_migration.sql

CREATE TABLE IF NOT EXISTS HOST_PROPERTIES (
    property_id SERIAL PRIMARY KEY,
    host_id INT REFERENCES HOST_PROFILES(host_id),
    destination_id INT REFERENCES DESTINATIONS(destination_id),
    property_name VARCHAR(150),
    address TEXT,
    max_guests INT,
    provides_food BOOLEAN DEFAULT false,
    voluntary_min_amount DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS HOST_BOOKINGS (
    booking_id SERIAL PRIMARY KEY,
    property_id INT REFERENCES HOST_PROPERTIES(property_id),
    host_id INT REFERENCES HOST_PROFILES(host_id),
    traveler_id INT REFERENCES USERS(user_id),
    roadmap_id INT REFERENCES ROADMAPS(roadmap_id),
    check_in_day INT,
    check_out_day INT,
    status VARCHAR(20) DEFAULT 'pending',
    contribution_received DECIMAL(10,2),
    host_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS HOST_UNAVAILABILITY (
    unavailability_id SERIAL PRIMARY KEY,
    host_id INT REFERENCES HOST_PROFILES(host_id),
    property_id INT REFERENCES HOST_PROPERTIES(property_id),
    blocked_date DATE,
    reason VARCHAR(200)
);
