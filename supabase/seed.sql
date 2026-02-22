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
