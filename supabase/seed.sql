--
-- PostgreSQL database dump (auto-exported by export-seed.js)
-- Exported at: 2026-03-07T02:51:31.890Z
--
-- This file is auto-generated. Run: npm run export-seed
-- to update it with the latest data from your local Supabase.
--
--
-- PostgreSQL database dump
--

\restrict daiPFVCEp7NHBViOg57cu6Ic5AEkroSkKipttcaMx3vnRVOhy5eCcgx2TfCrlvn

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
-- Data for Name: destinations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roadmap_types; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roadmaps; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: group_types; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: host_profiles; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: host_registrations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: travel_types; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roadmap_accommodations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roadmap_places; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: safety_contacts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: travel_preferences; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: destinations_destination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.destinations_destination_id_seq', 1, false);


--
-- Name: expenses_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.expenses_expense_id_seq', 1, false);


--
-- Name: group_types_group_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.group_types_group_type_id_seq', 1, false);


--
-- Name: host_profiles_host_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.host_profiles_host_id_seq', 1, false);


--
-- Name: host_registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.host_registrations_id_seq', 1, false);


--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hotels_hotel_id_seq', 1, false);


--
-- Name: places_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.places_place_id_seq', 1, false);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);


--
-- Name: roadmap_accommodations_accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roadmap_accommodations_accommodation_id_seq', 1, false);


--
-- Name: roadmap_places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roadmap_places_id_seq', 1, false);


--
-- Name: roadmap_types_roadmap_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roadmap_types_roadmap_type_id_seq', 1, false);


--
-- Name: roadmaps_roadmap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roadmaps_roadmap_id_seq', 1, false);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- Name: safety_contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.safety_contacts_contact_id_seq', 1, false);


--
-- Name: travel_preferences_preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.travel_preferences_preference_id_seq', 1, false);


--
-- Name: travel_types_travel_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.travel_types_travel_type_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict daiPFVCEp7NHBViOg57cu6Ic5AEkroSkKipttcaMx3vnRVOhy5eCcgx2TfCrlvn

