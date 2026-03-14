-- Add permissions for new host dashboard tables
GRANT ALL ON TABLE "public"."host_properties" TO "anon";
GRANT ALL ON TABLE "public"."host_properties" TO "authenticated";
GRANT ALL ON TABLE "public"."host_properties" TO "postgres";
GRANT ALL ON TABLE "public"."host_properties" TO "service_role";

GRANT ALL ON TABLE "public"."host_bookings" TO "anon";
GRANT ALL ON TABLE "public"."host_bookings" TO "authenticated";
GRANT ALL ON TABLE "public"."host_bookings" TO "postgres";
GRANT ALL ON TABLE "public"."host_bookings" TO "service_role";

GRANT ALL ON TABLE "public"."host_unavailability" TO "anon";
GRANT ALL ON TABLE "public"."host_unavailability" TO "authenticated";
GRANT ALL ON TABLE "public"."host_unavailability" TO "postgres";
GRANT ALL ON TABLE "public"."host_unavailability" TO "service_role";

-- Also grant usage on sequences if they exist (PostgREST needs this for inserts)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "public" TO "anon";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "public" TO "authenticated";
