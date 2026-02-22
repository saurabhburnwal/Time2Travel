SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 1wxoB1vXbaYEzgZtJyp3xZSbjQyiMTxohfkfM87cUC3r2fYM5DhHPwgJY88jMuN

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

<<<<<<< HEAD

-- ============================================
-- Tamil Nadu + Telangana + Travel Types Data
-- ============================================

-- Insert travel_types
INSERT INTO travel_types (travel_type_id, name) VALUES (1, 'Nature');
INSERT INTO travel_types (travel_type_id, name) VALUES (2, 'Adventure');
INSERT INTO travel_types (travel_type_id, name) VALUES (3, 'Beach');
INSERT INTO travel_types (travel_type_id, name) VALUES (4, 'Heritage');
INSERT INTO travel_types (travel_type_id, name) VALUES (5, 'Nightlife');

-- Insert Tamil Nadu destinations
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (43, 'Chennai', 'Tamil Nadu', 'Capital city with beaches, temples and IT hub', 'Oct-Feb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (44, 'Coimbatore', 'Tamil Nadu', 'Textile city and gateway to Nilgiris', 'Oct-Feb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (45, 'Madurai', 'Tamil Nadu', 'Temple city with Meenakshi Temple', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (46, 'Ooty', 'Tamil Nadu', 'Queen of hill stations in Nilgiris', ' Sep-Nov');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (47, 'Kodaikanal', 'Tamil Nadu', 'Princess of hill stations with lakes', ' Sep-Oct');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (48, 'Rameswaram', 'Tamil Nadu', 'Sacred pilgrimage island destination', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (49, 'Kanyakumari', 'Tamil Nadu', 'Southern tip with ocean confluence', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (50, 'Thanjavur', 'Tamil Nadu', 'Art and culture hub with Brihadeeswarar Temple', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (51, 'Tiruchirappalli', 'Tamil Nadu', 'Historic city with Rock Fort Temple', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (52, 'Salem', 'Tamil Nadu', 'Steel city with Yercaud hills nearby', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (53, 'Yercaud', 'Tamil Nadu', 'Hill station known as Jewel of South', 'Oct-Jun');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (54, 'Vellore', 'Tamil Nadu', 'Fort city with Golden Temple', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (55, 'Tirunelveli', 'Tamil Nadu', 'Temple town famous for Halwa', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (56, 'Thoothukudi', 'Tamil Nadu', 'Port city known as Pearl City', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (57, 'Nagapattinam', 'Tamil Nadu', 'Coastal town with temples and beaches', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (58, 'Kumbakonam', 'Tamil Nadu', 'Temple town with architectural marvels', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (59, 'Pollachi', 'Tamil Nadu', 'Agricultural town and coconut capital', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (60, 'Valparai', 'Tamil Nadu', 'Hill station with tea estates', 'Sep-May');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (61, 'Hosur', 'Tamil Nadu', 'Industrial city near Bangalore border', 'Oct-Mar');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (62, 'Cuddalore', 'Tamil Nadu', 'Port city with beaches and temples', 'Oct-Mar');

-- Insert Telangana destinations
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (63, 'Hyderabad', 'Telangana', 'Capital city with heritage, food and nightlife', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (64, 'Warangal', 'Telangana', 'Historic Kakatiya capital', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (65, 'Nizamabad', 'Telangana', 'Cultural city with temples and forts', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (66, 'Karimnagar', 'Telangana', 'Gateway to forts and reservoirs', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (67, 'Khammam', 'Telangana', 'Nature-rich district with temples', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (68, 'Adilabad', 'Telangana', 'Waterfalls and forest landscapes', 'JulFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (69, 'Medak', 'Telangana', 'Historic cathedral town', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (70, 'Mahabubnagar', 'Telangana', 'Heritage forts and lakes', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (71, 'Nalgonda', 'Telangana', 'Historical forts and Buddhist sites', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (72, 'Sangareddy', 'Telangana', 'Industrial city with lakes', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (73, 'Vikarabad', 'Telangana', 'Hill region near Hyderabad', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (74, 'Mancherial', 'Telangana', 'Forests and river views', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (75, 'Jagtial', 'Telangana', 'Temple town near Godavari', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (76, 'Bhadrachalam', 'Telangana', 'Major pilgrimage center', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (77, 'Siddipet', 'Telangana', 'Reservoirs and temples', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (78, 'Yadadri', 'Telangana', 'Famous hill temple town', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (79, 'Kothagudem', 'Telangana', 'Coal city with nature escapes', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (80, 'Medchal', 'Telangana', 'Suburban cultural destination', 'OctFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (81, 'Asifabad', 'Telangana', 'Tribal forests and waterfalls', 'JulFeb');
INSERT INTO destinations (destination_id, name, state, description, best_season) VALUES (82, 'Narayanpet', 'Telangana', 'Handloom and heritage town', 'OctFeb');

-- Insert Tamil Nadu hotels
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (401, 43, 'Taj Coromandel', 18000, 4.8, 13.128259, 80.232944);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (402, 43, 'ITC Grand Chola', 16500, 4.7, 13.118123, 80.301535);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (403, 43, 'The Leela Palace Chennai', 15000, 4.6, 13.124555, 80.292576);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (404, 43, 'Radisson Blu City Centre', 6500, 4.5, 13.075971, 80.288137);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (405, 43, 'Hyatt Regency Chennai', 6000, 4.4, 13.046892, 80.236197);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (406, 43, 'ibis Chennai OMR', 5500, 4.3, 13.085185, 80.250977);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (407, 43, 'Ginger Chennai', 5000, 4.2, 13.106949, 80.319995);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (408, 43, 'Hotel Savera', 1800, 4.1, 13.093417, 80.252146);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (409, 43, 'Treebo Trend Mount Road', 1800, 4.0, 13.105082, 80.254498);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (410, 43, 'Zostel Chennai', 1800, 3.9, 13.117355, 80.312943);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (411, 44, 'Vivanta Coimbatore', 18000, 4.8, 10.994445, 76.939962);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (412, 44, 'Radisson Blu Coimbatore', 16500, 4.7, 11.049555, 76.933329);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (413, 44, 'The Residency Towers', 15000, 4.6, 10.97006, 76.973434);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (414, 44, 'Fairfield by Marriott', 6500, 4.5, 10.973667, 76.972695);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (415, 44, 'Zone by The Park', 6000, 4.4, 11.029536, 76.971811);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (416, 44, 'ibis Coimbatore', 5500, 4.3, 11.004796, 76.918008);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (417, 44, 'Ginger Coimbatore', 5000, 4.2, 11.004296, 76.989598);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (418, 44, 'Hotel CAG Pride', 1800, 4.1, 10.991903, 76.956365);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (419, 44, 'Treebo Trend ESS Grande', 1800, 4.0, 11.040153, 76.931368);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (420, 44, 'Zostel Coimbatore', 1800, 3.9, 11.055489, 76.925083);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (421, 45, 'Heritage Madurai', 18000, 4.8, 9.917073, 78.144138);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (422, 45, 'Gateway Hotel Pasumalai', 16500, 4.7, 9.93301, 78.141415);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (423, 45, 'Fortune Pandiyan', 15000, 4.6, 9.936675, 78.110183);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (424, 45, 'JC Residency', 6500, 4.5, 9.910923, 78.116291);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (425, 45, 'Regency Madurai', 6000, 4.4, 9.918629, 78.148723);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (426, 45, 'Royal Court Hotel', 5500, 4.3, 9.919992, 78.122106);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (427, 45, 'Hotel Supreme', 5000, 4.2, 9.964046, 78.110221);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (428, 45, 'Hotel Park Plaza', 1800, 4.1, 9.930869, 78.085288);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (429, 45, 'Treebo Trend Madurai', 1800, 4.0, 9.958397, 78.138243);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (430, 45, 'Zostel Madurai', 1800, 3.9, 9.943619, 78.10738);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (431, 46, 'Savoy Ooty', 18000, 4.8, 11.401433, 76.712264);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (432, 46, 'Sterling Ooty Fern Hill', 16500, 4.7, 11.436924, 76.697988);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (433, 46, 'Sinclairs Retreat Ooty', 15000, 4.6, 11.391418, 76.678312);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (434, 46, 'Fortune Resort Sullivan Court', 6500, 4.5, 11.427213, 76.693535);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (435, 46, 'Gem Park Ooty', 6000, 4.4, 11.38778, 76.713872);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (436, 46, 'Hotel Lakeview', 5500, 4.3, 11.397741, 76.709825);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (437, 46, 'Yantra Resort', 5000, 4.2, 11.406846, 76.697949);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (438, 46, 'Mango Hill Central', 1800, 4.1, 11.392856, 76.712052);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (439, 46, 'Treebo Trend Ooty', 1800, 4.0, 11.393351, 76.669835);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (440, 46, 'Zostel Ooty', 1800, 3.9, 11.404875, 76.669964);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (441, 47, 'The Carlton Kodaikanal', 18000, 4.8, 10.254343, 77.471293);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (442, 47, 'Sterling Kodai Valley', 16500, 4.7, 10.22269, 77.471998);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (443, 47, 'Kodai Resort Hotel', 15000, 4.6, 10.245193, 77.476996);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (444, 47, 'Hill Country Resort', 6500, 4.5, 10.251581, 77.489468);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (445, 47, 'Hotel Hilltop Towers', 6000, 4.4, 10.225423, 77.489892);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (446, 47, 'JC Residency Kodai', 5500, 4.3, 10.231142, 77.491979);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (447, 47, 'Villa Retreat', 5000, 4.2, 10.230176, 77.476175);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (448, 47, 'Hotel Apple Valley', 1800, 4.1, 10.216978, 77.490322);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (449, 47, 'Treebo Trend Kodai', 1800, 4.0, 10.256702, 77.486801);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (450, 47, 'Zostel Kodaikanal', 1800, 3.9, 10.242229, 77.468018);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (451, 48, 'Hyatt Place Rameswaram', 18000, 4.8, 9.274165, 79.301868);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (452, 48, 'Hotel Daiwik', 16500, 4.7, 9.272233, 79.301791);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (453, 48, 'Jiwan Residency', 15000, 4.6, 9.281853, 79.309225);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (454, 48, 'Royal Park Rameswaram', 6500, 4.5, 9.284465, 79.318091);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (455, 48, 'Hotel Ashoka', 6000, 4.4, 9.283244, 79.295455);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (456, 48, 'Hotel NNP Grand', 5500, 4.3, 9.291504, 79.313509);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (457, 48, 'Hotel SS Grand', 5000, 4.2, 9.288362, 79.310092);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (458, 48, 'Hotel Brindavan', 1800, 4.1, 9.2906, 79.29706);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (459, 48, 'Hotel Pearl Residency', 1800, 4.0, 9.306471, 79.307896);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (460, 48, 'Hotel Temple View', 1800, 3.9, 9.292236, 79.315889);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (461, 49, 'The Gopinivas Grand', 18000, 4.8, 8.079087, 77.524918);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (462, 49, 'Hotel Sea View', 16500, 4.7, 8.101644, 77.534808);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (463, 49, 'Annai Resorts', 15000, 4.6, 8.069768, 77.533901);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (464, 49, 'Sparsa Resort', 6500, 4.5, 8.097645, 77.531757);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (465, 49, 'Hotel Ocean Heritage', 6000, 4.4, 8.094106, 77.525056);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (466, 49, 'Hotel Melody Park', 5500, 4.3, 8.093814, 77.534185);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (467, 49, 'Hotel Sun Rock', 5000, 4.2, 8.091654, 77.554286);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (468, 49, 'Hotel Wins', 1800, 4.1, 8.076553, 77.54736);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (469, 49, 'Hotel Blue Sea', 1800, 4.0, 8.081821, 77.542596);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (470, 49, 'Hotel Chitra', 1800, 3.9, 8.074799, 77.549372);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (471, 50, 'Ideal River View Resort', 18000, 4.8, 10.781454, 79.150019);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (472, 50, 'Svatma Thanjavur', 16500, 4.7, 10.774686, 79.136201);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (473, 50, 'Hotel Gnanam', 15000, 4.6, 10.78988, 79.142962);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (474, 50, 'Hotel Parisutham', 6500, 4.5, 10.813702, 79.151548);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (475, 50, 'Hotel Victoriyah', 6000, 4.4, 10.809647, 79.132289);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (476, 50, 'Hotel Kra Residency', 5500, 4.3, 10.782922, 79.125853);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (477, 50, 'Hotel Abirami', 5000, 4.2, 10.806787, 79.147132);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (478, 50, 'Hotel Star Residency', 1800, 4.1, 10.794396, 79.11865);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (479, 50, 'Hotel Yagappa', 1800, 4.0, 10.788836, 79.132696);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (480, 50, 'Hotel Temple City', 1800, 3.9, 10.808251, 79.119546);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (481, 51, 'Courtyard by Marriott Trichy', 18000, 4.8, 10.814315, 78.692208);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (482, 51, 'Grand Gardenia', 16500, 4.7, 10.794593, 78.693834);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (483, 51, 'SRM Hotel', 15000, 4.6, 10.810401, 78.672911);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (484, 51, 'Hotel Sangam', 6500, 4.5, 10.823677, 78.692039);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (485, 51, 'Hotel Rockfort View', 6000, 4.4, 10.820628, 78.720932);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (486, 51, 'Hotel Royal Sathyam', 5500, 4.3, 10.76195, 78.703707);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (487, 51, 'Hotel Apple Park', 5000, 4.2, 10.806474, 78.700164);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (488, 51, 'Hotel Kannappa', 1800, 4.1, 10.803115, 78.721782);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (489, 51, 'Hotel Mayas', 1800, 4.0, 10.823446, 78.703506);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (490, 51, 'Hotel Plaza', 1800, 3.9, 10.820741, 78.71338);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (491, 52, 'Radisson Salem', 18000, 4.8, 11.689771, 78.121303);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (492, 52, 'CJ Pallazzio', 16500, 4.7, 11.662633, 78.183263);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (493, 52, 'Sivaraj Holiday Inn', 15000, 4.6, 11.701931, 78.141858);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (494, 52, 'Hotel Grand Estancia', 6500, 4.5, 11.660028, 78.132987);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (495, 52, 'Hotel Windsor Castle', 6000, 4.4, 11.633823, 78.146116);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (496, 52, 'Hotel Pearls', 5500, 4.3, 11.665428, 78.113613);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (497, 52, 'Hotel Hong Kong Inn', 5000, 4.2, 11.631025, 78.167459);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (498, 52, 'Hotel Royal Castle', 1800, 4.1, 11.690317, 78.130011);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (499, 52, 'Hotel Selvam', 1800, 4.0, 11.69273, 78.122506);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (500, 52, 'Hotel Salem Castle', 1800, 3.9, 11.673699, 78.142084);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (501, 53, 'Sterling Yercaud', 18000, 4.8, 11.775469, 78.221293);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (502, 53, 'Great Trails Yercaud', 16500, 4.7, 11.776442, 78.220433);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (503, 53, 'Cliffton Resort', 15000, 4.6, 11.796762, 78.204691);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (504, 53, 'TGI Star Holidays', 6500, 4.5, 11.792615, 78.204778);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (505, 53, 'Hotel Shevaroys', 6000, 4.4, 11.7835, 78.217586);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (506, 53, 'Hotel Cauvery Peak', 5500, 4.3, 11.769105, 78.192212);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (507, 53, 'Hotel White Huts', 5000, 4.2, 11.769432, 78.195081);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (508, 53, 'Hotel Sri Durga', 1800, 4.1, 11.784636, 78.202991);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (509, 53, 'Hotel Golden Nest', 1800, 4.0, 11.796164, 78.197654);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (510, 53, 'Hotel Bliss', 1800, 3.9, 11.763807, 78.207137);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (511, 54, 'Fortune Park Vellore', 18000, 4.8, 12.908922, 79.151115);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (512, 54, 'Darling Residency', 16500, 4.7, 12.938847, 79.120248);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (513, 54, 'Hotel Khanna Fiesta', 15000, 4.6, 12.927604, 79.154482);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (514, 54, 'Hotel SMS Grand', 6500, 4.5, 12.931802, 79.136357);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (515, 54, 'Hotel River View', 6000, 4.4, 12.907013, 79.15305);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (516, 54, 'Hotel Aavanaa Inn', 5500, 4.3, 12.932349, 79.151764);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (517, 54, 'Hotel China Town', 5000, 4.2, 12.917063, 79.154539);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (518, 54, 'Hotel Aryaas', 1800, 4.1, 12.94183, 79.139921);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (519, 54, 'Hotel Vellore Gateway', 1800, 4.0, 12.932396, 79.108737);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (520, 54, 'Hotel Royal Park', 1800, 3.9, 12.902316, 79.151111);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (521, 55, 'Hotel Applettree', 18000, 4.8, 8.720246, 77.779443);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (522, 55, 'Regency Tirunelveli', 16500, 4.7, 8.730909, 77.777524);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (523, 55, 'Hotel Aryaas', 15000, 4.6, 8.704775, 77.755798);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (524, 55, 'Hotel TVK Regency', 6500, 4.5, 8.723765, 77.735949);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (525, 55, 'Hotel Sri Janakiram', 6000, 4.4, 8.699824, 77.781088);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (526, 55, 'Hotel Blue Nile', 5500, 4.3, 8.713872, 77.743961);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (527, 55, 'Hotel Raja Palace', 5000, 4.2, 8.715754, 77.757928);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (528, 55, 'Hotel Cathedral', 1800, 4.1, 8.72853, 77.74464);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (529, 55, 'Hotel Ambassasor', 1800, 4.0, 8.713583, 77.735968);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (530, 55, 'Hotel Radhakrishna', 1800, 3.9, 8.709602, 77.768278);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (531, 56, 'Hotel Tamil Nadu Thoothukudi', 18000, 4.8, 8.776462, 78.110714);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (532, 56, 'Hotel DSF Grand Plaza', 16500, 4.7, 8.773618, 78.149941);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (533, 56, 'Hotel Raj', 15000, 4.6, 8.736976, 78.137505);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (534, 56, 'Hotel Heritage', 6500, 4.5, 8.756149, 78.12134);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (535, 56, 'Hotel Naveen', 6000, 4.4, 8.750434, 78.114542);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (536, 56, 'Hotel Sara', 5500, 4.3, 8.77531, 78.113784);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (537, 56, 'Hotel Chandra', 5000, 4.2, 8.746618, 78.146129);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (538, 56, 'Hotel Sugam', 1800, 4.1, 8.775419, 78.137245);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (539, 56, 'Hotel Senthil', 1800, 4.0, 8.760692, 78.15014);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (540, 56, 'Hotel Star Palace', 1800, 3.9, 8.763315, 78.131181);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (541, 57, 'Hotel Tamil Nadu Nagapattinam', 18000, 4.8, 10.765581, 79.814648);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (542, 57, 'Hotel Royal Park', 16500, 4.7, 10.764131, 79.867013);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (543, 57, 'Hotel Karthik', 15000, 4.6, 10.769865, 79.834797);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (544, 57, 'Hotel Sun City', 6500, 4.5, 10.751572, 79.863571);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (545, 57, 'Hotel Mangrove', 6000, 4.4, 10.776458, 79.867381);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (546, 57, 'Hotel Sea Breeze', 5500, 4.3, 10.785519, 79.819765);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (547, 57, 'Hotel Annapoorna', 5000, 4.2, 10.779104, 79.821302);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (548, 57, 'Hotel Star Residency', 1800, 4.1, 10.761729, 79.87139);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (549, 57, 'Hotel Blue Bay', 1800, 4.0, 10.743104, 79.860059);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (550, 57, 'Hotel Grand Sea', 1800, 3.9, 10.774607, 79.865154);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (551, 58, 'Mantra Koodam', 18000, 4.8, 10.960419, 79.381303);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (552, 58, 'Hotel Raya''s', 16500, 4.7, 10.983777, 79.39245);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (553, 58, 'Hotel Green Park', 15000, 4.6, 10.947004, 79.402213);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (554, 58, 'Hotel Vamsam', 6500, 4.5, 10.944193, 79.367663);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (555, 58, 'Hotel Sivamurugan', 6000, 4.4, 10.960057, 79.400759);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (556, 58, 'Hotel Jeyam', 5500, 4.3, 10.959968, 79.389763);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (557, 58, 'Hotel Sara Regency', 5000, 4.2, 10.951723, 79.396557);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (558, 58, 'Hotel Paradise', 1800, 4.1, 10.974576, 79.40001);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (559, 58, 'Hotel Temple Towers', 1800, 4.0, 10.950425, 79.365899);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (560, 58, 'Hotel White Palace', 1800, 3.9, 10.968657, 79.396718);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (561, 59, 'Coco Lagoon Pollachi', 18000, 4.8, 10.654219, 77.011576);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (562, 59, 'Topslip Resort', 16500, 4.7, 10.633421, 76.998694);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (563, 59, 'Hotel Surya', 15000, 4.6, 10.683659, 77.006448);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (564, 59, 'Hotel Apple Inn', 6500, 4.5, 10.651054, 77.019757);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (565, 59, 'Hotel Mahalakshmi', 6000, 4.4, 10.685789, 77.004092);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (566, 59, 'Hotel Sakthi', 5500, 4.3, 10.676134, 77.019291);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (567, 59, 'Hotel Archana', 5000, 4.2, 10.635724, 77.007595);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (568, 59, 'Hotel VVM', 1800, 4.1, 10.688591, 77.012597);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (569, 59, 'Hotel Green Nest', 1800, 4.0, 10.644227, 77.020465);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (570, 59, 'Hotel Crystal', 1800, 3.9, 10.656594, 77.028645);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (571, 60, 'Stanmore Valparai', 18000, 4.8, 10.333598, 76.962207);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (572, 60, 'Green Hill Resort', 16500, 4.7, 10.324106, 76.964649);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (573, 60, 'Mist Valley Resort', 15000, 4.6, 10.327329, 76.942538);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (574, 60, 'Hotel Holiday Inn', 6500, 4.5, 10.308294, 76.960694);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (575, 60, 'Hotel Saravana', 6000, 4.4, 10.308444, 76.957624);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (576, 60, 'Hotel Mount View', 5500, 4.3, 10.322152, 76.952283);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (577, 60, 'Hotel Woodbriar', 5000, 4.2, 10.3091, 76.957589);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (578, 60, 'Hotel Paradise', 1800, 4.1, 10.319971, 76.964443);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (579, 60, 'Hotel Hill View', 1800, 4.0, 10.329184, 76.949242);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (580, 60, 'Hotel Whispering Falls', 1800, 3.9, 10.327243, 76.947006);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (581, 61, 'Hotel Grand Continent Hosur', 18000, 4.8, 12.746931, 77.807832);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (582, 61, 'Hotel TGI Hosur', 16500, 4.7, 12.735015, 77.839898);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (583, 61, 'Hotel Anantha Inn', 15000, 4.6, 12.755037, 77.808068);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (584, 61, 'Hotel Ashoka', 6500, 4.5, 12.721705, 77.810366);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (585, 61, 'Hotel Sri Raghavendra', 6000, 4.4, 12.721517, 77.824831);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (586, 61, 'Hotel White Lotus', 5500, 4.3, 12.71867, 77.822236);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (587, 61, 'Hotel Crescent', 5000, 4.2, 12.742878, 77.818993);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (588, 61, 'Hotel Garden View', 1800, 4.1, 12.730587, 77.812215);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (589, 61, 'Hotel Spring Valley', 1800, 4.0, 12.7553, 77.800506);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (590, 61, 'Hotel Bliss', 1800, 3.9, 12.749705, 77.842025);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (591, 62, 'Hotel De Gold', 18000, 4.8, 11.745426, 79.749112);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (592, 62, 'Hotel Annamalai International', 16500, 4.7, 11.750964, 79.768128);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (593, 62, 'Hotel Blue Moon', 15000, 4.6, 11.753907, 79.798242);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (594, 62, 'Hotel Aishwarya', 6500, 4.5, 11.734475, 79.747772);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (595, 62, 'Hotel Sea Breeze', 6000, 4.4, 11.724261, 79.773134);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (596, 62, 'Hotel Samudra', 5500, 4.3, 11.764723, 79.767876);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (597, 62, 'Hotel River View', 5000, 4.2, 11.71984, 79.774154);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (598, 62, 'Hotel Marina', 1800, 4.1, 11.772321, 79.78293);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (599, 62, 'Hotel Raj Residency', 1800, 4.0, 11.761057, 79.778802);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (600, 62, 'Hotel New Classic', 1800, 3.9, 11.728454, 79.767965);

-- Insert Telangana hotels
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (601, 63, 'Taj Falaknuma Palace', 23795, 5.0, 17.405879, 78.495579);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (602, 63, 'ITC Kohenur', 14265, 4.6, 17.345228, 78.519656);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (603, 63, 'Novotel Hyderabad Airport', 4671, 3.6, 17.39858, 78.446777);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (604, 63, 'Park Hyatt Hyderabad', 10433, 4.6, 17.356506, 78.469082);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (605, 63, 'Taj Krishna', 14396, 4.7, 17.366211, 78.496767);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (606, 63, 'Trident Hyderabad', 3547, 3.8, 17.372973, 78.482746);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (607, 63, 'Hyderabad Marriott Hotel', 4234, 4.1, 17.374422, 78.530191);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (608, 63, 'Sheraton Hyderabad Hotel', 3028, 3.5, 17.394679, 78.457047);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (609, 63, 'The Westin Mindspace', 3714, 3.5, 17.424798, 78.492396);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (610, 63, 'Lemon Tree Gachibowli', 3541, 3.8, 17.34879, 78.503281);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (611, 64, 'Hotel Silver Cloud', 2890, 4.2, 17.9788, 79.624088);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (612, 64, 'Lotus Residency', 1534, 4.4, 17.94719, 79.608727);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (613, 64, 'Sneha Grand Inn', 4573, 3.9, 17.942615, 79.600193);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (614, 64, 'Hotel Suprabha', 3000, 4.5, 17.993662, 79.633655);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (615, 64, 'Haritha Kakatiya', 3481, 4.4, 17.989354, 79.578489);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (616, 64, 'Hotel Ratna', 2775, 3.5, 17.95318, 79.584081);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (617, 64, 'City Grand Hotel', 1837, 4.0, 17.976708, 79.635973);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (618, 64, 'Hotel Shreya', 3735, 4.0, 17.936583, 79.621298);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (619, 64, 'Vishnu Residency', 1564, 3.5, 17.962006, 79.584639);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (620, 64, 'Landmark Hotel', 4195, 3.5, 17.997292, 79.612717);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (621, 65, 'Hotel Nikhil Sai International', 3198, 4.3, 18.682036, 78.132467);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (622, 65, 'Hotel Vamshee International', 4565, 3.6, 18.705179, 78.105197);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (623, 65, 'Hotel Kapila', 4477, 3.6, 18.660874, 78.109296);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (624, 65, 'Hotel Mayur', 2304, 4.2, 18.68488, 78.128949);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (625, 65, 'Haritha Indur Inn', 2460, 3.9, 18.714954, 78.125502);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (626, 65, 'Hotel Krishna', 2528, 4.1, 18.696887, 78.093542);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (627, 65, 'Hotel Apsara', 1892, 4.2, 18.63748, 78.08864);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (628, 65, 'Hotel City Park', 2363, 4.1, 18.655792, 78.094871);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (629, 65, 'Hotel Swagath', 3257, 3.6, 18.681898, 78.097686);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (630, 65, 'Hotel Nandi', 2040, 3.7, 18.634428, 78.075178);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (631, 66, 'Hotel Swetha', 4657, 4.4, 18.449792, 79.110407);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (632, 66, 'Maitri Residency', 4560, 4.4, 18.46593, 79.100591);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (633, 66, 'Hotel Peacock Pride', 3481, 4.0, 18.46627, 79.164448);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (634, 66, 'Hotel Prathima Regency', 4802, 4.4, 18.418092, 79.142092);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (635, 66, 'Hotel Nawab''s', 4180, 4.3, 18.471066, 79.084426);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (636, 66, 'Hotel Srinivasa', 2979, 4.0, 18.437235, 79.146119);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (637, 66, 'Hotel Manair', 2757, 3.8, 18.478462, 79.112888);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (638, 66, 'Hotel V Park', 3131, 4.1, 18.429945, 79.08964);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (639, 66, 'Hotel Kalpana', 3989, 4.5, 18.41626, 79.128552);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (640, 66, 'Hotel Tara', 4684, 3.6, 18.483397, 79.10781);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (641, 67, 'Hotel Grand Gayathri', 1501, 4.0, 17.206933, 80.131478);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (642, 67, 'Hotel Vishnu Residency', 4796, 4.1, 17.263563, 80.154184);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (643, 67, 'Hotel Kaveri', 4277, 4.5, 17.224085, 80.166892);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (644, 67, 'Hotel Sridhar', 1702, 3.9, 17.224094, 80.178683);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (645, 67, 'Hotel Manorama', 4431, 4.5, 17.238194, 80.179879);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (646, 67, 'Hotel Budget', 3691, 4.3, 17.23117, 80.123187);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (647, 67, 'Hotel Park', 4920, 4.4, 17.231636, 80.126222);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (648, 67, 'Hotel Aditya', 2869, 4.0, 17.222685, 80.164466);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (649, 67, 'Hotel Vamshi', 3343, 4.4, 17.238081, 80.152998);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (650, 67, 'Hotel Geetha', 4419, 3.6, 17.232996, 80.116613);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (651, 68, 'Hotel Ravi Teja', 3698, 4.0, 19.694921, 78.50757);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (652, 68, 'Hotel Laxmi Residency', 3691, 4.3, 19.682268, 78.534669);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (653, 68, 'Hotel Dwaraka Residency', 3549, 4.5, 19.719188, 78.537246);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (654, 68, 'Haritha Hotel Adilabad', 2683, 4.1, 19.662813, 78.518429);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (655, 68, 'Hotel Panchavati', 4363, 4.3, 19.709369, 78.523406);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (656, 68, 'Hotel Kamadhenu', 3196, 4.1, 19.639873, 78.501547);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (657, 68, 'Hotel Tirumala', 2945, 4.2, 19.684562, 78.520505);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (658, 68, 'Hotel Annapurna', 2996, 4.2, 19.632756, 78.501473);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (659, 68, 'Hotel Krishna', 1837, 4.0, 19.672658, 78.576501);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (660, 68, 'Hotel Sri Krishna', 1660, 3.5, 19.67675, 78.503094);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (661, 69, 'Haritha Heritage Hotel', 3027, 4.1, 18.08023, 78.277985);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (662, 69, 'Haritha Hotel Edupayala', 4604, 4.0, 18.049593, 78.27607);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (663, 69, 'Hotel Delhiwala', 2545, 3.7, 18.091371, 78.254179);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (664, 69, 'Hotel Alankar', 3985, 4.4, 18.042895, 78.250307);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (665, 69, 'Hotel Balaji', 3831, 4.2, 18.081575, 78.239517);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (666, 69, 'Hotel Swarna Palace', 2315, 3.8, 18.005988, 78.276893);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (667, 69, 'Hotel Manjeera', 1516, 4.5, 18.046095, 78.24396);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (668, 69, 'Hotel Vijaya', 4065, 3.9, 18.005191, 78.302349);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (669, 69, 'Hotel Sai Ram', 4044, 4.1, 18.055306, 78.30703);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (670, 69, 'Hotel Sri Krishna', 2639, 3.8, 18.038459, 78.295402);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (671, 70, 'Hotel Mint Park', 4827, 4.0, 16.737342, 77.994022);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (672, 70, 'RNS Residency', 4113, 4.2, 16.755106, 77.967246);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (673, 70, 'Hotel Sindhu', 4859, 4.2, 16.736078, 77.981375);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (674, 70, 'Hotel Ganesh', 4037, 4.4, 16.770469, 78.021231);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (675, 70, 'Haritha Hotel Mahabubnagar', 1745, 3.9, 16.730223, 78.031343);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (676, 70, 'Hotel Geetha', 3390, 3.8, 16.758836, 77.965843);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (677, 70, 'Hotel Srinivasa', 4450, 4.0, 16.775647, 78.016997);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (678, 70, 'Hotel Balaji', 4059, 3.9, 16.708369, 78.038296);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (679, 70, 'Hotel Sri Laxmi', 2666, 3.9, 16.712258, 78.010545);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (680, 70, 'Hotel Venkat', 2353, 3.8, 16.717754, 78.046866);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (681, 71, 'Hotel Swagath', 3697, 4.1, 17.015445, 79.226761);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (682, 71, 'Hotel Vamshee', 2337, 3.8, 17.061037, 79.252799);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (683, 71, 'Haritha Nalgonda', 3811, 4.3, 17.032124, 79.27946);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (684, 71, 'Hotel Balaji Grand', 2719, 4.3, 17.030194, 79.260422);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (685, 71, 'Hotel Kanchana', 4414, 4.1, 17.078048, 79.311227);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (686, 71, 'Hotel Sri Krishna', 2135, 4.2, 17.016396, 79.259294);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (687, 71, 'Hotel Annapurna', 3310, 3.9, 17.019761, 79.225682);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (688, 71, 'Hotel Vijaya', 1616, 3.6, 17.051248, 79.285365);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (689, 71, 'Hotel Laxmi', 3164, 3.7, 17.026779, 79.245922);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (690, 71, 'Hotel Sai', 2641, 4.2, 17.072118, 79.248594);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (691, 72, 'Hotel Redla''s Inn', 4843, 4.0, 17.63314, 78.075911);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (692, 72, 'CGR Manjeera Hotel', 4408, 3.9, 17.596296, 78.068738);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (693, 72, 'Hotel Jyothi', 2496, 3.6, 17.604769, 78.044962);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (694, 72, 'Hotel Vamshi', 4618, 3.5, 17.650991, 78.100029);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (695, 72, 'Hotel Sri Krishna', 2727, 3.5, 17.642703, 78.109322);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (696, 72, 'Hotel Balaji', 3135, 3.7, 17.613047, 78.072565);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (697, 72, 'Hotel Venkateswara', 4069, 4.4, 17.653801, 78.06018);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (698, 72, 'Hotel Sai Ram', 4309, 4.4, 17.619094, 78.085244);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (699, 72, 'Hotel Srinivasa', 2015, 4.1, 17.65895, 78.121683);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (700, 72, 'Hotel Annapurna', 2395, 4.1, 17.646085, 78.097645);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (701, 73, 'Haritha Resort Ananthagiri', 19938, 4.8, 17.332843, 77.908906);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (702, 73, 'Deccan Trails', 3136, 4.1, 17.365438, 77.918434);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (703, 73, 'Hotel R Banquets', 2566, 3.7, 17.297843, 77.86887);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (704, 73, 'Anantha Deluxe Lodge', 4824, 3.6, 17.353071, 77.866207);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (705, 73, 'Hotel Prabhat', 2275, 3.9, 17.352945, 77.890456);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (706, 73, 'Hotel Sri Krishna', 1614, 3.8, 17.302235, 77.922506);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (707, 73, 'Hotel Balaji', 3016, 4.4, 17.295127, 77.897415);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (708, 73, 'Hotel Sai Ram', 4568, 3.8, 17.30757, 77.927355);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (709, 73, 'Hotel Vijaya', 3739, 4.1, 17.357448, 77.871292);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (710, 73, 'Hotel Srinivasa', 2508, 4.3, 17.322272, 77.943568);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (711, 74, 'Hotel NorthInn', 1536, 3.7, 18.884086, 79.485492);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (712, 74, 'Hotel A1', 4414, 3.6, 18.90413, 79.464373);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (713, 74, 'Hotel Ramasudha', 3403, 3.9, 18.849687, 79.427899);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (714, 74, 'Hotel Vaibhav', 3135, 3.5, 18.904384, 79.427116);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (715, 74, 'Hotel Sneha', 4002, 4.5, 18.883809, 79.462327);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (716, 74, 'Hotel Sri Krishna', 2890, 3.6, 18.831153, 79.47312);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (717, 74, 'Hotel Balaji', 4495, 4.2, 18.890614, 79.490142);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (718, 74, 'Hotel Laxmi', 4116, 3.6, 18.906684, 79.506582);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (719, 74, 'Hotel Sai', 3945, 4.0, 18.862638, 79.498793);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (720, 74, 'Hotel Venkateswara', 1734, 4.2, 18.910079, 79.480823);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (721, 75, 'Hotel PMR Grand', 2453, 4.1, 18.749101, 78.87457);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (722, 75, 'Hotel LG Ram', 3176, 3.7, 18.775699, 78.947271);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (723, 75, 'Hotel Swagath', 2717, 3.6, 18.747635, 78.955798);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (724, 75, 'Hotel Annapurna', 3019, 4.4, 18.819232, 78.888302);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (725, 75, 'Hotel Sri Krishna', 4898, 4.5, 18.807804, 78.900863);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (726, 75, 'Hotel Balaji', 4986, 4.0, 18.774019, 78.930458);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (727, 75, 'Hotel Laxmi', 2213, 4.4, 18.750008, 78.911336);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (728, 75, 'Hotel Sai', 2152, 3.9, 18.791433, 78.933688);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (729, 75, 'Hotel Venkateswara', 1955, 3.6, 18.798429, 78.934144);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (730, 75, 'Hotel Srinivasa', 3496, 3.7, 18.77602, 78.909994);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (731, 76, 'Hotel Sitharam Inn', 4980, 4.4, 17.643524, 80.93529);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (732, 76, 'Haritha Hotel Bhadrachalam', 2184, 4.5, 17.627284, 80.928803);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (733, 76, 'Hotel Bhadrachalam', 4433, 4.4, 17.70612, 80.871369);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (734, 76, 'Hotel Geethanjali', 3182, 4.5, 17.670479, 80.905246);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (735, 76, 'Hotel Godavari', 3049, 3.8, 17.713025, 80.911323);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (736, 76, 'Hotel Sri Ram', 4830, 4.4, 17.62749, 80.873887);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (737, 76, 'Hotel Balaji', 4283, 3.6, 17.658907, 80.858208);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (738, 76, 'Hotel Laxmi', 1872, 3.8, 17.640331, 80.890333);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (739, 76, 'Hotel Sai', 4245, 3.7, 17.647334, 80.881031);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (740, 76, 'Hotel Venkateswara', 2239, 4.5, 17.686235, 80.896849);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (741, 77, 'Hotel Haritha Siddipet', 2428, 3.9, 18.11105, 78.831386);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (742, 77, 'Hotel Swarna Palace', 4456, 4.4, 18.130828, 78.892482);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (743, 77, 'Hotel Srinivasa', 1755, 4.1, 18.139526, 78.814447);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (744, 77, 'Hotel Balaji', 2297, 4.4, 18.06087, 78.809373);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (745, 77, 'Hotel Laxmi', 3324, 4.3, 18.100033, 78.895676);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (746, 77, 'Hotel Sai', 3302, 4.1, 18.09108, 78.894292);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (747, 77, 'Hotel Venkateswara', 4342, 4.1, 18.062516, 78.810314);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (748, 77, 'Hotel Sri Krishna', 2010, 3.8, 18.061874, 78.884825);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (749, 77, 'Hotel Annapurna', 3500, 4.0, 18.124292, 78.889185);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (750, 77, 'Hotel Vijaya', 4594, 4.3, 18.141829, 78.883468);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (751, 78, 'Hotel Haritha Yadadri', 2668, 3.7, 17.492454, 78.92363);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (752, 78, 'Hotel Yadadri', 2184, 4.1, 17.494578, 78.961453);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (753, 78, 'Hotel Sri Lakshmi Narasimha', 3323, 3.5, 17.498181, 78.902997);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (754, 78, 'Hotel Punnami', 1749, 4.0, 17.543509, 78.947815);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (755, 78, 'Hotel Balaji', 1767, 4.3, 17.561118, 78.908957);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (756, 78, 'Hotel Laxmi', 2262, 3.9, 17.486061, 78.90359);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (757, 78, 'Hotel Sai', 4778, 4.3, 17.531543, 78.973454);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (758, 78, 'Hotel Venkateswara', 3650, 3.6, 17.475309, 78.932553);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (759, 78, 'Hotel Sri Krishna', 3645, 4.1, 17.523933, 78.90919);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (760, 78, 'Hotel Annapurna', 3517, 3.8, 17.520259, 78.971529);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (761, 79, 'Hotel Geethanjali', 2519, 3.8, 17.553824, 80.637788);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (762, 79, 'Hotel Sitara', 2296, 3.6, 17.590093, 80.61929);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (763, 79, 'Hotel Prameela', 3375, 4.0, 17.594903, 80.619336);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (764, 79, 'Hotel Vamshee', 1704, 3.7, 17.558868, 80.605741);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (765, 79, 'Hotel Sri Krishna', 3658, 3.6, 17.518224, 80.588671);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (766, 79, 'Hotel Balaji', 4945, 4.2, 17.522906, 80.637685);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (767, 79, 'Hotel Laxmi', 1780, 4.4, 17.549357, 80.63508);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (768, 79, 'Hotel Sai', 3469, 4.1, 17.526846, 80.648961);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (769, 79, 'Hotel Venkateswara', 2989, 3.8, 17.522631, 80.582983);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (770, 79, 'Hotel Srinivasa', 4192, 4.0, 17.52527, 80.607784);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (771, 80, 'Honey Berg Resort', 22124, 4.7, 17.593006, 78.479703);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (772, 80, 'Aalankrita Resort', 18453, 4.5, 17.663322, 78.519279);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (773, 80, 'Leonia Holistic Destination', 1836, 3.8, 17.657258, 78.503743);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (774, 80, 'Celebrity Resort', 8302, 4.7, 17.628307, 78.492043);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (775, 80, 'Summer Green Resort', 16150, 4.8, 17.649546, 78.442011);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (776, 80, 'Hotel Sri Krishna', 4246, 3.8, 17.648901, 78.516969);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (777, 80, 'Hotel Balaji', 4297, 4.2, 17.587442, 78.514449);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (778, 80, 'Hotel Laxmi', 4353, 4.0, 17.606522, 78.460632);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (779, 80, 'Hotel Sai', 1984, 3.7, 17.635457, 78.512064);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (780, 80, 'Hotel Venkateswara', 3633, 3.8, 17.595479, 78.516547);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (781, 81, 'Hotel Asifabad', 4783, 4.0, 19.351959, 79.287394);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (782, 81, 'Hotel Kumram Bheem', 2669, 3.6, 19.36834, 79.281816);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (783, 81, 'Hotel Haritha', 4940, 4.1, 19.35409, 79.25937);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (784, 81, 'Hotel Sri Krishna', 4239, 4.1, 19.37137, 79.261049);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (785, 81, 'Hotel Balaji', 2376, 3.8, 19.404032, 79.229678);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (786, 81, 'Hotel Laxmi', 3824, 3.7, 19.342136, 79.243461);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (787, 81, 'Hotel Sai', 4390, 3.6, 19.392528, 79.234009);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (788, 81, 'Hotel Venkateswara', 2660, 3.6, 19.367206, 79.265936);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (789, 81, 'Hotel Srinivasa', 4095, 4.5, 19.400695, 79.28084);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (790, 81, 'Hotel Annapurna', 1574, 4.4, 19.393536, 79.252211);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (791, 82, 'Hotel Narayanpet', 4051, 4.2, 16.773578, 77.518061);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (792, 82, 'Hotel Sri Krishna', 4262, 4.1, 16.724898, 77.522654);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (793, 82, 'Hotel Balaji', 3873, 4.5, 16.763686, 77.471356);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (794, 82, 'Hotel Laxmi', 2031, 3.7, 16.710035, 77.508356);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (795, 82, 'Hotel Sai', 1819, 3.6, 16.745249, 77.537281);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (796, 82, 'Hotel Venkateswara', 4392, 4.0, 16.704364, 77.483694);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (797, 82, 'Hotel Srinivasa', 1509, 4.0, 16.749103, 77.471556);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (798, 82, 'Hotel Annapurna', 2691, 4.3, 16.722618, 77.514735);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (799, 82, 'Hotel Vijaya', 4332, 3.6, 16.742285, 77.507949);
INSERT INTO hotels (hotel_id, destination_id, name, price_per_night, rating, latitude, longitude) VALUES (800, 82, 'Hotel Sri Ram', 4990, 3.8, 16.783358, 77.528156);

-- Insert Tamil Nadu places
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (401, 43, 3, 'Marina Beach', 13.0418, 80.285, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (402, 43, 3, 'Besant Nagar Beach', 12.9996, 80.2721, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (403, 43, 4, 'Kapaleeshwarar Temple', 13.0334, 80.2696, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (404, 43, 4, 'Fort St George', 13.0797, 80.2872, 50, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (405, 43, 5, 'T Nagar Shopping', 13.0401, 80.2337, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (406, 43, 5, 'Nungambakkam Pubs', 13.0612, 80.2458, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (407, 43, 4, 'Government Museum', 13.0732, 80.2608, 15, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (408, 43, 1, 'Guindy National Park', 13.0064, 80.2206, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (409, 43, 3, 'Elliots Beach', 13.0001, 80.2745, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (410, 43, 5, 'OMR Night Cafes', 12.9234, 80.2312, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (411, 44, 1, 'VOC Park', 11.0006, 76.9744, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (412, 44, 1, 'Perur Lake', 10.9902, 76.915, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (413, 44, 4, 'Perur Temple', 10.9908, 76.9135, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (414, 44, 2, 'Velliangiri Hills Trek', 10.9793, 76.6896, 0, 240);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (415, 44, 5, 'RS Puram Cafes', 11.0116, 76.9507, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (416, 44, 1, 'Siruvani Dam', 10.9412, 76.6784, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (417, 44, 4, 'GD Naidu Museum', 11.0051, 76.979, 30, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (418, 44, 2, 'Dhyanalinga Visit', 10.9774, 76.683, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (419, 44, 1, 'Aliyar View Point', 10.4851, 76.9772, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (420, 44, 5, 'Brookefields Mall', 11.008, 76.9602, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (421, 45, 4, 'Meenakshi Amman Temple', 9.9195, 78.1194, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (422, 45, 4, 'Thirumalai Nayakkar Palace', 9.915, 78.1228, 50, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (423, 45, 1, 'Vaigai River Walk', 9.9254, 78.1287, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (424, 45, 4, 'Gandhi Museum', 9.9298, 78.1408, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (425, 45, 5, 'Town Hall Road Cafes', 9.918, 78.115, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (426, 45, 4, 'Koodal Azhagar Temple', 9.9159, 78.1141, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (427, 45, 1, 'Samanar Hills', 9.9248, 78.0264, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (428, 45, 2, 'Yanaimalai Trek', 9.9602, 78.1887, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (429, 45, 5, 'Local Night Food Street', 9.9214, 78.1215, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (430, 45, 4, 'Alagar Kovil', 10.0739, 78.2132, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (431, 46, 1, 'Botanical Garden', 11.419, 76.7118, 30, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (432, 46, 1, 'Ooty Lake', 11.41, 76.69, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (433, 46, 2, 'Doddabetta Peak', 11.401, 76.735, 10, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (434, 46, 1, 'Rose Garden', 11.4111, 76.715, 30, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (435, 46, 1, 'Pine Forest', 11.4505, 76.6711, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (436, 46, 1, 'Wenlock Downs', 11.4421, 76.645, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (437, 46, 2, 'Avalanche Lake', 11.298, 76.611, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (438, 46, 1, 'Emerald Lake', 11.3325, 76.6189, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (439, 46, 4, 'Tea Museum', 11.408, 76.732, 30, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (440, 46, 1, 'Shooting Point', 11.455, 76.665, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (441, 47, 1, 'Kodaikanal Lake', 10.2348, 77.4877, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (442, 47, 1, 'Coakers Walk', 10.2324, 77.4951, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (443, 47, 1, 'Pillar Rocks', 10.2058, 77.4784, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (444, 47, 2, 'Dolphins Nose', 10.2155, 77.5028, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (445, 47, 1, 'Pine Forest', 10.2195, 77.4715, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (446, 47, 1, 'Bryant Park', 10.2325, 77.4935, 30, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (447, 47, 1, 'Bear Shola Falls', 10.2435, 77.483, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (448, 47, 1, 'Silver Cascade', 10.2482, 77.5115, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (449, 47, 2, 'Guna Caves', 10.2154, 77.4832, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (450, 47, 4, 'Solar Observatory', 10.2321, 77.4682, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (451, 48, 4, 'Ramanathaswamy Temple', 9.2881, 79.3174, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (452, 48, 3, 'Agni Theertham', 9.2875, 79.3214, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (453, 48, 3, 'Dhanushkodi Beach', 9.1504, 79.4447, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (454, 48, 4, 'APJ Abdul Kalam Memorial', 9.2785, 79.2965, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (455, 48, 4, 'Pamban Bridge', 9.2804, 79.2227, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (456, 48, 4, 'Lakshmana Theertham', 9.2814, 79.3082, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (457, 48, 3, 'Ariyaman Beach', 9.3105, 79.1354, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (458, 48, 4, 'Floating Stone Site', 9.2905, 79.315, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (459, 48, 2, 'Kurusadai Island', 9.2435, 79.2084, 0, 180);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (460, 48, 5, 'Local Market Walk', 9.2854, 79.3142, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (461, 49, 4, 'Vivekananda Rock Memorial', 8.0781, 77.5555, 50, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (462, 49, 4, 'Thiruvalluvar Statue', 8.0778, 77.5568, 50, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (463, 49, 3, 'Kanyakumari Beach', 8.0792, 77.5539, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (464, 49, 1, 'Sunset Point', 8.0884, 77.5385, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (465, 49, 1, 'Sunrise View Point', 8.0768, 77.555, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (466, 49, 4, 'Gandhi Memorial', 8.0814, 77.5542, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (467, 49, 4, 'Wax Museum', 8.0932, 77.545, 50, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (468, 49, 4, 'Vattakottai Fort', 8.1258, 77.5684, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (469, 49, 5, 'Baywatch Park', 8.0945, 77.5392, 50, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (470, 49, 4, 'Triveni Sangam', 8.0775, 77.5552, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (471, 50, 4, 'Brihadeeswarar Temple', 10.7828, 79.1318, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (472, 50, 4, 'Thanjavur Palace', 10.7925, 79.1364, 50, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (473, 50, 4, 'Saraswathi Mahal Library', 10.7928, 79.1368, 30, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (474, 50, 4, 'Art Gallery', 10.793, 79.1362, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (475, 50, 1, 'Sivaganga Park', 10.785, 79.1325, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (476, 50, 4, 'Schwartz Church', 10.7875, 79.134, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (477, 50, 1, 'Grand Anaicut', 10.8404, 78.8132, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (478, 50, 5, 'Evening Street Food', 10.7892, 79.1375, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (479, 50, 4, 'Rajarajan Museum', 10.7835, 79.1312, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (480, 50, 4, 'Darasuram Temple', 10.9482, 79.3564, 40, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (481, 51, 4, 'Rockfort Temple', 10.8294, 78.6974, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (482, 51, 4, 'Srirangam Temple', 10.8624, 78.6902, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (483, 51, 4, 'Jambukeswarar Temple', 10.8524, 78.7058, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (484, 51, 4, 'St Johns Church', 10.7984, 78.6924, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (485, 51, 1, 'Kallanai Dam', 10.8324, 78.8185, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (486, 51, 4, 'Government Museum', 10.7925, 78.6884, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (487, 51, 5, 'Chathiram Bus Stand Food', 10.8284, 78.6932, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (488, 51, 4, 'Uyyakondan Canal', 10.8052, 78.6854, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (489, 51, 4, 'Puliancholai', 11.2384, 78.4124, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (490, 51, 5, 'Local Night Shopping', 10.8124, 78.6952, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (491, 52, 1, 'Yercaud Lake View', 11.7794, 78.2034, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (492, 52, 1, 'Pagoda Point', 11.7824, 78.225, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (493, 52, 2, 'Kiliyur Falls Trek', 11.7912, 78.2008, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (494, 52, 4, 'Salem Fort', 11.6584, 78.1524, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (495, 52, 1, 'Deer Park', 11.7774, 78.2052, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (496, 52, 1, 'Anna Park', 11.7785, 78.2084, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (497, 52, 4, '1008 Lingam Temple', 11.6054, 78.1024, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (498, 52, 5, 'Five Roads Cafes', 11.6784, 78.1352, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (499, 52, 1, 'Siddhar Temple Hills', 11.6245, 78.1784, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (500, 52, 1, 'Shevaroy Hills View', 11.8024, 78.2324, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (501, 53, 1, 'Yercaud Lake', 11.7794, 78.2034, 30, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (502, 53, 1, 'Lady’s Seat View Point', 11.7745, 78.2078, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (503, 53, 1, 'Pagoda Point', 11.7824, 78.225, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (504, 53, 2, 'Kiliyur Falls Trek', 11.7912, 78.2008, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (505, 53, 1, 'Deer Park', 11.7774, 78.2052, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (506, 53, 1, 'Anna Park', 11.7785, 78.2084, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (507, 53, 4, 'Shevaroy Temple', 11.8324, 78.2435, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (508, 53, 1, 'Rose Garden', 11.7752, 78.2064, 30, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (509, 53, 1, 'Orchid Garden', 11.7765, 78.2072, 20, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (510, 53, 2, 'Servarayan Hills View', 11.8154, 78.2284, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (511, 54, 4, 'Vellore Fort', 12.9242, 79.1352, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (512, 54, 4, 'Jalakandeswarar Temple', 12.9238, 79.1362, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (513, 54, 4, 'Vellore Govt Museum', 12.9245, 79.1348, 10, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (514, 54, 4, 'St Johns Church', 12.9252, 79.1342, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (515, 54, 1, 'Yelagiri Hills View', 12.5854, 78.6384, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (516, 54, 1, 'Amirthi Zoological Park', 12.7214, 79.0824, 30, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (517, 54, 1, 'Palar River Walk', 12.9354, 79.1524, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (518, 54, 5, 'Katpadi Night Food', 12.9654, 79.1452, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (519, 54, 5, 'Vellore City Cafes', 12.9154, 79.1324, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (520, 54, 4, 'Vainu Bappu Observatory', 12.5768, 78.8252, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (521, 55, 4, 'Nellaiappar Temple', 8.7284, 77.6887, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (522, 55, 4, 'Kanthimathi Amman', 8.7292, 77.6894, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (523, 55, 1, 'Manimuthar Dam', 8.6184, 77.4124, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (524, 55, 1, 'Manimuthar Falls', 8.6054, 77.3952, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (525, 55, 1, 'Agasthiyar Falls', 8.6912, 77.3712, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (526, 55, 2, 'Papanasam Trek Route', 8.7054, 77.3614, 0, 150);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (527, 55, 4, 'District Science Centre', 8.7212, 77.7124, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (528, 55, 4, 'Nellaiappar Temple Street', 8.7275, 77.6882, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (529, 55, 1, 'Thamirabarani Walk', 8.7312, 77.7024, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (530, 55, 5, 'Local Evening Food', 8.7254, 77.6912, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (531, 56, 3, 'Tuticorin Beach', 8.7874, 78.1983, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (532, 56, 3, 'Hare Island', 8.7854, 78.2052, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (533, 56, 4, 'Our Lady of Snows', 8.7995, 78.1565, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (534, 56, 4, 'Tuticorin Port Heritage', 8.7512, 78.1924, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (535, 56, 1, 'Pearl Fishing View', 8.8052, 78.2124, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (536, 56, 1, 'Therespuram Eco Park', 8.8214, 78.1654, 30, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (537, 56, 5, 'Beach Road Cafes', 8.7892, 78.1952, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (538, 56, 5, 'Night Seafood Street', 8.7914, 78.1924, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (539, 56, 2, 'Kayaking Hare Island', 8.785, 78.206, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (540, 56, 4, 'Kalugumalai Jain Beds', 9.1454, 77.7124, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (541, 57, 3, 'Nagapattinam Beach', 10.7612, 79.8512, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (542, 57, 3, 'Velankanni Beach', 10.6805, 79.8485, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (543, 57, 4, 'Velankanni Basilica', 10.6819, 79.8437, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (544, 57, 4, 'Soundararajaperumal Temple', 10.7584, 79.8412, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (545, 57, 4, 'Danish Fort Tranquebar', 11.0335, 79.8542, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (546, 57, 1, 'Point Calimere Sanctuary', 10.2854, 79.8524, 50, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (547, 57, 1, 'Kodiakarai Beach View', 10.2754, 79.8584, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (548, 57, 4, 'Nagore Dargah', 10.8214, 79.8452, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (549, 57, 5, 'Evening Beach Market', 10.7654, 79.8542, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (550, 57, 4, 'Tranquebar Heritage Street', 11.0324, 79.8512, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (551, 58, 4, 'Adi Kumbeswarar Temple', 10.9583, 79.3711, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (552, 58, 4, 'Sarangapani Temple', 10.9592, 79.3752, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (553, 58, 4, 'Nageswaran Temple', 10.9575, 79.3792, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (554, 58, 4, 'Ramaswamy Temple', 10.9565, 79.3732, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (555, 58, 4, 'Chakrapani Temple', 10.9624, 79.3724, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (556, 58, 4, 'Darasuram Airavatesvara', 10.9482, 79.3564, 40, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (557, 58, 4, 'Mahamaham Tank', 10.9554, 79.3784, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (558, 58, 1, 'Uppiliappan Garden', 10.9654, 79.4324, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (559, 58, 5, 'Evening Coffee Street', 10.9584, 79.3712, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (560, 58, 4, 'Kasi Viswanathar Temple', 10.9545, 79.3794, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (561, 59, 1, 'Aliyar Dam', 10.48, 76.974, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (562, 59, 1, 'Aliyar View Point', 10.4851, 76.9772, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (563, 59, 2, 'Topslip Forest Trek', 10.4554, 76.8432, 0, 180);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (564, 59, 1, 'Monkey Falls', 10.4654, 76.9684, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (565, 59, 1, 'Anamalai Tiger Reserve', 10.3542, 76.9124, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (566, 59, 1, 'Coconut Farm Trails', 10.6584, 77.0124, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (567, 59, 2, 'Off-road to Valparai', 10.5542, 76.9524, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (568, 59, 1, 'Amaravathi Reservoir', 10.3952, 77.2654, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (569, 59, 4, 'Masani Amman Temple', 10.6124, 76.9584, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (570, 59, 5, 'Evening Food Area', 10.6624, 77.0084, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (571, 60, 1, 'Sholayar Dam View', 10.3154, 76.7584, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (572, 60, 1, 'Upper Sholayar Dam', 10.3124, 76.7512, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (573, 60, 1, 'Nallamudi View Point', 10.3235, 76.9542, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (574, 60, 2, 'Grass Hills Trek Route', 10.3524, 77.0124, 0, 180);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (575, 60, 1, 'Tea Estate Walk', 10.3254, 76.9654, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (576, 60, 1, 'Monkey Falls (Upper)', 10.4554, 76.9652, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (577, 60, 2, 'Off-road Forest Drive', 10.3324, 76.9124, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (578, 60, 1, 'Loam’s View Point', 10.4784, 76.9782, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (579, 60, 4, 'Balaji Temple Valparai', 10.3554, 76.9242, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (580, 60, 5, 'Evening Cafes Valparai', 10.3242, 76.9624, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (581, 61, 1, 'Chandira Choodeswarar Hill', 12.7275, 77.8282, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (582, 61, 1, 'Kelavarapalli Dam', 12.7754, 77.7952, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (583, 61, 1, 'Hosur Lake Park', 12.7384, 77.8252, 0, 45);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (584, 61, 2, 'Hill Trail Trek', 12.7154, 77.8452, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (585, 61, 4, 'St Peters Church', 12.7412, 77.8354, 0, 30);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (586, 61, 4, 'Ancient Chandira Temple', 12.7278, 77.8285, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (587, 61, 5, 'Cafes and Lounges', 12.7424, 77.8384, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (588, 61, 5, 'Local Night Food Street', 12.7352, 77.8242, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (589, 61, 1, 'Avalapalli Forest View', 12.6854, 77.8152, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (590, 61, 2, 'Drive to Rayakottai', 12.5184, 78.0324, 0, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (591, 62, 3, 'Silver Beach', 11.7483, 79.7828, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (592, 62, 3, 'Devanampattinam Beach', 11.7512, 79.7852, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (593, 62, 3, 'Samiyarpettai Beach', 11.5542, 79.7752, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (594, 62, 4, 'Padaleeswarar Temple', 11.7412, 79.7524, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (595, 62, 4, 'Sri Veera Raghava Perumal', 11.7454, 79.7612, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (596, 62, 4, 'Fort St. David', 11.7524, 79.7784, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (597, 62, 1, 'Pichavaram Mangrove', 11.4284, 79.7852, 50, 120);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (598, 62, 1, 'Gadilam River Backwaters', 11.7554, 79.7684, 0, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (599, 62, 5, 'Silver Beach Night Food', 11.7492, 79.7812, 0, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (600, 62, 4, 'Old Lighthouse', 11.7505, 79.7842, 20, 45);

-- Insert Telangana places
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (601, 63, 4, 'Charminar', 17.389, 78.4907, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (602, 63, 4, 'Golconda Fort', 17.393, 78.4947, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (603, 63, 4, 'Salar Jung Museum', 17.397, 78.4987, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (604, 63, 1, 'Hussain Sagar Lake', 17.401, 78.5027, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (605, 63, 4, 'Birla Mandir', 17.405, 78.5067, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (606, 63, 4, 'Qutb Shahi Tombs', 17.409, 78.5107, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (607, 63, 1, 'Lumbini Park', 17.413, 78.5147, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (608, 63, 4, 'Ramoji Film City', 17.417, 78.5187, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (609, 63, 5, 'Jubilee Hills Cafes', 17.421, 78.5227, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (610, 63, 5, 'Tank Bund Night View', 17.425, 78.5267, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (611, 64, 4, 'Warangal Fort', 17.9729, 79.5981, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (612, 64, 4, 'Thousand Pillar Temple', 17.9769, 79.6021, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (613, 64, 4, 'Bhadrakali Temple', 17.9809, 79.6061, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (614, 64, 1, 'Bhadrakali Lake', 17.9849, 79.6101, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (615, 64, 4, 'Ramappa Temple', 17.9889, 79.6141, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (616, 64, 1, 'Pakhal Lake', 17.9929, 79.6181, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (617, 64, 1, 'Laknavaram Lake', 17.9969, 79.6221, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (618, 64, 1, 'Ekashila Rock Garden', 18.0009, 79.6261, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (619, 64, 1, 'Kakatiya Musical Garden', 18.0049, 79.6301, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (620, 64, 5, 'Warangal Night Food Street', 18.0089, 79.6341, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (621, 65, 4, 'Nizamabad Fort', 18.6765, 78.0981, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (622, 65, 1, 'Ali Sagar Reservoir', 18.6805, 78.1021, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (623, 65, 4, 'Kanteshwar Temple', 18.6845, 78.1061, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (624, 65, 1, 'Nizam Sagar Dam', 18.6885, 78.1101, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (625, 65, 1, 'Pocharam Wildlife Sanctuary', 18.6925, 78.1141, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (626, 65, 1, 'Ashok Sagar Lake', 18.6965, 78.1181, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (627, 65, 4, 'Armoor Jain Temple', 18.7005, 78.1221, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (628, 65, 4, 'Local Heritage Streets', 18.7045, 78.1261, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (629, 65, 1, 'City Central Park', 18.7085, 78.1301, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (630, 65, 5, 'Nizamabad Night Market', 18.7125, 78.1341, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (631, 66, 4, 'Elgandal Fort', 18.4426, 79.1328, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (632, 66, 1, 'Lower Manair Dam', 18.4466, 79.1368, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (633, 66, 1, 'Rajiv Gandhi Deer Park', 18.4506, 79.1408, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (634, 66, 4, 'Vemulawada Temple', 18.4546, 79.1448, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (635, 66, 1, 'Ujjwala Park', 18.4586, 79.1488, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (636, 66, 4, 'Archaeological Museum', 18.4626, 79.1528, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (637, 66, 1, 'River Walk Area', 18.4666, 79.1568, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (638, 66, 1, 'Boat Club Area', 18.4706, 79.1608, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (639, 66, 5, 'Evening Food Street', 18.4746, 79.1648, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (640, 66, 4, 'Handicrafts Market', 18.4786, 79.1688, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (641, 67, 4, 'Khammam Fort', 17.2513, 80.1554, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (642, 67, 1, 'Lakaram Lake', 17.2553, 80.1594, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (643, 67, 1, 'Papi Hills View', 17.2593, 80.1634, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (644, 67, 1, 'Kinnerasani Sanctuary', 17.2633, 80.1674, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (645, 67, 4, 'Sri Venkateswara Temple', 17.2673, 80.1714, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (646, 67, 1, 'River Boating Area', 17.2713, 80.1754, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (647, 67, 1, 'Forest View Point', 17.2753, 80.1794, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (648, 67, 4, 'Local Museum', 17.2793, 80.1834, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (649, 67, 5, 'Night Food Street', 17.2833, 80.1874, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (650, 67, 4, 'Historic Town Area', 17.2873, 80.1914, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (651, 68, 1, 'Kuntala Waterfalls', 19.0844, 78.3478, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (652, 68, 1, 'Pochera Waterfalls', 19.0884, 78.3518, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (653, 68, 1, 'Kawal Tiger Reserve', 19.0924, 78.3558, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (654, 68, 4, 'Basar Saraswati Temple', 19.0964, 78.3598, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (655, 68, 1, 'Godavari River View', 19.1004, 78.3638, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (656, 68, 2, 'Forest Trek Route', 19.1044, 78.3678, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (657, 68, 1, 'Hill View Point', 19.1084, 78.3718, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (658, 68, 4, 'Tribal Museum', 19.1124, 78.3758, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (659, 68, 1, 'Eco Park', 19.1164, 78.3798, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (660, 68, 5, 'Local Evening Market', 19.1204, 78.3838, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (661, 69, 4, 'Medak Cathedral', 18.0493, 78.2687, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (662, 69, 4, 'Medak Fort Hill', 18.0533, 78.2727, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (663, 69, 1, 'Pocharam Sanctuary', 18.0573, 78.2767, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (664, 69, 4, 'Edupayala Temple', 18.0613, 78.2807, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (665, 69, 1, 'Lake View Point', 18.0653, 78.2847, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (666, 69, 4, 'Heritage Streets', 18.0693, 78.2887, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (667, 69, 1, 'Boating Spot', 18.0733, 78.2927, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (668, 69, 1, 'Sunset View Point', 18.0773, 78.2967, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (669, 69, 5, 'Night Food Area', 18.0813, 78.3007, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (670, 69, 4, 'Ancient Rock Formations', 18.0853, 78.3047, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (671, 70, 4, 'Gadwal Fort', 16.7479, 77.9896, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (672, 70, 1, 'Koilsagar Reservoir', 16.7519, 77.9936, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (673, 70, 1, 'Jurala Dam', 16.7559, 77.9976, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (674, 70, 4, 'Pillalamarri Banyan Tree', 16.7599, 78.0016, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (675, 70, 4, 'Local Museum', 16.7639, 78.0056, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (676, 70, 1, 'Nature Park', 16.7679, 78.0096, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (677, 70, 4, 'Ancient Temple Area', 16.7719, 78.0136, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (678, 70, 5, 'Evening Food Street', 16.7759, 78.0176, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (679, 70, 1, 'River View Area', 16.7799, 78.0216, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (680, 70, 4, 'Handloom Market', 16.7839, 78.0256, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (681, 71, 4, 'Bhongir Fort', 17.0615, 79.2724, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (682, 71, 4, 'Panagal Jain Temple', 17.0655, 79.2764, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (683, 71, 1, 'Nagarjuna Sagar Dam', 17.0695, 79.2804, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (684, 71, 1, 'Ethipothala Waterfalls', 17.0735, 79.2844, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (685, 71, 4, 'Buddhist Museum', 17.0775, 79.2884, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (686, 71, 1, 'Hill View Point', 17.0815, 79.2924, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (687, 71, 1, 'River View Area', 17.0855, 79.2964, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (688, 71, 4, 'Heritage Street Walk', 17.0895, 79.3004, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (689, 71, 1, 'Sunset Point', 17.0935, 79.3044, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (690, 71, 5, 'Local Evening Market', 17.0975, 79.3084, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (691, 72, 1, 'Singur Dam', 17.6288, 78.0906, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (692, 72, 1, 'Manjeera Sanctuary', 17.6328, 78.0946, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (693, 72, 1, 'Lake View Park', 17.6368, 78.0986, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (694, 72, 4, 'Heritage Temple Area', 17.6408, 78.1026, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (695, 72, 4, 'Old Fort Ruins', 17.6448, 78.1066, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (696, 72, 1, 'Nature Walk Trail', 17.6488, 78.1106, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (697, 72, 1, 'Sunset Point', 17.6528, 78.1146, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (698, 72, 4, 'Local Museum', 17.6568, 78.1186, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (699, 72, 5, 'Night Food Area', 17.6608, 78.1226, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (700, 72, 4, 'Town Heritage Streets', 17.6648, 78.1266, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (701, 73, 1, 'Ananthagiri Hills', 17.342, 77.9084, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (702, 73, 1, 'Kotepally Reservoir', 17.346, 77.9124, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (703, 73, 4, 'Anantha Padmanabha Temple', 17.35, 77.9164, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (704, 73, 2, 'Forest Trek Route', 17.354, 77.9204, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (705, 73, 1, 'Sunrise View Point', 17.358, 77.9244, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (706, 73, 1, 'River Side Camping Area', 17.362, 77.9284, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (707, 73, 1, 'Nature Park', 17.366, 77.9324, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (708, 73, 1, 'Hill Top View', 17.37, 77.9364, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (709, 73, 5, 'Evening Cafes', 17.374, 77.9404, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (710, 73, 4, 'Local Market', 17.378, 77.9444, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (711, 74, 1, 'Pranahita River View', 18.8766, 79.4483, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (712, 74, 1, 'Forest Walk Area', 18.8806, 79.4523, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (713, 74, 4, 'Local Tribal Museum', 18.8846, 79.4563, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (714, 74, 1, 'Eco Tourism Park', 18.8886, 79.4603, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (715, 74, 1, 'River Side Camping', 18.8926, 79.4643, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (716, 74, 1, 'Nature View Point', 18.8966, 79.4683, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (717, 74, 4, 'Temple Area', 18.9006, 79.4723, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (718, 74, 4, 'Heritage Streets', 18.9046, 79.4763, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (719, 74, 5, 'Local Night Market', 18.9086, 79.4803, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (720, 74, 1, 'Sunset View Point', 18.9126, 79.4843, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (721, 75, 4, 'Jagtial Fort', 18.7987, 78.9201, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (722, 75, 1, 'Sri Ram Sagar Project', 18.8027, 78.9241, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (723, 75, 4, 'Anjaneya Temple', 18.8067, 78.9281, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (724, 75, 1, 'River View Point', 18.8107, 78.9321, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (725, 75, 1, 'Nature Park', 18.8147, 78.9361, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (726, 75, 4, 'Temple Street Area', 18.8187, 78.9401, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (727, 75, 4, 'Local Museum', 18.8227, 78.9441, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (728, 75, 1, 'Sunset Point', 18.8267, 78.9481, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (729, 75, 5, 'Evening Food Street', 18.8307, 78.9521, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (730, 75, 4, 'Handloom Market', 18.8347, 78.9561, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (731, 76, 4, 'Bhadrachalam Temple', 17.6724, 80.8928, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (732, 76, 1, 'Godavari River Cruise', 17.6764, 80.8968, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (733, 76, 1, 'Papi Hills', 17.6804, 80.9008, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (734, 76, 1, 'Ramappa Ghat', 17.6844, 80.9048, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (735, 76, 4, 'Museum of Tribal Culture', 17.6884, 80.9088, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (736, 76, 1, 'River Side Walk', 17.6924, 80.9128, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (737, 76, 1, 'Nature View Point', 17.6964, 80.9168, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (738, 76, 4, 'Heritage Streets', 17.7004, 80.9208, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (739, 76, 5, 'Night Market', 17.7044, 80.9248, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (740, 76, 1, 'Sunrise View Point', 17.7084, 80.9288, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (741, 77, 1, 'Komati Cheruvu', 18.1059, 78.856, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (742, 77, 4, 'Siddipet Fort Area', 18.1099, 78.86, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (743, 77, 4, 'Local Temple', 18.1139, 78.864, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (744, 77, 1, 'Nature Park', 18.1179, 78.868, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (745, 77, 1, 'Sunset Point', 18.1219, 78.872, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (746, 77, 1, 'River Side Walk', 18.1259, 78.876, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (747, 77, 4, 'Handloom Market', 18.1299, 78.88, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (748, 77, 5, 'Evening Food Street', 18.1339, 78.884, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (749, 77, 1, 'Boating Area', 18.1379, 78.888, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (750, 77, 4, 'Heritage Streets', 18.1419, 78.892, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (751, 78, 4, 'Yadadri Temple', 17.5893, 78.9475, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (752, 78, 1, 'Hill Top View Point', 17.5933, 78.9515, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (753, 78, 1, 'Temple Gardens', 17.5973, 78.9555, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (754, 78, 1, 'Sunrise Point', 17.6013, 78.9595, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (755, 78, 4, 'Heritage Streets', 17.6053, 78.9635, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (756, 78, 4, 'Local Museum', 17.6093, 78.9675, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (757, 78, 1, 'Nature Walk Area', 17.6133, 78.9715, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (758, 78, 5, 'Evening Cafes', 17.6173, 78.9755, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (759, 78, 4, 'Spiritual Center', 17.6213, 78.9795, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (760, 78, 4, 'Temple Market Area', 17.6253, 78.9835, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (761, 79, 1, 'Kinnerasani Dam', 17.5575, 80.6236, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (762, 79, 1, 'Kothagudem Lake', 17.5615, 80.6276, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (763, 79, 1, 'Forest View Point', 17.5655, 80.6316, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (764, 79, 1, 'Nature Park', 17.5695, 80.6356, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (765, 79, 1, 'River Side Walk', 17.5735, 80.6396, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (766, 79, 4, 'Local Museum', 17.5775, 80.6436, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (767, 79, 4, 'Heritage Streets', 17.5815, 80.6476, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (768, 79, 5, 'Evening Food Street', 17.5855, 80.6516, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (769, 79, 1, 'Sunset Point', 17.5895, 80.6556, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (770, 79, 1, 'Eco Tourism Area', 17.5935, 80.6596, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (771, 80, 1, 'Medchal Lake', 17.6337, 78.485, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (772, 80, 4, 'Local Temple', 17.6377, 78.489, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (773, 80, 1, 'Nature Park', 17.6417, 78.493, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (774, 80, 1, 'Hill View Area', 17.6457, 78.497, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (775, 80, 4, 'Heritage Streets', 17.6497, 78.501, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (776, 80, 1, 'Sunset Point', 17.6537, 78.505, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (777, 80, 4, 'Local Museum', 17.6577, 78.509, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (778, 80, 5, 'Evening Cafes', 17.6617, 78.513, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (779, 80, 1, 'Lake Side Walk', 17.6657, 78.517, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (780, 80, 4, 'Town Market Area', 17.6697, 78.521, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (781, 81, 1, 'Kawal Forest Area', 19.362, 79.289, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (782, 81, 4, 'Tribal Village Walk', 19.366, 79.293, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (783, 81, 1, 'Waterfall View Point', 19.37, 79.297, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (784, 81, 2, 'Forest Trek Route', 19.374, 79.301, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (785, 81, 1, 'River Side Walk', 19.378, 79.305, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (786, 81, 1, 'Nature Park', 19.382, 79.309, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (787, 81, 4, 'Local Museum', 19.386, 79.313, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (788, 81, 1, 'Sunset Point', 19.39, 79.317, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (789, 81, 5, 'Evening Market', 19.394, 79.321, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (790, 81, 1, 'Eco Tourism Area', 19.398, 79.325, 0, 95);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (791, 82, 4, 'Narayanpet Fort', 16.8664, 77.4334, 0, 50);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (792, 82, 4, 'Handloom Weaving Center', 16.8704, 77.4374, 0, 55);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (793, 82, 4, 'Local Temple', 16.8744, 77.4414, 20, 60);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (794, 82, 1, 'River View Area', 16.8784, 77.4454, 0, 65);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (795, 82, 1, 'Nature Park', 16.8824, 77.4494, 0, 70);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (796, 82, 4, 'Heritage Streets', 16.8864, 77.4534, 20, 75);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (797, 82, 1, 'Sunset Point', 16.8904, 77.4574, 0, 80);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (798, 82, 4, 'Local Museum', 16.8944, 77.4614, 0, 85);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (799, 82, 5, 'Evening Food Street', 16.8984, 77.4654, 20, 90);
INSERT INTO places (place_id, destination_id, travel_type_id, name, latitude, longitude, entry_fee, avg_visit_time) VALUES (800, 82, 4, 'Town Market Area', 16.9024, 77.4694, 0, 95);

-- Reset sequences
SELECT setval('destinations_destination_id_seq', 83);
SELECT setval('hotels_hotel_id_seq', 801);
SELECT setval('places_place_id_seq', 801);

-- Seed roles
INSERT INTO roles (role_id, role_name) VALUES (1, 'admin') ON CONFLICT (role_id) DO NOTHING;
INSERT INTO roles (role_id, role_name) VALUES (2, 'traveler') ON CONFLICT (role_id) DO NOTHING;
INSERT INTO roles (role_id, role_name) VALUES (3, 'host') ON CONFLICT (role_id) DO NOTHING;

-- Seed admin user (email: admin@timetotravel.com, password: 123456)
INSERT INTO users (name, email, password_hash, phone, gender, role_id, is_active)
VALUES ('Admin', 'admin@timetotravel.com', '123456', '9000000000', 'OTHER', 1, true)
ON CONFLICT (email) DO NOTHING;

-- Seed group types
INSERT INTO group_types (group_type_id, type_name) VALUES (1, 'Solo') ON CONFLICT (group_type_id) DO NOTHING;
INSERT INTO group_types (group_type_id, type_name) VALUES (2, 'Duo') ON CONFLICT (group_type_id) DO NOTHING;
INSERT INTO group_types (group_type_id, type_name) VALUES (3, 'Family') ON CONFLICT (group_type_id) DO NOTHING;
INSERT INTO group_types (group_type_id, type_name) VALUES (4, 'Friends') ON CONFLICT (group_type_id) DO NOTHING;

SET session_replication_role = DEFAULT;
=======
--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: destinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."destinations" ("destination_id", "name", "state", "description", "best_season") VALUES
	(1, 'Visakhapatnam', 'Andhra Pradesh', NULL, NULL),
	(2, 'Vijayawada', 'Andhra Pradesh', NULL, NULL),
	(3, 'Tirupati', 'Andhra Pradesh', NULL, NULL),
	(4, 'Kurnool', 'Andhra Pradesh', NULL, NULL),
	(5, 'Rajahmundry', 'Andhra Pradesh', NULL, NULL),
	(6, 'Guntur', 'Andhra Pradesh', NULL, NULL),
	(7, 'Nellore', 'Andhra Pradesh', NULL, NULL),
	(8, 'Ongole', 'Andhra Pradesh', NULL, NULL),
	(9, 'Eluru', 'Andhra Pradesh', NULL, NULL),
	(10, 'Srikakulam', 'Andhra Pradesh', NULL, NULL),
	(11, 'Kakinada', 'Andhra Pradesh', NULL, NULL),
	(12, 'Anantapur', 'Andhra Pradesh', NULL, NULL),
	(13, 'Kadapa', 'Andhra Pradesh', NULL, NULL),
	(14, 'Chittoor', 'Andhra Pradesh', NULL, NULL),
	(15, 'Vizianagaram', 'Andhra Pradesh', NULL, NULL),
	(16, 'Machilipatnam', 'Andhra Pradesh', NULL, NULL),
	(17, 'Nandyal', 'Andhra Pradesh', NULL, NULL),
	(18, 'Proddatur', 'Andhra Pradesh', NULL, NULL),
	(19, 'Tenali', 'Andhra Pradesh', NULL, NULL),
	(20, 'Amaravati', 'Andhra Pradesh', NULL, NULL),
	(21, 'Panaji', 'Goa', NULL, NULL),
	(22, 'Calangute', 'Goa', NULL, NULL),
	(23, 'Candolim', 'Goa', NULL, NULL),
	(24, 'Mapusa', 'Goa', NULL, NULL),
	(25, 'Morjim', 'Goa', NULL, NULL),
	(26, 'Arambol', 'Goa', NULL, NULL),
	(27, 'Baga', 'Goa', NULL, NULL),
	(28, 'Anjuna', 'Goa', NULL, NULL),
	(29, 'Vagator', 'Goa', NULL, NULL),
	(30, 'Old Goa', 'Goa', NULL, NULL),
	(31, 'Margao', 'Goa', NULL, NULL),
	(32, 'Colva', 'Goa', NULL, NULL),
	(33, 'Benaulim', 'Goa', NULL, NULL),
	(34, 'Canacona', 'Goa', NULL, NULL),
	(35, 'Quepem', 'Goa', NULL, NULL),
	(36, 'Pernem', 'Goa', NULL, NULL),
	(37, 'Bardez', 'Goa', NULL, NULL),
	(38, 'Tiswadi', 'Goa', NULL, NULL),
	(39, 'Salcete', 'Goa', NULL, NULL),
	(40, 'Sanguem', 'Goa', NULL, NULL),
	(41, 'Vasco da Gama', 'Goa', NULL, NULL),
	(42, 'Ponda', 'Goa', NULL, NULL);


--
-- Data for Name: roadmap_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roadmaps; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: group_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: host_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hotels" ("hotel_id", "destination_id", "name", "price_per_night", "rating", "latitude", "longitude") VALUES
	(1, 1, 'Novotel Visakhapatnam Varun Beach', 9000.00, 4.6, 17.71230000, 83.31890000),
	(2, 1, 'The Park Visakhapatnam', 8500.00, 4.5, 17.71190000, 83.31980000),
	(3, 1, 'Ramada by Wyndham Vizag', 7500.00, 4.4, 17.72680000, 83.30530000),
	(4, 1, 'Four Points by Sheraton', 6000.00, 4.3, 17.71690000, 83.30120000),
	(5, 1, 'Keys Select Hotel', 4200.00, 4.1, 17.73320000, 83.31640000),
	(6, 1, 'Dolphin Hotel', 4800.00, 4.2, 17.72460000, 83.30510000),
	(7, 1, 'Hotel Daspalla', 8200.00, 4.5, 17.71290000, 83.30060000),
	(8, 1, 'Treebo Trend MVP Grand', 2200.00, 3.9, 17.73980000, 83.31820000),
	(9, 1, 'Hotel Meghalaya', 2000.00, 3.8, 17.71240000, 83.30570000),
	(10, 1, 'OYO Townhouse Vizag', 1800.00, 3.7, 17.72110000, 83.30980000),
	(11, 2, 'Novotel Vijayawada Varun', 8800.00, 4.6, 16.50620000, 80.62890000),
	(12, 2, 'Hyatt Place Vijayawada', 9200.00, 4.7, 16.49790000, 80.66430000),
	(13, 2, 'Quality Hotel DV Manor', 5500.00, 4.4, 16.51130000, 80.62470000),
	(14, 2, 'Hotel Ilapuram', 4500.00, 4.1, 16.50960000, 80.62380000),
	(15, 2, 'Hotel Aira', 7800.00, 4.5, 16.50720000, 80.65130000),
	(16, 2, 'Treebo Trend Kosala', 2100.00, 3.8, 16.51280000, 80.62190000),
	(17, 2, 'Hotel Southern Grand', 4800.00, 4.0, 16.50410000, 80.62320000),
	(18, 2, 'OYO Capital O', 1900.00, 3.7, 16.50660000, 80.62050000),
	(19, 2, 'Hotel Midcity', 1700.00, 3.6, 16.51210000, 80.62990000),
	(20, 2, 'Hotel City Central', 1600.00, 3.5, 16.51020000, 80.62410000),
	(21, 3, 'Taj Tirupati', 9500.00, 4.7, 13.63560000, 79.41530000),
	(22, 3, 'Marasa Sarovar Premiere', 8200.00, 4.6, 13.62690000, 79.41980000),
	(23, 3, 'Minerva Grand', 5200.00, 4.3, 13.63020000, 79.41750000),
	(24, 3, 'Hotel Bliss', 4600.00, 4.2, 13.62540000, 79.42090000),
	(25, 3, 'Ramee Guestline', 7800.00, 4.4, 13.62870000, 79.41490000),
	(26, 3, 'Treebo Trend Seven Hills', 2300.00, 3.8, 13.63080000, 79.41920000),
	(27, 3, 'Hotel Bhimas', 2400.00, 3.9, 13.62810000, 79.41780000),
	(28, 3, 'Hotel PLR Grand', 2100.00, 3.7, 13.62890000, 79.41630000),
	(29, 3, 'Hotel Harsha Residency', 1900.00, 3.6, 13.62960000, 79.41890000),
	(30, 3, 'Hotel Renigunta', 1700.00, 3.5, 13.64630000, 79.50410000),
	(31, 4, 'Trident Hotel Kurnool', 4200.00, 4.1, 15.82870000, 78.03820000),
	(32, 4, 'Hotel DVR Mansion', 3800.00, 4.0, 15.83090000, 78.04250000),
	(33, 4, 'Hotel Mourya Inn', 4000.00, 4.1, 15.83180000, 78.04070000),
	(34, 4, 'Hotel Athidhi Regency', 2200.00, 3.8, 15.82940000, 78.03910000),
	(35, 4, 'Hotel Eesha Residency', 2000.00, 3.7, 15.82790000, 78.04130000),
	(36, 4, 'Hotel Rajavihar', 6500.00, 4.4, 15.82560000, 78.03790000),
	(37, 4, 'Hotel Akshaya', 1800.00, 3.6, 15.82670000, 78.03860000),
	(38, 4, 'OYO Townhouse Kurnool', 1700.00, 3.5, 15.82980000, 78.04090000),
	(39, 4, 'Hotel Sai Teja', 1600.00, 3.4, 15.82830000, 78.04180000),
	(40, 4, 'Hotel Central Plaza', 3900.00, 4.0, 15.83010000, 78.03950000),
	(41, 5, 'River Bay Resort', 8800.00, 4.5, 17.00390000, 81.78660000),
	(42, 5, 'Hotel Anand Regency', 4200.00, 4.1, 17.00420000, 81.78930000),
	(43, 5, 'Manjeera Sarovar Premiere', 9000.00, 4.6, 16.99980000, 81.79090000),
	(44, 5, 'Hotel Shelton', 3800.00, 4.0, 17.00640000, 81.79210000),
	(45, 5, 'Hotel La Hospin', 2200.00, 3.8, 17.00580000, 81.79170000),
	(46, 5, 'OYO River View', 1900.00, 3.6, 17.00260000, 81.78520000),
	(47, 5, 'Hotel Royal Fort', 2000.00, 3.7, 17.00490000, 81.78990000),
	(48, 5, 'Hotel Akshaya', 1800.00, 3.5, 17.00330000, 81.78880000),
	(49, 5, 'Hotel Pushkar', 1700.00, 3.6, 17.00690000, 81.79250000),
	(50, 5, 'Hotel Jetty Grand', 4100.00, 4.0, 17.00740000, 81.79420000),
	(51, 6, 'The Capital Hotel', 7200.00, 4.4, 16.30650000, 80.43690000),
	(52, 6, 'Hotel Geetha Regency', 4200.00, 4.1, 16.30880000, 80.43750000),
	(53, 6, 'Hotel Siddhartha Grand', 4500.00, 4.2, 16.30590000, 80.43820000),
	(54, 6, 'Hotel Swarna Palace', 3900.00, 4.0, 16.30970000, 80.43560000),
	(55, 6, 'Hotel Karthikeya Grand', 6800.00, 4.3, 16.30430000, 80.43910000),
	(56, 6, 'Treebo Trend Empire', 2200.00, 3.8, 16.30740000, 80.43480000),
	(57, 6, 'Hotel V Royal', 2000.00, 3.7, 16.31010000, 80.43620000),
	(58, 6, 'Hotel Mourya Inn', 1900.00, 3.6, 16.30820000, 80.43510000),
	(59, 6, 'OYO Flagship Guntur', 1700.00, 3.5, 16.30680000, 80.43790000),
	(60, 6, 'Hotel Surya Grand', 4100.00, 4.0, 16.30520000, 80.44030000),
	(61, 7, 'Hotel Minerva Grand Nellore', 7600.00, 4.5, 14.44290000, 79.98680000),
	(62, 7, 'Hotel DR Utthama', 4200.00, 4.1, 14.44360000, 79.98730000),
	(63, 7, 'Hotel Blue Moon', 3900.00, 4.0, 14.44020000, 79.98590000),
	(64, 7, 'Hotel Sree Lakshmi Residency', 2200.00, 3.8, 14.44410000, 79.98450000),
	(65, 7, 'Hotel City Pride', 2000.00, 3.7, 14.44170000, 79.98820000),
	(66, 7, 'OYO Townhouse Nellore', 1800.00, 3.6, 14.44250000, 79.98910000),
	(67, 7, 'Hotel Kalpana Residency', 1700.00, 3.5, 14.44090000, 79.98760000),
	(68, 7, 'Hotel RRR Grand', 4100.00, 4.0, 14.44390000, 79.98620000),
	(69, 7, 'Hotel Mourya Inn Nellore', 4300.00, 4.2, 14.44530000, 79.98530000),
	(70, 7, 'Hotel Sai International', 1600.00, 3.4, 14.44120000, 79.98410000),
	(71, 8, 'Hotel Kaveri Grand', 7000.00, 4.4, 15.50560000, 80.04880000),
	(72, 8, 'Hotel Vikram Deluxe', 4200.00, 4.1, 15.50690000, 80.04720000),
	(73, 8, 'Hotel Central Park', 3900.00, 4.0, 15.50480000, 80.05030000),
	(74, 8, 'Hotel Raghavendra Residency', 2100.00, 3.8, 15.50360000, 80.04670000),
	(75, 8, 'Hotel Sitara Inn', 2000.00, 3.7, 15.50720000, 80.04890000),
	(76, 8, 'OYO Ongole Central', 1800.00, 3.6, 15.50510000, 80.04760000),
	(77, 8, 'Hotel Surya Inn', 1700.00, 3.5, 15.50420000, 80.04980000),
	(78, 8, 'Hotel Swarna Palace Ongole', 4100.00, 4.0, 15.50630000, 80.04610000),
	(79, 8, 'Hotel Mourya Inn Ongole', 4300.00, 4.2, 15.50760000, 80.04790000),
	(80, 8, 'Hotel Sai Residency', 1600.00, 3.4, 15.50390000, 80.04830000),
	(81, 9, 'Hotel Grand Arya', 6800.00, 4.4, 16.71120000, 81.09590000),
	(82, 9, 'Hotel Sri Ram Grand', 4200.00, 4.1, 16.70980000, 81.09630000),
	(83, 9, 'Hotel Blue Moon Eluru', 3900.00, 4.0, 16.71260000, 81.09480000),
	(84, 9, 'Hotel Vivera', 2200.00, 3.8, 16.71030000, 81.09790000),
	(85, 9, 'Hotel Sai Residency Eluru', 2000.00, 3.7, 16.70890000, 81.09540000),
	(86, 9, 'OYO Eluru Central', 1800.00, 3.6, 16.71180000, 81.09660000),
	(87, 9, 'Hotel Minerva Eluru', 4300.00, 4.2, 16.71320000, 81.09720000),
	(88, 9, 'Hotel Sri Lakshmi', 1700.00, 3.5, 16.70960000, 81.09830000),
	(89, 9, 'Hotel Mourya Inn Eluru', 4100.00, 4.0, 16.71090000, 81.09460000),
	(90, 9, 'Hotel City Park Eluru', 1600.00, 3.4, 16.70820000, 81.09610000),
	(91, 10, 'Hotel River View', 6500.00, 4.4, 18.29680000, 83.89790000),
	(92, 10, 'Hotel Ananda Inn', 4200.00, 4.1, 18.29830000, 83.89670000),
	(93, 10, 'Hotel Royal Park', 3900.00, 4.0, 18.29570000, 83.89920000),
	(94, 10, 'Hotel Sri Sai Residency', 2200.00, 3.8, 18.29760000, 83.89580000),
	(95, 10, 'Hotel Blue Moon Srikakulam', 2000.00, 3.7, 18.29620000, 83.89860000),
	(96, 10, 'OYO Srikakulam Central', 1800.00, 3.6, 18.29490000, 83.89730000),
	(97, 10, 'Hotel Mourya Inn Srikakulam', 4300.00, 4.2, 18.29910000, 83.89620000),
	(98, 10, 'Hotel Vamsi Residency', 1700.00, 3.5, 18.29540000, 83.89980000),
	(99, 10, 'Hotel Sri Lakshmi Grand', 4100.00, 4.0, 18.29790000, 83.89810000),
	(100, 10, 'Hotel City Square', 1600.00, 3.4, 18.29650000, 83.89690000),
	(101, 11, 'Paradigm Sarovar Portico', 7800.00, 4.5, 16.98980000, 82.24690000),
	(102, 11, 'Hotel Royal Park', 7200.00, 4.4, 16.98740000, 82.24510000),
	(103, 11, 'Hotel Subham Grand', 4200.00, 4.1, 16.98890000, 82.24780000),
	(104, 11, 'Hotel Viswa Residency', 3900.00, 4.0, 16.99020000, 82.24860000),
	(105, 11, 'Hotel Anand Regency', 2200.00, 3.8, 16.98710000, 82.24920000),
	(106, 11, 'OYO Kakinada Central', 1900.00, 3.6, 16.98860000, 82.24620000),
	(107, 11, 'Hotel Blue Moon Kakinada', 1800.00, 3.5, 16.98930000, 82.24570000),
	(108, 11, 'Hotel Mourya Inn Kakinada', 4300.00, 4.2, 16.99090000, 82.24710000),
	(109, 11, 'Hotel City Pride', 1700.00, 3.4, 16.98790000, 82.24890000),
	(110, 11, 'Hotel Central Park Kakinada', 4100.00, 4.0, 16.98960000, 82.24650000),
	(111, 12, 'Hotel Manasa Grand', 7000.00, 4.4, 14.68190000, 77.60030000),
	(112, 12, 'Hotel Blue Moon Anantapur', 4200.00, 4.1, 14.68280000, 77.59890000),
	(113, 12, 'Hotel Mourya Inn Anantapur', 4000.00, 4.0, 14.68410000, 77.59970000),
	(114, 12, 'Hotel Surya Residency', 2200.00, 3.8, 14.68120000, 77.60160000),
	(115, 12, 'Hotel Sai Teja', 2000.00, 3.7, 14.68350000, 77.60230000),
	(116, 12, 'OYO Anantapur Central', 1800.00, 3.6, 14.68210000, 77.60090000),
	(117, 12, 'Hotel Minerva Grand', 7600.00, 4.5, 14.68520000, 77.59810000),
	(118, 12, 'Hotel City Park', 1700.00, 3.5, 14.68060000, 77.60340000),
	(119, 12, 'Hotel Royal Palace', 4300.00, 4.2, 14.68470000, 77.59930000),
	(120, 12, 'Hotel Sri Lakshmi Residency', 1600.00, 3.4, 14.68390000, 77.60190000),
	(121, 13, 'Hotel Grand Arya Kadapa', 7200.00, 4.4, 14.47680000, 78.83560000),
	(122, 13, 'Hotel Mourya Inn Kadapa', 4300.00, 4.2, 14.47790000, 78.83690000),
	(123, 13, 'Hotel Blue Moon Kadapa', 4000.00, 4.0, 14.47560000, 78.83410000),
	(124, 13, 'Hotel Sri Lakshmi Grand', 2200.00, 3.8, 14.47430000, 78.83380000),
	(125, 13, 'Hotel Sai Residency Kadapa', 2000.00, 3.7, 14.47620000, 78.83720000),
	(126, 13, 'OYO Kadapa Central', 1800.00, 3.6, 14.47710000, 78.83540000),
	(127, 13, 'Hotel Minerva Grand Kadapa', 7800.00, 4.5, 14.47850000, 78.83460000),
	(128, 13, 'Hotel City Park Kadapa', 1700.00, 3.5, 14.47510000, 78.83610000),
	(129, 13, 'Hotel Royal Fort Kadapa', 4200.00, 4.1, 14.47690000, 78.83800000),
	(130, 13, 'Hotel Central Park Kadapa', 4100.00, 4.0, 14.47820000, 78.83390000),
	(131, 14, 'Fortune Select Grand Ridge', 8200.00, 4.6, 13.63090000, 79.41460000),
	(132, 14, 'Hotel Pai Viceroy', 7600.00, 4.5, 13.62780000, 79.41830000),
	(133, 14, 'Hotel Bliss Chittoor', 4500.00, 4.2, 13.62860000, 79.41670000),
	(134, 14, 'Hotel Minerva Grand Chittoor', 4800.00, 4.3, 13.62940000, 79.41910000),
	(135, 14, 'Hotel Sri Lakshmi Residency', 2300.00, 3.8, 13.62710000, 79.41760000),
	(136, 14, 'OYO Chittoor Central', 2000.00, 3.6, 13.62680000, 79.41590000),
	(137, 14, 'Hotel Harsha Residency', 1900.00, 3.7, 13.63020000, 79.41890000),
	(138, 14, 'Hotel PLR Grand Chittoor', 2100.00, 3.9, 13.62830000, 79.41620000),
	(139, 14, 'Hotel Ramee Guestline', 7800.00, 4.4, 13.63110000, 79.41430000),
	(140, 14, 'Hotel City Square Chittoor', 1700.00, 3.5, 13.62980000, 79.41730000),
	(141, 15, 'Hotel Ananda Inn Vizianagaram', 6800.00, 4.4, 18.11390000, 83.41210000),
	(142, 15, 'Hotel Royal Park Vizianagaram', 4200.00, 4.1, 18.11460000, 83.41130000),
	(143, 15, 'Hotel Mourya Inn Vizianagaram', 4300.00, 4.2, 18.11580000, 83.41090000),
	(144, 15, 'Hotel Blue Moon Vizianagaram', 3900.00, 4.0, 18.11270000, 83.41340000),
	(145, 15, 'Hotel Sri Sai Residency', 2200.00, 3.8, 18.11410000, 83.41420000),
	(146, 15, 'OYO Vizianagaram Central', 1900.00, 3.6, 18.11320000, 83.41280000),
	(147, 15, 'Hotel City Pride Vizianagaram', 1800.00, 3.5, 18.11510000, 83.41170000),
	(148, 15, 'Hotel Minerva Grand Vizianagaram', 7400.00, 4.5, 18.11630000, 83.41300000),
	(149, 15, 'Hotel Lakshmi Grand', 4100.00, 4.0, 18.11290000, 83.41490000),
	(150, 15, 'Hotel Vamsi Residency', 1700.00, 3.4, 18.11480000, 83.41250000),
	(151, 16, 'Hotel Kennison', 6500.00, 4.4, 16.18620000, 81.13740000),
	(152, 16, 'Hotel Chandra Residency', 4200.00, 4.1, 16.18540000, 81.13680000),
	(153, 16, 'Hotel Mourya Inn Machilipatnam', 4300.00, 4.2, 16.18710000, 81.13820000),
	(154, 16, 'Hotel Sri Lakshmi Residency', 2200.00, 3.8, 16.18490000, 81.13590000),
	(155, 16, 'Hotel Blue Moon Machilipatnam', 2000.00, 3.7, 16.18680000, 81.13790000),
	(156, 16, 'OYO Machilipatnam Central', 1800.00, 3.6, 16.18560000, 81.13630000),
	(157, 16, 'Hotel Royal Fort Machilipatnam', 4100.00, 4.0, 16.18790000, 81.13910000),
	(158, 16, 'Hotel Sai Teja', 1700.00, 3.5, 16.18420000, 81.13530000),
	(159, 16, 'Hotel Minerva Grand Machilipatnam', 7200.00, 4.5, 16.18860000, 81.13880000),
	(160, 16, 'Hotel City Park Machilipatnam', 1600.00, 3.4, 16.18510000, 81.13600000),
	(161, 17, 'Hotel DVR Mansion Nandyal', 7000.00, 4.4, 15.47790000, 78.48220000),
	(162, 17, 'Hotel Mourya Inn Nandyal', 4300.00, 4.2, 15.47650000, 78.48360000),
	(163, 17, 'Hotel Blue Moon Nandyal', 4000.00, 4.0, 15.47830000, 78.48170000),
	(164, 17, 'Hotel Sri Lakshmi Grand', 2200.00, 3.8, 15.47920000, 78.48090000),
	(165, 17, 'Hotel Sai Residency Nandyal', 2000.00, 3.7, 15.47690000, 78.48430000),
	(166, 17, 'OYO Nandyal Central', 1800.00, 3.6, 15.47860000, 78.48280000),
	(167, 17, 'Hotel Central Park Nandyal', 4100.00, 4.1, 15.48010000, 78.48390000),
	(168, 17, 'Hotel Royal Fort Nandyal', 4200.00, 4.0, 15.47720000, 78.48510000),
	(169, 17, 'Hotel City Pride Nandyal', 1700.00, 3.5, 15.47980000, 78.48130000),
	(170, 17, 'Hotel Minerva Grand Nandyal', 7600.00, 4.5, 15.48150000, 78.48460000),
	(171, 18, 'Hotel Sri Sai Grand', 6800.00, 4.4, 14.73980000, 78.55140000),
	(172, 18, 'Hotel Mourya Inn Proddatur', 4200.00, 4.1, 14.74090000, 78.55070000),
	(173, 18, 'Hotel Blue Moon Proddatur', 3900.00, 4.0, 14.73860000, 78.55230000),
	(174, 18, 'Hotel Sri Lakshmi Residency', 2200.00, 3.8, 14.73920000, 78.54980000),
	(175, 18, 'Hotel Sai Teja Proddatur', 2000.00, 3.7, 14.74130000, 78.55310000),
	(176, 18, 'OYO Proddatur Central', 1800.00, 3.6, 14.73970000, 78.55190000),
	(177, 18, 'Hotel Central Park Proddatur', 4100.00, 4.0, 14.73890000, 78.55010000),
	(178, 18, 'Hotel City Square Proddatur', 1700.00, 3.5, 14.74060000, 78.55280000),
	(179, 18, 'Hotel Minerva Grand Proddatur', 7400.00, 4.5, 14.74210000, 78.55040000),
	(180, 18, 'Hotel Royal Fort Proddatur', 4300.00, 4.2, 14.73830000, 78.55160000),
	(181, 19, 'Hotel Chandra Grand', 6600.00, 4.4, 16.24080000, 80.64210000),
	(182, 19, 'Hotel Mourya Inn Tenali', 4200.00, 4.1, 16.23960000, 80.64130000),
	(183, 19, 'Hotel Blue Moon Tenali', 3900.00, 4.0, 16.24110000, 80.64020000),
	(184, 19, 'Hotel Sri Lakshmi Residency', 2200.00, 3.8, 16.23920000, 80.64340000),
	(185, 19, 'Hotel Sai Residency Tenali', 2000.00, 3.7, 16.24230000, 80.64170000),
	(186, 19, 'OYO Tenali Central', 1800.00, 3.6, 16.24010000, 80.64290000),
	(187, 19, 'Hotel Central Park Tenali', 4100.00, 4.0, 16.24180000, 80.64090000),
	(188, 19, 'Hotel City Pride Tenali', 1700.00, 3.5, 16.23990000, 80.64110000),
	(189, 19, 'Hotel Minerva Grand Tenali', 7200.00, 4.5, 16.24320000, 80.64260000),
	(190, 19, 'Hotel Royal Palace Tenali', 4300.00, 4.2, 16.24270000, 80.64050000),
	(191, 20, 'The Gateway Hotel Amaravati', 8500.00, 4.6, 16.57390000, 80.35890000),
	(192, 20, 'Hotel Minerva Grand Amaravati', 7800.00, 4.5, 16.57520000, 80.36040000),
	(193, 20, 'Hotel Mourya Inn Amaravati', 4200.00, 4.1, 16.57210000, 80.35760000),
	(194, 20, 'Hotel Blue Moon Amaravati', 3900.00, 4.0, 16.57140000, 80.35920000),
	(195, 20, 'Hotel Sri Lakshmi Residency', 2200.00, 3.8, 16.57080000, 80.35690000),
	(196, 20, 'Hotel Sai Residency Amaravati', 2000.00, 3.7, 16.57340000, 80.36080000),
	(197, 20, 'OYO Amaravati Central', 1800.00, 3.6, 16.57290000, 80.35820000),
	(198, 20, 'Hotel Central Park Amaravati', 4100.00, 4.0, 16.57460000, 80.35970000),
	(199, 20, 'Hotel City Square Amaravati', 1700.00, 3.5, 16.57190000, 80.35730000),
	(200, 20, 'Hotel Royal Palace Amaravati', 4300.00, 4.2, 16.57580000, 80.36110000),
	(201, 21, 'Goa Marriott Resort & Spa', 14000.00, 4.6, 15.50220000, 73.82980000),
	(202, 21, 'Grand Hyatt Goa', 15000.00, 4.7, 15.46420000, 73.80710000),
	(203, 21, 'Country Inn & Suites Panaji', 6500.00, 4.3, 15.49900000, 73.82830000),
	(204, 21, 'Hotel Mandovi', 5200.00, 4.1, 15.49830000, 73.82790000),
	(205, 21, 'The Crown Goa', 6000.00, 4.2, 15.50120000, 73.82940000),
	(206, 21, 'Hotel Manvin''s', 2800.00, 3.8, 15.49890000, 73.82680000),
	(207, 21, 'Hotel Viva Panjim', 3000.00, 4.0, 15.49670000, 73.82760000),
	(208, 21, 'OYO Panaji Central', 2000.00, 3.6, 15.49980000, 73.82810000),
	(209, 21, 'Treebo Trend Sunheads', 2300.00, 3.7, 15.50060000, 73.82630000),
	(210, 21, 'Hotel Venite', 1800.00, 3.5, 15.49720000, 73.82910000),
	(211, 22, 'Taj Fort Aguada Resort & Spa', 18000.00, 4.8, 15.48970000, 73.77360000),
	(212, 22, 'Le Méridien Goa', 16000.00, 4.6, 15.52260000, 73.77410000),
	(213, 22, 'Hard Rock Hotel Goa', 8500.00, 4.4, 15.55740000, 73.75280000),
	(214, 22, 'Resort Terra Paraiso', 6500.00, 4.2, 15.54420000, 73.75810000),
	(215, 22, 'Azzure By Spree', 6000.00, 4.1, 15.54890000, 73.75460000),
	(216, 22, 'Hotel Calangute Towers', 3200.00, 3.9, 15.54370000, 73.75680000),
	(217, 22, 'La Flamingo', 2800.00, 3.8, 15.55010000, 73.75320000),
	(218, 22, 'OYO Flagship Calangute', 2000.00, 3.6, 15.54690000, 73.75590000),
	(219, 22, 'Treebo Trend Dona Eliza', 2400.00, 3.7, 15.55220000, 73.75740000),
	(220, 22, 'Hotel Sea Shore', 1800.00, 3.5, 15.54820000, 73.75410000),
	(221, 23, 'Seashell Suites & Villas', 14000.00, 4.7, 15.52020000, 73.76570000),
	(222, 23, 'Taj Holiday Village', 17000.00, 4.8, 15.51810000, 73.76300000),
	(223, 23, 'Novotel Goa Candolim', 9000.00, 4.4, 15.52050000, 73.77110000),
	(224, 23, 'Fortune Acron Regina', 7500.00, 4.3, 15.51890000, 73.76140000),
	(225, 23, 'Santana Beach Resort', 6200.00, 4.2, 15.51560000, 73.76280000),
	(226, 23, 'Hotel Sonesta Inns', 3200.00, 3.9, 15.51770000, 73.76430000),
	(227, 23, 'Silver Sands Serenity', 2800.00, 3.8, 15.51620000, 73.76090000),
	(228, 23, 'OYO Candolim Beach Road', 2000.00, 3.6, 15.51860000, 73.76370000),
	(229, 23, 'Treebo Trend Jesant Valley', 2400.00, 3.7, 15.51980000, 73.76510000),
	(230, 23, 'Hotel Casa De Goa', 2600.00, 3.8, 15.52010000, 73.76230000),
	(231, 24, 'The Crown of North Goa', 9000.00, 4.4, 15.59090000, 73.81470000),
	(232, 24, 'Hotel Green Park', 5200.00, 4.1, 15.59180000, 73.81290000),
	(233, 24, 'Hotel Royale Heritage', 4800.00, 4.0, 15.58970000, 73.81130000),
	(234, 24, 'Treebo Trend La Paz', 2600.00, 3.8, 15.59030000, 73.81350000),
	(235, 24, 'Hotel Sharayu', 2300.00, 3.7, 15.59220000, 73.81420000),
	(236, 24, 'OYO Mapusa Central', 2000.00, 3.6, 15.59140000, 73.81210000),
	(237, 24, 'Hotel Alankar', 1800.00, 3.5, 15.58990000, 73.81080000),
	(238, 24, 'Hotel Menino', 1700.00, 3.4, 15.59070000, 73.81390000),
	(239, 24, 'Hotel Mapusa Residency', 4200.00, 4.0, 15.59280000, 73.81540000),
	(240, 24, 'Hotel Hill Rock', 7800.00, 4.3, 15.59430000, 73.81620000),
	(241, 25, 'Marbela Beach Resort', 13000.00, 4.6, 15.62940000, 73.74240000),
	(242, 25, 'Azaya Beach Resort', 15000.00, 4.7, 15.62860000, 73.74290000),
	(243, 25, 'La Cabana Beach Resort', 8500.00, 4.4, 15.63070000, 73.74260000),
	(244, 25, 'Montego Bay Beach Village', 7200.00, 4.2, 15.62820000, 73.73460000),
	(245, 25, 'Living Room by Seasons', 3200.00, 3.9, 15.63120000, 73.73690000),
	(246, 25, 'Treebo Trend Morjim Plaza', 2600.00, 3.8, 15.62980000, 73.73740000),
	(247, 25, 'OYO Morjim Beach Road', 2000.00, 3.6, 15.63060000, 73.73520000),
	(248, 25, 'Hotel Morjim Hermitage', 2300.00, 3.7, 15.62890000, 73.73410000),
	(249, 25, 'Hotel Sea Breeze', 1800.00, 3.5, 15.62930000, 73.73600000),
	(250, 25, 'Resorte Marinha Dourada', 6800.00, 4.3, 15.63220000, 73.73950000),
	(251, 26, 'Ashwem Beach Resort', 12000.00, 4.6, 15.65880000, 73.74120000),
	(252, 26, 'Arambol Plaza Beach Resort', 6500.00, 4.2, 15.68280000, 73.73610000),
	(253, 26, 'Lotus Sutra', 13500.00, 4.7, 15.68320000, 73.73640000),
	(254, 26, 'Swati Hotel Arambol', 5200.00, 4.1, 15.70490000, 73.72130000),
	(255, 26, 'This Is It Beach Resort', 6000.00, 4.2, 15.70160000, 73.71850000),
	(256, 26, 'Treebo Trend Arambol', 2600.00, 3.8, 15.70310000, 73.71920000),
	(257, 26, 'OYO Arambol Beach Road', 2000.00, 3.6, 15.70240000, 73.72010000),
	(258, 26, 'Hotel Arambol Paradise', 2300.00, 3.7, 15.70430000, 73.72220000),
	(259, 26, 'Hotel Sea View Arambol', 1800.00, 3.5, 15.70560000, 73.71890000),
	(260, 26, 'Hotel Mountain View Arambol', 1700.00, 3.4, 15.70720000, 73.72350000),
	(261, 27, 'Taj Holiday Village Baga', 18000.00, 4.8, 15.55200000, 73.75110000),
	(262, 27, 'Acron Waterfront Resort', 14000.00, 4.6, 15.55470000, 73.75060000),
	(263, 27, 'Resort Rio', 9000.00, 4.4, 15.55540000, 73.75100000),
	(264, 27, 'Colonia Santa Maria', 7500.00, 4.3, 15.55690000, 73.75140000),
	(265, 27, 'Lazy Lagoon Sarovar Portico', 8200.00, 4.2, 15.55310000, 73.74810000),
	(266, 27, 'Hotel Baga Pride', 3200.00, 3.9, 15.55460000, 73.75090000),
	(267, 27, 'Hotel Fiesta Beach Resort', 2800.00, 3.8, 15.55630000, 73.75200000),
	(268, 27, 'OYO Baga Beach Road', 2000.00, 3.6, 15.55510000, 73.74970000),
	(269, 27, 'Treebo Trend Beach Box', 2400.00, 3.7, 15.55720000, 73.75180000),
	(270, 27, 'Hotel Sea Hawk', 1800.00, 3.5, 15.55380000, 73.74890000),
	(271, 28, 'W Goa', 22000.00, 4.8, 15.58160000, 73.74440000),
	(272, 28, 'Anamiva Goa', 15000.00, 4.6, 15.58220000, 73.74520000),
	(273, 28, 'Spazio Leisure Resort', 8000.00, 4.3, 15.58310000, 73.74680000),
	(274, 28, 'Granpa’s Inn Hotel', 6500.00, 4.2, 15.59630000, 73.73910000),
	(275, 28, 'Casa Anjuna', 7200.00, 4.4, 15.59520000, 73.74240000),
	(276, 28, 'Treebo Trend Casa Anjuna', 2600.00, 3.8, 15.59580000, 73.74190000),
	(277, 28, 'OYO Anjuna Beach Road', 2000.00, 3.6, 15.59660000, 73.74010000),
	(278, 28, 'Hotel Down Hill Village', 2300.00, 3.7, 15.59490000, 73.74320000),
	(279, 28, 'Hotel Casa De Anjuna', 1900.00, 3.5, 15.59710000, 73.74280000),
	(280, 28, 'Hotel Blue Pearl', 1700.00, 3.4, 15.59860000, 73.73940000),
	(281, 29, 'W Goa Vagator', 21000.00, 4.8, 15.60680000, 73.73650000),
	(282, 29, 'Anahata Retreat', 16000.00, 4.7, 15.60720000, 73.73620000),
	(283, 29, 'Leoney Resort', 7500.00, 4.2, 15.60810000, 73.73790000),
	(284, 29, 'Cochichos Resort', 6800.00, 4.1, 15.60120000, 73.73810000),
	(285, 29, 'The Grand Leoney', 7200.00, 4.3, 15.60310000, 73.74030000),
	(286, 29, 'Treebo Trend Vagator', 2600.00, 3.8, 15.60220000, 73.73790000),
	(287, 29, 'OYO Vagator Beach Road', 2000.00, 3.6, 15.60180000, 73.73660000),
	(288, 29, 'Hotel Hill Top View', 2300.00, 3.7, 15.60440000, 73.74120000),
	(289, 29, 'Hotel Vagator Sea View', 1800.00, 3.5, 15.60360000, 73.73900000),
	(290, 29, 'Hotel Casa Vagator', 1700.00, 3.4, 15.60090000, 73.73720000),
	(291, 30, 'Heritage Village Resort & Spa', 12000.00, 4.6, 15.46060000, 73.80710000),
	(292, 30, 'Hotel Surya Palace', 10000.00, 4.5, 15.50030000, 73.91160000),
	(293, 30, 'Old Goa Residency', 6500.00, 4.2, 15.50070000, 73.91090000),
	(294, 30, 'Hotel La Grace', 6000.00, 4.1, 15.49960000, 73.91230000),
	(295, 30, 'Hotel Mandovi Palace', 5800.00, 4.0, 15.50120000, 73.91180000),
	(296, 30, 'Treebo Trend Old Goa', 2600.00, 3.8, 15.49990000, 73.91310000),
	(297, 30, 'OYO Old Goa Central', 2000.00, 3.6, 15.50010000, 73.91270000),
	(298, 30, 'Hotel River View Old Goa', 2300.00, 3.7, 15.50160000, 73.91040000),
	(299, 30, 'Hotel Casa De Old Goa', 1800.00, 3.5, 15.49930000, 73.91150000),
	(300, 30, 'Hotel Basilica Inn', 1700.00, 3.4, 15.50090000, 73.91340000),
	(301, 31, 'The Fern Kadamba Hotel & Spa', 9000.00, 4.5, 15.27580000, 73.95890000),
	(302, 31, 'Radisson Goa Candolim City Center', 8500.00, 4.4, 15.27690000, 73.95980000),
	(303, 31, 'Hotel Nanutel', 5500.00, 4.2, 15.27530000, 73.95930000),
	(304, 31, 'Hotel Laxmi Empire', 5200.00, 4.1, 15.27640000, 73.95720000),
	(305, 31, 'Hotel Xec Residency', 4800.00, 4.0, 15.27490000, 73.95640000),
	(306, 31, 'Treebo Trend City Stay', 2600.00, 3.8, 15.27720000, 73.95810000),
	(307, 31, 'Hotel Madhuvan', 2300.00, 3.7, 15.27560000, 73.95760000),
	(308, 31, 'OYO Margao Central', 2000.00, 3.6, 15.27680000, 73.95910000),
	(309, 31, 'Hotel City Comfort', 1800.00, 3.5, 15.27430000, 73.95840000),
	(310, 31, 'Hotel Welcome', 1700.00, 3.4, 15.27610000, 73.96020000),
	(311, 32, 'Kenilworth Resort & Spa', 14000.00, 4.7, 15.27920000, 73.91360000),
	(312, 32, 'Longuinhos Beach Resort', 12000.00, 4.6, 15.27900000, 73.91340000),
	(313, 32, 'Star Beach Resort', 6500.00, 4.2, 15.28040000, 73.91410000),
	(314, 32, 'William''s Beach Retreat', 5800.00, 4.1, 15.27590000, 73.91360000),
	(315, 32, 'Silva Heritage Resort', 6000.00, 4.0, 15.27440000, 73.91080000),
	(316, 32, 'Treebo Trend Green View', 2600.00, 3.8, 15.27680000, 73.91190000),
	(317, 32, 'Hotel Colva Kinara', 2300.00, 3.7, 15.27810000, 73.91320000),
	(318, 32, 'OYO Colva Beach Road', 2000.00, 3.6, 15.27530000, 73.91030000),
	(319, 32, 'Hotel Silver Sands', 1800.00, 3.5, 15.27740000, 73.91210000),
	(320, 32, 'Hotel Amigo Plaza', 1700.00, 3.4, 15.27610000, 73.91380000),
	(321, 33, 'Taj Exotica Resort & Spa', 22000.00, 4.8, 15.25400000, 73.92390000),
	(322, 33, 'Azaya Beach Resort', 15000.00, 4.7, 15.25370000, 73.92400000),
	(323, 33, 'Joecons Beach Resort', 7500.00, 4.3, 15.25590000, 73.92330000),
	(324, 33, 'La Grace Resort', 6500.00, 4.2, 15.25280000, 73.92420000),
	(325, 33, 'Hotel San Joao', 6000.00, 4.1, 15.25470000, 73.92310000),
	(326, 33, 'Treebo Trend Varca', 2600.00, 3.8, 15.25720000, 73.92090000),
	(327, 33, 'Hotel Failaka', 2300.00, 3.7, 15.25560000, 73.92460000),
	(328, 33, 'OYO Benaulim Beach', 2000.00, 3.6, 15.25330000, 73.92200000),
	(329, 33, 'Hotel Lotus Beach', 1800.00, 3.5, 15.25690000, 73.92180000),
	(330, 33, 'Hotel Palm Grove', 1700.00, 3.4, 15.25410000, 73.92390000),
	(331, 34, 'The LaLiT Golf & Spa Resort', 20000.00, 4.8, 15.01010000, 74.02320000),
	(332, 34, 'Art Resort Goa', 13000.00, 4.6, 15.00980000, 74.02300000),
	(333, 34, 'Cola Beach Resort', 8500.00, 4.4, 15.03680000, 73.95960000),
	(334, 34, 'Agonda Cottages', 7000.00, 4.2, 15.04160000, 73.99410000),
	(335, 34, 'Dunhill Beach Resort', 6500.00, 4.1, 15.00970000, 74.02310000),
	(336, 34, 'Treebo Trend Canacona', 2600.00, 3.8, 15.00990000, 74.02270000),
	(337, 34, 'Hotel Sun N Moon', 2300.00, 3.7, 15.01000000, 74.02410000),
	(338, 34, 'OYO Palolem Central', 2000.00, 3.6, 15.00960000, 74.02340000),
	(339, 34, 'Hotel Palolem Beach Resort', 1800.00, 3.5, 15.00980000, 74.02300000),
	(340, 34, 'Hotel Neptune Point', 1700.00, 3.4, 15.01010000, 74.02290000),
	(341, 35, 'The Postcard Hideaway', 11000.00, 4.6, 15.19860000, 74.06280000),
	(342, 35, 'Wildflower Villas', 9500.00, 4.5, 15.20130000, 74.06090000),
	(343, 35, 'Hotel Quepem Residency', 5200.00, 4.1, 15.21260000, 74.07890000),
	(344, 35, 'Hotel Woodlands', 4800.00, 4.0, 15.21320000, 74.07750000),
	(345, 35, 'Hotel Central Park Quepem', 5000.00, 4.0, 15.21180000, 74.07960000),
	(346, 35, 'Treebo Trend Quepem', 2600.00, 3.8, 15.21210000, 74.08020000),
	(347, 35, 'Hotel City Pride Quepem', 2300.00, 3.7, 15.21430000, 74.07810000),
	(348, 35, 'OYO Quepem Central', 2000.00, 3.6, 15.21370000, 74.07990000),
	(349, 35, 'Hotel Sai Residency Quepem', 1800.00, 3.5, 15.21120000, 74.07720000),
	(350, 35, 'Hotel Hill View Quepem', 1700.00, 3.4, 15.21490000, 74.08080000),
	(351, 36, 'Ahilya by the Sea', 18000.00, 4.8, 15.71620000, 73.74550000),
	(352, 36, 'Red Earth Kabini Goa', 14000.00, 4.6, 15.71580000, 73.74520000),
	(353, 36, 'Arambol Lake Resort', 6500.00, 4.2, 15.68410000, 73.73780000),
	(354, 36, 'Mandrem Retreat', 6000.00, 4.1, 15.65560000, 73.74170000),
	(355, 36, 'Ashwem Beach Resort', 5800.00, 4.0, 15.65870000, 73.74110000),
	(356, 36, 'Treebo Trend Ashwem', 2600.00, 3.8, 15.65910000, 73.74130000),
	(357, 36, 'Hotel Nanu Resort', 2400.00, 3.7, 15.62130000, 73.73520000),
	(358, 36, 'OYO Pernem Central', 2000.00, 3.6, 15.71830000, 73.73090000),
	(359, 36, 'Hotel Sea Pearl', 1800.00, 3.5, 15.72040000, 73.73250000),
	(360, 36, 'Hotel Hill Breeze', 1700.00, 3.4, 15.72210000, 73.73690000),
	(361, 37, 'Taj Fort Aguada Heritage', 20000.00, 4.9, 15.48960000, 73.77350000),
	(362, 37, 'Le Méridien Goa', 16000.00, 4.7, 15.52260000, 73.77410000),
	(363, 37, 'Hard Rock Hotel Goa', 9000.00, 4.4, 15.55740000, 73.75280000),
	(364, 37, 'Resort Terra Paraiso', 6800.00, 4.2, 15.54420000, 73.75810000),
	(365, 37, 'Acron Waterfront Resort', 7500.00, 4.3, 15.55490000, 73.74880000),
	(366, 37, 'Treebo Trend Calangute', 2600.00, 3.8, 15.54780000, 73.75630000),
	(367, 37, 'Hotel Calangute Towers', 3000.00, 3.9, 15.54370000, 73.75680000),
	(368, 37, 'OYO Bardez Central', 2000.00, 3.6, 15.55230000, 73.75420000),
	(369, 37, 'Hotel Sea Breeze', 1800.00, 3.5, 15.54960000, 73.75310000),
	(370, 37, 'Hotel Royal Heritage', 1700.00, 3.4, 15.55120000, 73.75560000),
	(371, 38, 'Goa Marriott Resort & Spa', 14000.00, 4.6, 15.50240000, 73.82990000),
	(372, 38, 'Grand Hyatt Goa', 15000.00, 4.7, 15.46390000, 73.80730000),
	(373, 38, 'The Crown Goa', 6000.00, 4.2, 15.50120000, 73.82940000),
	(374, 38, 'Country Inn & Suites Panaji', 6500.00, 4.3, 15.49910000, 73.82840000),
	(375, 38, 'Hotel Mandovi', 5200.00, 4.1, 15.49830000, 73.82790000),
	(376, 38, 'Treebo Trend Sunheads', 2300.00, 3.7, 15.50060000, 73.82630000),
	(377, 38, 'Hotel Manvin''s', 2800.00, 3.8, 15.49890000, 73.82680000),
	(378, 38, 'OYO Panaji Central', 2000.00, 3.6, 15.49980000, 73.82810000),
	(379, 38, 'Hotel Venite', 1800.00, 3.5, 15.49720000, 73.82910000),
	(380, 38, 'Hotel Viva Panjim', 3000.00, 4.0, 15.49670000, 73.82760000),
	(381, 39, 'Alila Diwa Goa', 18000.00, 4.8, 15.33080000, 73.91320000),
	(382, 39, 'The Leela Goa', 22000.00, 4.9, 15.15690000, 73.94620000),
	(383, 39, 'Planet Hollywood Goa', 9500.00, 4.4, 15.19660000, 73.93890000),
	(384, 39, 'Heritage Village Resort', 8200.00, 4.3, 15.24640000, 73.94950000),
	(385, 39, 'Nanu Resort Betalbatim', 7000.00, 4.2, 15.24890000, 73.91260000),
	(386, 39, 'Treebo Trend Majorda', 2600.00, 3.8, 15.14620000, 73.94380000),
	(387, 39, 'Hotel Colva Residency', 2400.00, 3.7, 15.27810000, 73.91320000),
	(388, 39, 'OYO Colva Central', 2000.00, 3.6, 15.27530000, 73.91030000),
	(389, 39, 'Hotel Amigo Plaza', 1800.00, 3.5, 15.27610000, 73.91380000),
	(390, 39, 'Hotel Silver Sands', 1700.00, 3.4, 15.27740000, 73.91210000),
	(391, 40, 'Dudhsagar Spa Resort', 12000.00, 4.6, 15.31890000, 74.08120000),
	(392, 40, 'The Postcard Hideaway Netravali', 11000.00, 4.5, 15.33050000, 74.19020000),
	(393, 40, 'Hotel Jungle Book', 6500.00, 4.2, 15.33420000, 74.18780000),
	(394, 40, 'Hotel Netravali Retreat', 6000.00, 4.1, 15.33160000, 74.18890000),
	(395, 40, 'Hotel Nature View', 5800.00, 4.0, 15.32980000, 74.18640000),
	(396, 40, 'Treebo Trend Sanguem', 2600.00, 3.8, 15.32790000, 74.18530000),
	(397, 40, 'Hotel Sai Residency Sanguem', 2300.00, 3.7, 15.32840000, 74.18420000),
	(398, 40, 'OYO Sanguem Central', 2000.00, 3.6, 15.32680000, 74.18390000),
	(399, 40, 'Hotel Hill View Sanguem', 1800.00, 3.5, 15.32560000, 74.18610000),
	(400, 40, 'Hotel Green Valley', 1700.00, 3.4, 15.32910000, 74.18270000);


--
-- Data for Name: travel_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."places" ("place_id", "destination_id", "travel_type_id", "name", "latitude", "longitude", "entry_fee", "avg_visit_time") VALUES
	(1, 1, NULL, 'RK Beach', 17.71280000, 83.31860000, 0.00, 90),
	(2, 1, NULL, 'Kailasagiri Hill Park', 17.74730000, 83.34360000, 20.00, 90),
	(3, 1, NULL, 'INS Kursura Submarine Museum', 17.71240000, 83.32990000, 40.00, 60),
	(4, 1, NULL, 'Yarada Beach', 17.65980000, 83.27460000, 0.00, 120),
	(5, 1, NULL, 'Borra Caves', 18.28700000, 83.03760000, 40.00, 120),
	(6, 1, NULL, 'Simhachalam Temple', 17.76630000, 83.24970000, 0.00, 90),
	(7, 1, NULL, 'Ross Hill Church', 17.68860000, 83.28950000, 0.00, 45),
	(8, 1, NULL, 'Araku Valley', 18.32730000, 82.87720000, 0.00, 180),
	(9, 1, NULL, 'Dolphin''s Nose Viewpoint', 17.67650000, 83.28720000, 0.00, 45),
	(10, 1, NULL, 'Scuba Diving Rushikonda', 17.78290000, 83.38560000, 3500.00, 120),
	(11, 2, NULL, 'Kanaka Durga Temple', 16.51500000, 80.61670000, 0.00, 90),
	(12, 2, NULL, 'Prakasam Barrage', 16.50620000, 80.61170000, 0.00, 45),
	(13, 2, NULL, 'Bhavani Island', 16.50500000, 80.62050000, 50.00, 120),
	(14, 2, NULL, 'Gandhi Hill', 16.52830000, 80.60370000, 0.00, 60),
	(15, 2, NULL, 'Undavalli Caves', 16.49780000, 80.57960000, 25.00, 90),
	(16, 2, NULL, 'Mangalagiri Temple', 16.43080000, 80.56890000, 0.00, 60),
	(17, 2, NULL, 'Kondapalli Fort', 16.62680000, 80.53560000, 0.00, 90),
	(18, 2, NULL, 'VMC Park', 16.51230000, 80.62480000, 0.00, 60),
	(19, 2, NULL, 'Krishna River Cruise', 16.50680000, 80.61990000, 300.00, 60),
	(20, 2, NULL, 'Kolavennu Backwaters', 16.45760000, 80.54280000, 0.00, 90),
	(21, 3, NULL, 'Tirumala Venkateswara Temple', 13.68330000, 79.34740000, 0.00, 180),
	(22, 3, NULL, 'Silathoranam', 13.68390000, 79.35060000, 0.00, 45),
	(23, 3, NULL, 'Kapila Theertham', 13.64530000, 79.40890000, 0.00, 60),
	(24, 3, NULL, 'Chandragiri Fort', 13.58640000, 79.31780000, 0.00, 90),
	(25, 3, NULL, 'Sri Venkateswara Zoo', 13.63490000, 79.37420000, 50.00, 120),
	(26, 3, NULL, 'Akasa Ganga Waterfall', 13.69090000, 79.34870000, 0.00, 60),
	(27, 3, NULL, 'Deer Park Tirumala', 13.67980000, 79.34590000, 0.00, 60),
	(28, 3, NULL, 'TTD Gardens', 13.68210000, 79.34660000, 0.00, 60),
	(29, 3, NULL, 'Rock Garden', 13.63650000, 79.37290000, 0.00, 45),
	(30, 3, NULL, 'Tirupati Heritage Walk', 13.62880000, 79.41920000, 0.00, 60),
	(31, 4, NULL, 'Belum Caves', 15.10100000, 78.11360000, 60.00, 120),
	(32, 4, NULL, 'Konda Reddy Fort', 15.82810000, 78.03630000, 0.00, 60),
	(33, 4, NULL, 'Oravakallu Rock Garden', 15.78170000, 78.01220000, 20.00, 90),
	(34, 4, NULL, 'Rollapadu Wildlife Sanctuary', 15.43250000, 78.21000000, 50.00, 150),
	(35, 4, NULL, 'Srisailam Dam', 16.07400000, 78.86860000, 0.00, 90),
	(36, 4, NULL, 'Sakshi Ganapati Temple', 15.78520000, 78.04580000, 0.00, 45),
	(37, 4, NULL, 'Ahobilam Temple', 15.13720000, 78.77460000, 0.00, 120),
	(38, 4, NULL, 'Pathala Ganga', 16.07480000, 78.86930000, 150.00, 60),
	(39, 4, NULL, 'Nallamala Forest Trek', 15.95000000, 78.85000000, 0.00, 180),
	(40, 4, NULL, 'Kurnool Heritage Walk', 15.82890000, 78.03780000, 0.00, 60),
	(41, 5, NULL, 'Papi Hills', 17.44360000, 81.81960000, 0.00, 180),
	(42, 5, NULL, 'Godavari River Cruise', 17.00050000, 81.80400000, 500.00, 180),
	(43, 5, NULL, 'Rallabandi Subbarao Museum', 17.00000000, 81.80420000, 10.00, 60),
	(44, 5, NULL, 'Iskcon Temple Rajahmundry', 17.01560000, 81.80790000, 0.00, 60),
	(45, 5, NULL, 'Dowleswaram Barrage', 17.05160000, 81.79770000, 0.00, 45),
	(46, 5, NULL, 'Kadiyapulanka Gardens', 16.99560000, 81.80470000, 0.00, 90),
	(47, 5, NULL, 'Pattiseema', 17.08460000, 81.65090000, 0.00, 60),
	(48, 5, NULL, 'Pushkar Ghat', 16.99620000, 81.80490000, 0.00, 60),
	(49, 5, NULL, 'Govindarajula Gutta', 17.01980000, 81.82030000, 0.00, 45),
	(50, 5, NULL, 'Rajahmundry Heritage Walk', 16.99880000, 81.80450000, 0.00, 60),
	(51, 6, NULL, 'Kondaveedu Fort', 16.61680000, 80.35290000, 0.00, 90),
	(52, 6, NULL, 'Amaravati Stupa', 16.57260000, 80.35640000, 0.00, 90),
	(53, 6, NULL, 'Undavalli Caves', 16.49780000, 80.57960000, 25.00, 90),
	(54, 6, NULL, 'Ettipotala Waterfall', 16.53920000, 79.28220000, 0.00, 90),
	(55, 6, NULL, 'Amaravati Museum', 16.57280000, 80.35720000, 10.00, 60),
	(56, 6, NULL, 'Uppalapadu Bird Sanctuary', 16.36420000, 80.43630000, 10.00, 60),
	(57, 6, NULL, 'Krishna River Ghat', 16.50860000, 80.64070000, 0.00, 45),
	(58, 6, NULL, 'Chuttugunta Circle', 16.30670000, 80.43760000, 0.00, 30),
	(59, 6, NULL, 'Nagarjuna Sagar Viewpoint', 16.57850000, 79.31020000, 0.00, 60),
	(60, 6, NULL, 'Guntur Heritage Walk', 16.30690000, 80.43650000, 0.00, 60),
	(61, 7, NULL, 'Nellore Beach', 14.44420000, 79.98600000, 0.00, 120),
	(62, 7, NULL, 'Pennar River Barrage', 14.44120000, 79.98660000, 0.00, 45),
	(63, 7, NULL, 'Ranganatha Temple', 14.44180000, 79.98690000, 0.00, 60),
	(64, 7, NULL, 'Mypadu Beach', 14.45190000, 79.99940000, 0.00, 120),
	(65, 7, NULL, 'Nelapattu Bird Sanctuary', 13.88030000, 79.84440000, 50.00, 120),
	(66, 7, NULL, 'Udayagiri Fort', 14.91330000, 79.31760000, 0.00, 90),
	(67, 7, NULL, 'Venkatagiri Fort', 13.96000000, 79.58000000, 0.00, 90),
	(68, 7, NULL, 'Barah Shaheed Dargah', 14.44010000, 79.98790000, 0.00, 30),
	(69, 7, NULL, 'Jonnawada Temple', 14.46160000, 79.97520000, 0.00, 60),
	(70, 7, NULL, 'Nellore Heritage Walk', 14.44150000, 79.98680000, 0.00, 60),
	(71, 8, NULL, 'Ongole Beach', 15.50360000, 80.04850000, 0.00, 120),
	(72, 8, NULL, 'Kothapatnam Beach', 15.47960000, 80.07960000, 0.00, 120),
	(73, 8, NULL, 'Chennakesava Swamy Temple', 15.50530000, 80.04990000, 0.00, 60),
	(74, 8, NULL, 'Bhairavakona Caves', 14.88820000, 79.20070000, 0.00, 120),
	(75, 8, NULL, 'Ramathirtham', 15.50690000, 80.05180000, 0.00, 60),
	(76, 8, NULL, 'Kandaleru Dam', 14.57790000, 79.61430000, 0.00, 60),
	(77, 8, NULL, 'Ongole Cattle Market', 15.50590000, 80.04930000, 0.00, 60),
	(78, 8, NULL, 'Sri Prasanna Chennakesava Temple', 15.50720000, 80.04780000, 0.00, 60),
	(79, 8, NULL, 'Ongole Viewpoint', 15.51180000, 80.04320000, 0.00, 30),
	(80, 8, NULL, 'Ongole Heritage Walk', 15.50640000, 80.04890000, 0.00, 1020),
	(81, 9, NULL, 'Kolleru Lake', 16.62000000, 81.20000000, 0.00, 180),
	(82, 9, NULL, 'Buddha Park Eluru', 16.71200000, 81.10080000, 0.00, 60),
	(83, 9, NULL, 'Eluru Canal View', 16.70880000, 81.09560000, 0.00, 45),
	(84, 9, NULL, 'Gudivada Buddha Stupa', 16.43380000, 80.99170000, 0.00, 60),
	(85, 9, NULL, 'Kolleru Bird Sanctuary', 16.61580000, 81.21020000, 50.00, 120),
	(86, 9, NULL, 'Pedavegi Buddhist Ruins', 16.63330000, 81.04260000, 0.00, 90),
	(87, 9, NULL, 'Eluru Heritage Walk', 16.71000000, 81.09500000, 0.00, 60),
	(88, 9, NULL, 'Tammileru River Bank', 16.70560000, 81.10430000, 0.00, 45),
	(89, 9, NULL, 'Eluru Parks Cluster', 16.71120000, 81.09870000, 0.00, 60),
	(90, 9, NULL, 'Eluru Water Sports Zone', 16.70780000, 81.10190000, 300.00, 90),
	(91, 10, NULL, 'Kalingapatnam Beach', 18.34180000, 84.11940000, 0.00, 120),
	(92, 10, NULL, 'Salihundam Buddhist Complex', 18.32560000, 84.05040000, 0.00, 90),
	(93, 10, NULL, 'Sri Mukhalingam Temple', 18.59430000, 83.95020000, 0.00, 90),
	(94, 10, NULL, 'Baruva Beach', 18.21350000, 84.02240000, 0.00, 120),
	(95, 10, NULL, 'Telineelapuram Bird Sanctuary', 18.50380000, 83.85890000, 10.00, 90),
	(96, 10, NULL, 'Kalingapatnam Lighthouse', 18.34390000, 84.11800000, 0.00, 30),
	(97, 10, NULL, 'Narasannapeta Handloom Village', 18.41460000, 83.94120000, 0.00, 60),
	(98, 10, NULL, 'Srikurmam Temple', 18.26630000, 84.03840000, 0.00, 90),
	(99, 10, NULL, 'Vamsadhara River View', 18.33670000, 83.93460000, 0.00, 45),
	(100, 10, NULL, 'Srikakulam Heritage Walk', 18.29690000, 83.89770000, 0.00, 60),
	(101, 11, NULL, 'Kakinada Beach', 16.98910000, 82.24750000, 0.00, 120),
	(102, 11, NULL, 'Hope Island', 17.00890000, 82.35060000, 0.00, 150),
	(103, 11, NULL, 'Coringa Wildlife Sanctuary', 16.81970000, 82.30330000, 50.00, 120),
	(104, 11, NULL, 'Uppada Beach', 17.09030000, 82.33790000, 0.00, 120),
	(105, 11, NULL, 'Kakinada Port View', 16.98990000, 82.25180000, 0.00, 30),
	(106, 11, NULL, 'Jagannatha Swamy Temple', 16.98960000, 82.24700000, 0.00, 60),
	(107, 11, NULL, 'Bhaskara Rao Park', 16.98570000, 82.24390000, 0.00, 60),
	(108, 11, NULL, 'Kakinada Heritage Walk', 16.98820000, 82.24680000, 0.00, 60),
	(109, 11, NULL, 'Boat Ride to Hope Island', 16.99350000, 82.25890000, 500.00, 120),
	(110, 11, NULL, 'Adurru Buddhist Stupa', 16.87380000, 82.20260000, 0.00, 90),
	(111, 12, NULL, 'Gooty Fort', 15.12690000, 77.63490000, 0.00, 120),
	(112, 12, NULL, 'Puttaparthi Ashram', 14.16510000, 77.81160000, 0.00, 120),
	(113, 12, NULL, 'Lepakshi Veerabhadra Temple', 13.80670000, 77.60670000, 0.00, 90),
	(114, 12, NULL, 'Pennar River View', 14.67780000, 77.60050000, 0.00, 45),
	(115, 12, NULL, 'Nallamada Reservoir', 14.97360000, 77.70520000, 0.00, 90),
	(116, 12, NULL, 'Ahobilam Hills Trek', 15.13720000, 78.77460000, 0.00, 180),
	(117, 12, NULL, 'Sri Sathya Sai Museum', 14.16580000, 77.81230000, 0.00, 60),
	(118, 12, NULL, 'Gooty Town Heritage Walk', 15.12150000, 77.63080000, 0.00, 60),
	(119, 12, NULL, 'Bugga Ramalingeswara Temple', 14.93290000, 77.81720000, 0.00, 60),
	(120, 12, NULL, 'Nagarjuna Sagar Canal View', 14.86030000, 77.69210000, 0.00, 45),
	(121, 13, NULL, 'Gandikota Fort', 14.81430000, 78.28610000, 0.00, 120),
	(122, 13, NULL, 'Gandikota Canyon', 14.81250000, 78.28890000, 0.00, 120),
	(123, 13, NULL, 'Belum Caves', 15.10100000, 78.11360000, 60.00, 120),
	(124, 13, NULL, 'Ameen Peer Dargah', 14.47560000, 78.83530000, 0.00, 45),
	(125, 13, NULL, 'Pushpagiri Temple', 14.45620000, 78.81460000, 0.00, 90),
	(126, 13, NULL, 'Sidhout Fort', 14.46390000, 78.81920000, 0.00, 60),
	(127, 13, NULL, 'Rayachoty Hill View', 14.04840000, 78.74930000, 0.00, 45),
	(128, 13, NULL, 'Mylavaram Dam', 14.48520000, 78.78560000, 0.00, 60),
	(129, 13, NULL, 'Kadapa Heritage Walk', 14.47590000, 78.83590000, 0.00, 60),
	(130, 13, NULL, 'Ontimitta Temple', 14.39340000, 79.00960000, 0.00, 90),
	(131, 14, NULL, 'Horsley Hills', 13.65090000, 78.40360000, 30.00, 150),
	(132, 14, NULL, 'Kaundinya Wildlife Sanctuary', 13.68280000, 78.60720000, 50.00, 150),
	(133, 14, NULL, 'Kanipakam Vinayaka Temple', 13.27720000, 79.01960000, 0.00, 90),
	(134, 14, NULL, 'Chandragiri Fort', 13.58640000, 79.31780000, 0.00, 90),
	(135, 14, NULL, 'Talakona Waterfall', 13.81540000, 79.21420000, 0.00, 120),
	(136, 14, NULL, 'Nagari Hills Trek', 13.30820000, 79.58610000, 0.00, 180),
	(137, 14, NULL, 'Srikalahasti Temple', 13.74900000, 79.69880000, 0.00, 90),
	(138, 14, NULL, 'Kalyani Dam', 13.63780000, 78.50690000, 0.00, 60),
	(139, 14, NULL, 'Chittoor Heritage Walk', 13.21720000, 79.10030000, 0.00, 60),
	(140, 14, NULL, 'Kalavagunta Viewpoint', 13.66090000, 78.43220000, 0.00, 45),
	(141, 15, NULL, 'Vizianagaram Fort', 18.11330000, 83.41120000, 0.00, 90),
	(142, 15, NULL, 'Ramanaidu Studios Viewpoint', 17.73580000, 83.26660000, 0.00, 45),
	(143, 15, NULL, 'Thatipudi Reservoir', 18.01940000, 83.51260000, 0.00, 90),
	(144, 15, NULL, 'Padmanabham Temple', 17.96690000, 83.48370000, 0.00, 60),
	(145, 15, NULL, 'Simhachalam Hills', 17.76630000, 83.24970000, 0.00, 90),
	(146, 15, NULL, 'Seethammadara Viewpoint', 17.74460000, 83.29640000, 0.00, 45),
	(147, 15, NULL, 'Thotlakonda Buddhist Site', 17.82860000, 83.41980000, 0.00, 90),
	(148, 15, NULL, 'Kumili Handloom Village', 18.15640000, 83.43820000, 0.00, 60),
	(149, 15, NULL, 'Vizianagaram Heritage Walk', 18.11290000, 83.41190000, 0.00, 60),
	(150, 15, NULL, 'Gantyada View Hills', 18.17030000, 83.46910000, 0.00, 45),
	(151, 16, NULL, 'Manginapudi Beach', 16.18740000, 81.13820000, 0.00, 120),
	(152, 16, NULL, 'Machilipatnam Fort Ruins', 16.18260000, 81.13700000, 0.00, 60),
	(153, 16, NULL, 'Panduranga Swamy Temple', 16.18790000, 81.13640000, 0.00, 60),
	(154, 16, NULL, 'Avanigadda Backwaters', 16.02170000, 80.91920000, 0.00, 90),
	(155, 16, NULL, 'Pedana Kalamkari Village', 16.26060000, 81.13460000, 0.00, 90),
	(156, 16, NULL, 'Machilipatnam Lighthouse', 16.18610000, 81.14030000, 0.00, 45),
	(157, 16, NULL, 'Ghantasala Buddhist Site', 16.23830000, 81.05280000, 0.00, 90),
	(158, 16, NULL, 'Krishna Delta Bird Area', 16.20000000, 81.05000000, 0.00, 120),
	(159, 16, NULL, 'Machilipatnam Heritage Walk', 16.18590000, 81.13680000, 0.00, 60),
	(160, 16, NULL, 'Water Sports Manginapudi', 16.18820000, 81.13950000, 800.00, 90),
	(161, 17, NULL, 'Mahanandi Temple', 15.48680000, 78.51230000, 0.00, 90),
	(162, 17, NULL, 'Banaganapalli Fort', 15.31790000, 78.22630000, 0.00, 60),
	(163, 17, NULL, 'Ahobilam Upper Temple', 15.13720000, 78.77460000, 0.00, 120),
	(164, 17, NULL, 'Nallamala Forest View', 15.38140000, 78.61820000, 0.00, 90),
	(165, 17, NULL, 'Oravakallu Rock Garden', 15.78170000, 78.01220000, 20.00, 90),
	(166, 17, NULL, 'Mahanandi Backwater Area', 15.49230000, 78.50870000, 0.00, 60),
	(167, 17, NULL, 'Nandyal Heritage Walk', 15.47730000, 78.48280000, 0.00, 60),
	(168, 17, NULL, 'Pathala Ganga Boat Ride', 16.07480000, 78.86930000, 150.00, 60),
	(169, 17, NULL, 'Rollapadu Sanctuary Access', 15.43250000, 78.21000000, 50.00, 120),
	(170, 17, NULL, 'Shivagiri Hill View', 15.46080000, 78.49560000, 0.00, 45),
	(171, 18, NULL, 'Proddatur Town Viewpoint', 14.73990000, 78.55060000, 0.00, 45),
	(172, 18, NULL, 'Siddheswara Swamy Temple', 14.73780000, 78.55390000, 0.00, 60),
	(173, 18, NULL, 'Proddatur Heritage Walk', 14.73910000, 78.55120000, 0.00, 60),
	(174, 18, NULL, 'Gandikota Day Trip', 14.81430000, 78.28610000, 0.00, 180),
	(175, 18, NULL, 'Penna River Bank', 14.73560000, 78.55240000, 0.00, 60),
	(176, 18, NULL, 'Sidhout Fort', 14.46390000, 78.81920000, 0.00, 90),
	(177, 18, NULL, 'Rayachoty Road View', 14.69220000, 78.64030000, 0.00, 45),
	(178, 18, NULL, 'Proddatur Market', 14.73940000, 78.55210000, 0.00, 60),
	(179, 18, NULL, 'Penna River Bridge View', 14.73720000, 78.55080000, 0.00, 30),
	(180, 18, NULL, 'Cultural Hall Proddatur', 14.73880000, 78.55190000, 0.00, 60),
	(181, 19, NULL, 'Tenali Beach Access', 16.24000000, 80.64000000, 0.00, 120),
	(182, 19, NULL, 'Tenali Ramalingeswara Temple', 16.23980000, 80.64090000, 0.00, 60),
	(183, 19, NULL, 'Krishna Canal Bank', 16.23760000, 80.64230000, 0.00, 45),
	(184, 19, NULL, 'Chandole Handloom Village', 16.22090000, 80.65540000, 0.00, 90),
	(185, 19, NULL, 'Tenali Heritage Walk', 16.23920000, 80.64180000, 0.00, 60),
	(186, 19, NULL, 'Munnangi Backwaters', 16.19530000, 80.65890000, 0.00, 90),
	(187, 19, NULL, 'Water Sports Krishna Canal', 16.23880000, 80.64360000, 300.00, 60),
	(188, 19, NULL, 'Tenali Central Park', 16.24060000, 80.64120000, 0.00, 60),
	(189, 19, NULL, 'Tenali Market', 16.23950000, 80.64150000, 0.00, 60),
	(190, 19, NULL, 'Village Cycling Route', 16.21000000, 80.65000000, 0.00, 90),
	(191, 20, NULL, 'Dhyana Buddha Statue', 16.57200000, 80.35780000, 0.00, 60),
	(192, 20, NULL, 'Amaravati Stupa', 16.57260000, 80.35640000, 0.00, 90),
	(193, 20, NULL, 'Amaravati Museum', 16.57280000, 80.35720000, 10.00, 60),
	(194, 20, NULL, 'Krishna River Viewpoint', 16.57450000, 80.35960000, 0.00, 45),
	(195, 20, NULL, 'Amaravati Heritage Walk', 16.57320000, 80.35690000, 0.00, 60),
	(196, 20, NULL, 'Uddandarayunipalem Capital Zone', 16.51520000, 80.51630000, 0.00, 60),
	(197, 20, NULL, 'Kondaveedu Fort Access', 16.61680000, 80.35290000, 0.00, 90),
	(198, 20, NULL, 'Seed Access Road View', 16.56530000, 80.36180000, 0.00, 45),
	(199, 20, NULL, 'Cycling Track Amaravati', 16.57090000, 80.36020000, 0.00, 90),
	(200, 20, NULL, 'Sunset Point Amaravati', 16.57380000, 80.35840000, 0.00, 45),
	(201, 21, NULL, 'Miramar Beach', 15.47668100, 73.80667600, 0.00, 90),
	(202, 21, NULL, 'Dona Paula View Point', 15.45490000, 73.80280000, 0.00, 45),
	(203, 21, NULL, 'Reis Magos Fort', 15.49650800, 73.80913200, 50.00, 90),
	(204, 21, NULL, 'Goa State Museum', 15.49850000, 73.82830000, 10.00, 60),
	(205, 21, NULL, 'Fontainhas Latin Quarter', 15.49680000, 73.82990000, 0.00, 75),
	(206, 21, NULL, 'Dr Salim Ali Bird Sanctuary', 15.53880000, 73.86660000, 10.00, 120),
	(207, 21, NULL, 'Immaculate Conception Church', 15.49820000, 73.82880000, 0.00, 45),
	(208, 21, NULL, 'Mandovi River Cruise', 15.49860000, 73.82590000, 300.00, 60),
	(209, 21, NULL, 'Campal Gardens', 15.49320000, 73.81980000, 0.00, 45),
	(210, 21, NULL, 'Miramar Cycling Track', 15.49100000, 73.80750000, 0.00, 60),
	(211, 22, NULL, 'Calangute Beach', 15.54248800, 73.75556200, 0.00, 120),
	(212, 22, NULL, 'Baga River Point', 15.55680000, 73.75100000, 0.00, 60),
	(213, 22, NULL, 'Tito''s Lane', 15.55610000, 73.75170000, 0.00, 120),
	(214, 22, NULL, 'St Alex Church', 15.54158400, 73.76802500, 0.00, 45),
	(215, 22, NULL, 'Kerkar Art Complex', 15.55310000, 73.75480000, 0.00, 60),
	(216, 22, NULL, 'Baga Creek Kayaking', 15.55720000, 73.75020000, 800.00, 90),
	(217, 22, NULL, 'Calangute Market', 15.54516500, 73.76310300, 0.00, 60),
	(218, 22, NULL, 'Infantaria Restaurant Area', 15.54990000, 73.75490000, 0.00, 60),
	(219, 22, NULL, 'Baga Snow Park', 15.55740000, 73.75090000, 1200.00, 60),
	(220, 22, NULL, 'Baga Beach Extension', 15.55800000, 73.75140000, 0.00, 90),
	(221, 23, NULL, 'Candolim Beach', 15.51980000, 73.76420000, 0.00, 120),
	(222, 23, NULL, 'Sinquerim Fort', 15.49850000, 73.76380000, 0.00, 75),
	(223, 23, NULL, 'Aguada Fort Lighthouse', 15.48950000, 73.77370000, 0.00, 60),
	(224, 23, NULL, 'Calizz Restaurant Area', 15.51720000, 73.76250000, 0.00, 90),
	(225, 23, NULL, 'Water Sports Zone', 15.51590000, 73.76280000, 1000.00, 90),
	(226, 23, NULL, 'Princess River Cruise', 15.51900000, 73.76600000, 400.00, 60),
	(227, 23, NULL, 'Sinq Night Market', 15.49650000, 73.76920000, 0.00, 90),
	(228, 23, NULL, 'Nerul River Kayaking', 15.51060000, 73.77390000, 900.00, 90),
	(229, 23, NULL, 'Sunset Point Sinquerim', 15.49790000, 73.76440000, 0.00, 45),
	(230, 23, NULL, 'Candolim Church', 15.50610800, 73.77085000, 0.00, 30),
	(231, 24, NULL, 'Mapusa Market', 15.59030000, 73.81390000, 0.00, 90),
	(232, 24, NULL, 'St Jerome Church', 15.58955400, 73.81839300, 0.00, 45),
	(233, 24, NULL, 'Anjuna View Hills', 15.58490000, 73.80740000, 0.00, 60),
	(234, 24, NULL, 'Chapora River Bank', 15.60250000, 73.82030000, 0.00, 60),
	(235, 24, NULL, 'Mapusa Municipal Garden', 15.59280000, 73.81290000, 0.00, 45),
	(236, 24, NULL, 'Bodgeshwar Temple', 15.58454100, 73.80587700, 0.00, 60),
	(237, 24, NULL, 'Local Spice Shops', 15.59160000, 73.81350000, 0.00, 45),
	(238, 24, NULL, 'Moira Cycling Route', 15.60420000, 73.82380000, 0.00, 90),
	(239, 24, NULL, 'Mapusa Cultural Hall', 15.58990000, 73.81230000, 0.00, 60),
	(240, 24, NULL, 'Parra Road', 15.57398600, 73.79369700, 0.00, 30),
	(241, 31, NULL, 'Colva Beach', 15.28579100, 73.91054500, 0.00, 120),
	(242, 31, NULL, 'Benaulim Beach', 15.25420000, 73.92410000, 0.00, 120),
	(243, 31, NULL, 'Our Lady of Grace Church', 15.27560000, 73.95800000, 0.00, 45),
	(244, 31, NULL, 'Margao Municipal Garden', 15.27790000, 73.96230000, 0.00, 45),
	(245, 31, NULL, 'Burnzam Ghor', 15.27510000, 73.96020000, 100.00, 60),
	(246, 31, NULL, 'Cabo de Rama Road Drive', 15.23020000, 73.98110000, 0.00, 90),
	(247, 31, NULL, 'Colva Creek Kayaking', 15.27600000, 73.91480000, 800.00, 90),
	(248, 31, NULL, 'Margao Market', 15.27590000, 73.95890000, 0.00, 60),
	(249, 31, NULL, 'Navelim Hill View', 15.28360000, 73.95220000, 0.00, 45),
	(250, 31, NULL, 'Loyola College Area', 15.28120000, 73.96090000, 0.00, 45),
	(251, 41, NULL, 'Bogmalo Beach', 15.36936900, 73.83412200, 0.00, 120),
	(252, 41, NULL, 'Baina Beach', 15.38760900, 73.80744700, 0.00, 90),
	(253, 41, NULL, 'Naval Aviation Museum', 15.37466600, 73.83873600, 50.00, 90),
	(254, 41, NULL, 'Mormugao Fort', 15.41208100, 73.79435400, 0.00, 60),
	(255, 41, NULL, 'Japanese Garden', 15.40715200, 73.78739100, 0.00, 45),
	(256, 41, NULL, 'St Andrew''s Church', 15.39964800, 73.81738500, 0.00, 45),
	(257, 41, NULL, 'Mormugao Harbour Viewpoint', 15.40220000, 73.80850000, 0.00, 30),
	(258, 41, NULL, 'Hollant Beach', 15.36959700, 73.86197700, 0.00, 90),
	(259, 41, NULL, 'Vasco Market', 15.39890000, 73.81070000, 0.00, 60),
	(260, 41, NULL, 'Issorcim Cliff Point', 15.38240000, 73.83410000, 0.00, 60),
	(261, 30, NULL, 'Basilica of Bom Jesus', 15.50080000, 73.91160000, 0.00, 90),
	(262, 30, NULL, 'Se Cathedral', 15.50420000, 73.91210000, 0.00, 90),
	(263, 30, NULL, 'Church of St Francis of Assisi', 15.64924800, 73.83063000, 0.00, 60),
	(264, 30, NULL, 'Church of St Cajetan', 15.50570000, 73.91510000, 0.00, 60),
	(265, 30, NULL, 'Ruins of St Augustine', 15.50050000, 73.90650000, 0.00, 60),
	(266, 30, NULL, 'Arch of the Viceroys', 15.50580000, 73.91370000, 0.00, 30),
	(267, 30, NULL, 'Museum of Christian Art', 15.50140000, 73.90730000, 50.00, 60),
	(268, 30, NULL, 'Divar Island Ferry Point', 15.50920000, 73.90490000, 0.00, 45),
	(269, 30, NULL, 'Our Lady of the Rosary Church', 15.50170000, 73.90500000, 0.00, 45),
	(270, 30, NULL, 'Mandovi Riverside Walk', 15.50430000, 73.91060000, 0.00, 45),
	(271, 42, NULL, 'Shri Mangeshi Temple', 15.42260000, 73.98220000, 0.00, 90),
	(272, 42, NULL, 'Shri Shantadurga Temple', 15.39613700, 73.98547800, 0.00, 90),
	(273, 42, NULL, 'Braganza House', 15.26119900, 74.04353700, 100.00, 60),
	(274, 42, NULL, 'Bondla Wildlife Sanctuary', 15.43830000, 74.10190000, 50.00, 120),
	(275, 42, NULL, 'Safa Masjid', 15.40640700, 73.99998400, 0.00, 45),
	(276, 42, NULL, 'Spice Plantation Tour', 15.41930000, 74.02050000, 400.00, 120),
	(277, 42, NULL, 'Netravali Wildlife Sanctuary', 15.34100000, 74.19100000, 50.00, 180),
	(278, 42, NULL, 'Mhadei River Viewpoint', 15.55330000, 74.09320000, 0.00, 45),
	(279, 42, NULL, 'Farmagudi Hill View', 15.45730000, 73.99870000, 0.00, 30),
	(280, 42, NULL, 'Ponda Market', 15.40290000, 74.00710000, 0.00, 60),
	(281, 28, NULL, 'Anjuna Beach', 15.57390000, 73.73950000, 0.00, 120),
	(282, 28, NULL, 'Anjuna Flea Market', 15.57639100, 73.74397700, 0.00, 120),
	(283, 28, NULL, 'St Michael''s Church', 15.58995700, 73.76414800, 0.00, 45),
	(284, 28, NULL, 'Ozran Beach', 15.59320000, 73.73810000, 0.00, 90),
	(285, 28, NULL, 'Chapora River Kayaking', 15.59080000, 73.74020000, 800.00, 90),
	(286, 28, NULL, 'Anjuna Cliff Viewpoint', 15.57420000, 73.73920000, 0.00, 45),
	(287, 28, NULL, 'Curlies Beach Shack', 15.58370000, 73.73310000, 0.00, 120),
	(288, 28, NULL, 'Vagator Hill Trail', 15.60010000, 73.73680000, 0.00, 60),
	(289, 28, NULL, 'Blue Flag Rock View', 15.57450000, 73.73890000, 0.00, 30),
	(290, 28, NULL, 'Anjuna Heritage Walk', 15.57580000, 73.74410000, 0.00, 60),
	(291, 29, NULL, 'Vagator Beach', 15.60110000, 73.73680000, 0.00, 120),
	(292, 29, NULL, 'Chapora Fort', 15.60595100, 73.73635600, 0.00, 90),
	(293, 29, NULL, 'Ozran Beach', 15.59320000, 73.73810000, 0.00, 90),
	(294, 29, NULL, 'Big Vagator Beach', 15.60480000, 73.73540000, 0.00, 90),
	(295, 29, NULL, 'Sunset Point Vagator', 15.60220000, 73.73650000, 0.00, 45),
	(296, 29, NULL, 'Vagator Hilltop Cafes', 15.64630000, 73.73590000, 0.00, 90),
	(297, 29, NULL, 'Chapora River View', 15.62080000, 73.74210000, 0.00, 45),
	(298, 29, NULL, 'Rock Climbing Spot Vagator', 15.64750000, 73.73300000, 0.00, 60),
	(299, 29, NULL, 'St Anthony''s Chapel', 15.64481400, 73.83460000, 0.00, 30),
	(300, 29, NULL, 'Vagator Coastal Walk', 15.60350000, 73.73490000, 0.00, 60),
	(301, 24, NULL, 'Mapusa Municipal Market', 15.59020000, 73.81400000, 0.00, 90),
	(302, 24, NULL, 'St Jerome Church', 15.58955400, 73.81839300, 0.00, 45),
	(303, 24, NULL, 'Bodgeshwar Temple', 15.58454100, 73.80587700, 0.00, 60),
	(304, 24, NULL, 'Parra Road', 15.57394200, 73.79366400, 0.00, 30),
	(305, 24, NULL, 'Moira Village Walk', 15.60480000, 73.81960000, 0.00, 60),
	(306, 24, NULL, 'Chapora River Bank', 15.60250000, 73.82030000, 0.00, 60),
	(307, 24, NULL, 'Mapusa Cultural Hall', 15.58990000, 73.81230000, 0.00, 60),
	(308, 24, NULL, 'Anjuna Hills Viewpoint', 15.58020000, 73.74530000, 0.00, 45),
	(309, 24, NULL, 'Mapusa Garden', 15.59280000, 73.81290000, 0.00, 45),
	(310, 24, NULL, 'Local Spice Shops', 15.59160000, 73.81350000, 0.00, 45),
	(311, 22, NULL, 'Calangute Beach', 15.54248800, 73.75556200, 0.00, 120),
	(312, 22, NULL, 'St Alex Church', 15.54158400, 73.76802500, 0.00, 45),
	(313, 22, NULL, 'Calangute Market Square', 15.54880000, 73.75650000, 0.00, 60),
	(314, 22, NULL, 'Baga Creek Kayaking', 15.55720000, 73.75020000, 800.00, 90),
	(315, 22, NULL, 'Tito''s Lane', 15.55610000, 73.75170000, 0.00, 120),
	(316, 22, NULL, 'Infantaria Bakery', 15.54990000, 73.75490000, 0.00, 60),
	(317, 22, NULL, 'Baga Snow Park', 15.55740000, 73.75090000, 1200.00, 60),
	(318, 22, NULL, 'Baga River Mouth', 15.55680000, 73.75100000, 0.00, 45),
	(319, 22, NULL, 'Kerkar Art Complex', 15.55310000, 73.75480000, 0.00, 60),
	(320, 22, NULL, 'Baga Beach Extension', 15.55800000, 73.75140000, 0.00, 90),
	(321, 23, NULL, 'Candolim Beach', 15.51980000, 73.76420000, 0.00, 120),
	(322, 23, NULL, 'Fort Aguada', 15.50510800, 73.77064300, 0.00, 90),
	(323, 23, NULL, 'Sinquerim Beach', 15.50140600, 73.76747000, 0.00, 90),
	(324, 23, NULL, 'Nerul River Kayaking', 15.51060000, 73.77390000, 900.00, 90),
	(325, 23, NULL, 'Princess River Cruise', 15.51900000, 73.76600000, 400.00, 60),
	(326, 23, NULL, 'Sinq Night Market', 15.49650000, 73.76920000, 0.00, 90),
	(327, 23, NULL, 'Sunset Point Sinquerim', 15.49480000, 73.77220000, 0.00, 45),
	(328, 23, NULL, 'Calizz Restaurant Strip', 15.51720000, 73.76250000, 0.00, 90),
	(329, 23, NULL, 'Candolim Church', 15.50610800, 73.77085000, 0.00, 30),
	(330, 23, NULL, 'Water Sports Zone Candolim', 15.51590000, 73.76280000, 1000.00, 90),
	(331, 25, NULL, 'Morjim Beach', 15.62250100, 73.72985600, 0.00, 120),
	(332, 25, NULL, 'Olive Ridley Turtle Nesting Site', 15.63000000, 73.73620000, 0.00, 60),
	(333, 25, NULL, 'Chapora River View', 15.62080000, 73.74210000, 0.00, 45),
	(334, 25, NULL, 'St Anthony''s Church Morjim', 15.62900000, 73.73500000, 0.00, 30),
	(335, 25, NULL, 'Mandrem Cycling Route', 15.65040000, 73.74020000, 0.00, 90),
	(336, 25, NULL, 'Mandrem Beach', 15.66004800, 73.71312700, 0.00, 120),
	(337, 25, NULL, 'Morjim Sunset Point', 15.62850000, 73.74240000, 0.00, 45),
	(338, 25, NULL, 'Chapora Backwater Kayaking', 15.62560000, 73.73920000, 800.00, 90),
	(339, 25, NULL, 'Russian Food Street', 15.63110000, 73.73640000, 0.00, 60),
	(340, 25, NULL, 'Morjim Village Walk', 15.63320000, 73.73780000, 0.00, 60),
	(341, 26, NULL, 'Arambol Beach', 15.67895600, 73.70503900, 0.00, 120),
	(342, 26, NULL, 'Sweet Water Lake', 15.69780000, 73.69825000, 0.00, 60),
	(343, 26, NULL, 'Arambol Cliff View', 15.68450000, 73.73650000, 0.00, 45),
	(344, 26, NULL, 'Keri Beach', 15.71540000, 73.74570000, 0.00, 90),
	(345, 26, NULL, 'Paragliding Point', 15.71690000, 73.70760000, 2500.00, 60),
	(346, 26, NULL, 'Arambol Drum Circle', 15.70150000, 73.70190000, 0.00, 60),
	(347, 26, NULL, 'Harmal Village Walk', 15.70480000, 73.71930000, 0.00, 60),
	(348, 26, NULL, 'Arambol Banyan Tree Spot', 15.70920000, 73.72110000, 0.00, 30),
	(349, 26, NULL, 'Kalacha Beach', 15.69784100, 73.69752500, 0.00, 90),
	(350, 26, NULL, 'Arambol Yoga Centres', 15.70390000, 73.71990000, NULL, 90),
	(351, 31, NULL, 'Colva Beach', 15.28579100, 73.91054500, 0.00, 120),
	(352, 31, NULL, 'Benaulim Beach', 15.25420000, 73.92410000, 0.00, 120),
	(353, 31, NULL, 'Our Lady of Grace Church', 15.27560000, 73.95800000, 0.00, 45),
	(354, 31, NULL, 'Burnzam Ghor', 15.27510000, 73.96020000, 100.00, 60),
	(355, 31, NULL, 'Margao Municipal Garden', 15.27790000, 73.96230000, 0.00, 45),
	(356, 31, NULL, 'Margao Market', 15.27590000, 73.95890000, 0.00, 60),
	(357, 31, NULL, 'Colva Creek Kayaking', 15.27600000, 73.91480000, 800.00, 90),
	(358, 31, NULL, 'Navelim Hill View', 15.28380000, 73.95270000, 0.00, 45),
	(359, 31, NULL, 'Loyola College Area', 15.28120000, 73.96090000, 0.00, 45),
	(360, 31, NULL, 'Fatorda Stadium Area', 15.26440000, 73.96330000, 0.00, 60),
	(361, 32, NULL, 'Colva Beach Main Stretch', 15.27950000, 73.91380000, 0.00, 120),
	(362, 32, NULL, 'Sernabatim Beach', 15.26520000, 73.91770000, 0.00, 120),
	(363, 32, NULL, 'Our Lady of Mercy Church', 15.27990000, 73.91290000, 0.00, 45),
	(364, 32, NULL, 'Colva Promenade', 15.27820000, 73.91030000, 0.00, 60),
	(365, 32, NULL, 'Benaulim Backwater Kayaking', 15.26210000, 73.92040000, 800.00, 90),
	(366, 32, NULL, 'Colva Market', 15.27980000, 73.91360000, 0.00, 60),
	(367, 32, NULL, 'Sunset Point Colva', 15.27890000, 73.91330000, 0.00, 45),
	(368, 32, NULL, 'Water Sports Zone Colva', 15.27930000, 73.91080000, 1000.00, 90),
	(369, 32, NULL, 'Colva Heritage Walk', 15.28110000, 73.91510000, 0.00, 60),
	(370, 32, NULL, 'Sernabatim Dunes', 15.26640000, 73.91350000, 0.00, 60),
	(371, 33, NULL, 'Benaulim Beach', 15.25420000, 73.92410000, 0.00, 120),
	(372, 33, NULL, 'Trinity Beach', 15.24990000, 73.92750000, 0.00, 90),
	(373, 33, NULL, 'St John the Baptist Church', 15.47981000, 73.92261200, 0.00, 45),
	(374, 33, NULL, 'Zalor Beach', 15.20066200, 73.93451400, 0.00, 90),
	(375, 33, NULL, 'Benaulim Fishing Jetty', 15.25260000, 73.92390000, 0.00, 45),
	(376, 33, NULL, 'Benaulim Backwater Trail', 15.25620000, 73.93030000, 0.00, 60),
	(377, 33, NULL, 'Water Sports Benaulim', 15.25470000, 73.92310000, 900.00, 90),
	(378, 33, NULL, 'Benaulim Sunset Point', 15.25400000, 73.92380000, 0.00, 45),
	(379, 33, NULL, 'Benaulim Heritage Walk', 15.25530000, 73.92670000, 0.00, 60),
	(380, 33, NULL, 'Lotus Pond Area', 15.25890000, 73.93210000, 0.00, 45),
	(381, 34, NULL, 'Palolem Beach', 15.00990000, 74.02330000, 0.00, 120),
	(382, 34, NULL, 'Agonda Beach', 15.04155200, 73.98716200, 0.00, 120),
	(383, 34, NULL, 'Butterfly Beach', 15.01946600, 74.00163400, 0.00, 90),
	(384, 34, NULL, 'Cotigao Wildlife Sanctuary', 14.97600000, 74.20620000, 50.00, 150),
	(385, 34, NULL, 'Galjibag Turtle Nesting Site', 14.93890000, 74.04030000, 0.00, 60),
	(386, 34, NULL, 'Palolem Dolphin Cruise', 15.00990000, 74.02330000, 500.00, 60),
	(387, 34, NULL, 'Cabo de Rama Fort', 15.08741100, 73.91992700, 0.00, 90),
	(388, 34, NULL, 'Cola Beach', 15.05925200, 73.97015100, 0.00, 120),
	(389, 34, NULL, 'Palolem Market', 15.01020000, 74.02350000, 0.00, 60),
	(390, 34, NULL, 'Agonda Sunset Point', 15.04190000, 73.99410000, 0.00, 45),
	(391, 35, NULL, 'Salaulim Dam', 15.21372300, 74.17964700, 0.00, 90),
	(392, 35, NULL, 'Curdi Village Ruins', 15.14690000, 74.04320000, 0.00, 60),
	(393, 35, NULL, 'Church of Our Lady of Snows', 15.19500000, 74.06200000, 0.00, 45),
	(394, 35, NULL, 'Betul Beach', 15.25400000, 73.98500000, 0.00, 90),
	(395, 35, NULL, 'Netravali Wildlife Sanctuary', 15.34120000, 74.19080000, 50.00, 180),
	(396, 35, NULL, 'Wildlife Viewpoint Netravali', 15.34250000, 74.19220000, 0.00, 45),
	(397, 35, NULL, 'Kuskem Waterfall', 15.29921400, 74.12404700, 0.00, 90),
	(398, 35, NULL, 'Quepem Market', 15.21240000, 74.07870000, 0.00, 60),
	(399, 35, NULL, 'Salaulim Backwater Kayaking', 15.14160000, 74.04990000, 900.00, 90),
	(400, 35, NULL, 'Hill Viewpoint Quepem', 15.20620000, 74.08410000, 0.00, 45);


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roadmap_accommodations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roadmap_places; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: safety_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: travel_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: destinations_destination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."destinations_destination_id_seq"', 43, true);


--
-- Name: expenses_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."expenses_expense_id_seq"', 1, false);


--
-- Name: group_types_group_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."group_types_group_type_id_seq"', 1, false);


--
-- Name: host_profiles_host_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."host_profiles_host_id_seq"', 1, false);


--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."hotels_hotel_id_seq"', 401, true);


--
-- Name: places_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."places_place_id_seq"', 401, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."reviews_review_id_seq"', 1, false);


--
-- Name: roadmap_accommodations_accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roadmap_accommodations_accommodation_id_seq"', 1, false);


--
-- Name: roadmap_places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roadmap_places_id_seq"', 1, false);


--
-- Name: roadmap_types_roadmap_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roadmap_types_roadmap_type_id_seq"', 1, false);


--
-- Name: roadmaps_roadmap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roadmaps_roadmap_id_seq"', 1, false);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roles_role_id_seq"', 1, false);


--
-- Name: safety_contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."safety_contacts_contact_id_seq"', 1, false);


--
-- Name: travel_preferences_preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."travel_preferences_preference_id_seq"', 1, false);


--
-- Name: travel_types_travel_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."travel_types_travel_type_id_seq"', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_user_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 1wxoB1vXbaYEzgZtJyp3xZSbjQyiMTxohfkfM87cUC3r2fYM5DhHPwgJY88jMuN

RESET ALL;
>>>>>>> dcdbdcc2f4245ad5aa28368a31e4807d04e6fd64
