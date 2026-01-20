
  create table "public"."destinations" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "state" text not null,
    "budget_min" integer,
    "budget_max" integer,
    "created_at" timestamp without time zone default now()
      );


CREATE UNIQUE INDEX destinations_pkey ON public.destinations USING btree (id);

alter table "public"."destinations" add constraint "destinations_pkey" PRIMARY KEY using index "destinations_pkey";

grant delete on table "public"."destinations" to "anon";

grant insert on table "public"."destinations" to "anon";

grant references on table "public"."destinations" to "anon";

grant select on table "public"."destinations" to "anon";

grant trigger on table "public"."destinations" to "anon";

grant truncate on table "public"."destinations" to "anon";

grant update on table "public"."destinations" to "anon";

grant delete on table "public"."destinations" to "authenticated";

grant insert on table "public"."destinations" to "authenticated";

grant references on table "public"."destinations" to "authenticated";

grant select on table "public"."destinations" to "authenticated";

grant trigger on table "public"."destinations" to "authenticated";

grant truncate on table "public"."destinations" to "authenticated";

grant update on table "public"."destinations" to "authenticated";

grant delete on table "public"."destinations" to "postgres";

grant insert on table "public"."destinations" to "postgres";

grant references on table "public"."destinations" to "postgres";

grant select on table "public"."destinations" to "postgres";

grant trigger on table "public"."destinations" to "postgres";

grant truncate on table "public"."destinations" to "postgres";

grant update on table "public"."destinations" to "postgres";

grant delete on table "public"."destinations" to "service_role";

grant insert on table "public"."destinations" to "service_role";

grant references on table "public"."destinations" to "service_role";

grant select on table "public"."destinations" to "service_role";

grant trigger on table "public"."destinations" to "service_role";

grant truncate on table "public"."destinations" to "service_role";

grant update on table "public"."destinations" to "service_role";


