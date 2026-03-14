GRANT ALL ON TABLE "public"."host_properties" TO "anon", "authenticated", "service_role";
GRANT ALL ON TABLE "public"."host_bookings" TO "anon", "authenticated", "service_role";
GRANT ALL ON TABLE "public"."host_unavailability" TO "anon", "authenticated", "service_role";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "public" TO "anon", "authenticated";
