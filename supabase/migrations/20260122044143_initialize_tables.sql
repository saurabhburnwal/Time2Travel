create extension if not exists "postgis" with schema "public";

create sequence "public"."destinations_destination_id_seq";

create sequence "public"."places_place_id_seq";

create sequence "public"."roles_role_id_seq";

alter table "public"."destinations" drop constraint "destinations_pkey";

drop index if exists "public"."destinations_pkey";


  create table "public"."places" (
    "place_id" integer not null default nextval('public.places_place_id_seq'::regclass),
    "destination_id" integer,
    "name" character varying(100) not null,
    "location" public.geography(Point,4326),
    "entry_fee" numeric(10,2) default 0,
    "avg_visit_time" integer,
    "is_hidden_gem" boolean default false
      );



  create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "phone" text,
    "role_id" integer,
    "gender" text,
    "created_at" timestamp with time zone default timezone('utc'::text, now())
      );



  create table "public"."roles" (
    "role_id" integer not null default nextval('public.roles_role_id_seq'::regclass),
    "role_name" character varying(30) not null
      );


alter table "public"."destinations" drop column "budget_max";

alter table "public"."destinations" drop column "budget_min";

alter table "public"."destinations" drop column "created_at";

alter table "public"."destinations" drop column "id";

alter table "public"."destinations" add column "best_season" character varying(50);

alter table "public"."destinations" add column "country" character varying(100);

alter table "public"."destinations" add column "description" text;

alter table "public"."destinations" add column "destination_id" integer not null default nextval('public.destinations_destination_id_seq'::regclass);

alter table "public"."destinations" add column "is_active" boolean default true;

alter table "public"."destinations" alter column "name" set data type character varying(100) using "name"::character varying(100);

alter table "public"."destinations" alter column "state" drop not null;

alter table "public"."destinations" alter column "state" set data type character varying(100) using "state"::character varying(100);

alter sequence "public"."destinations_destination_id_seq" owned by "public"."destinations"."destination_id";

alter sequence "public"."places_place_id_seq" owned by "public"."places"."place_id";

alter sequence "public"."roles_role_id_seq" owned by "public"."roles"."role_id";

CREATE UNIQUE INDEX places_pkey ON public.places USING btree (place_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (role_id);

CREATE UNIQUE INDEX roles_role_name_key ON public.roles USING btree (role_name);

CREATE UNIQUE INDEX destinations_pkey ON public.destinations USING btree (destination_id);

alter table "public"."places" add constraint "places_pkey" PRIMARY KEY using index "places_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."destinations" add constraint "destinations_pkey" PRIMARY KEY using index "destinations_pkey";

alter table "public"."places" add constraint "places_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public.destinations(destination_id) not valid;

alter table "public"."places" validate constraint "places_destination_id_fkey";

alter table "public"."profiles" add constraint "profiles_gender_check" CHECK ((gender = ANY (ARRAY['MALE'::text, 'FEMALE'::text, 'OTHER'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_gender_check";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public.roles(role_id) not valid;

alter table "public"."profiles" validate constraint "profiles_role_id_fkey";

alter table "public"."roles" add constraint "roles_role_name_key" UNIQUE using index "roles_role_name_key";

create type "public"."geometry_dump" as ("path" integer[], "geom" public.geometry);

create type "public"."valid_detail" as ("valid" boolean, "reason" character varying, "location" public.geometry);

grant delete on table "public"."destinations" to "postgres";

grant insert on table "public"."destinations" to "postgres";

grant references on table "public"."destinations" to "postgres";

grant select on table "public"."destinations" to "postgres";

grant trigger on table "public"."destinations" to "postgres";

grant truncate on table "public"."destinations" to "postgres";

grant update on table "public"."destinations" to "postgres";

grant delete on table "public"."places" to "anon";

grant insert on table "public"."places" to "anon";

grant references on table "public"."places" to "anon";

grant select on table "public"."places" to "anon";

grant trigger on table "public"."places" to "anon";

grant truncate on table "public"."places" to "anon";

grant update on table "public"."places" to "anon";

grant delete on table "public"."places" to "authenticated";

grant insert on table "public"."places" to "authenticated";

grant references on table "public"."places" to "authenticated";

grant select on table "public"."places" to "authenticated";

grant trigger on table "public"."places" to "authenticated";

grant truncate on table "public"."places" to "authenticated";

grant update on table "public"."places" to "authenticated";

grant delete on table "public"."places" to "postgres";

grant insert on table "public"."places" to "postgres";

grant references on table "public"."places" to "postgres";

grant select on table "public"."places" to "postgres";

grant trigger on table "public"."places" to "postgres";

grant truncate on table "public"."places" to "postgres";

grant update on table "public"."places" to "postgres";

grant delete on table "public"."places" to "service_role";

grant insert on table "public"."places" to "service_role";

grant references on table "public"."places" to "service_role";

grant select on table "public"."places" to "service_role";

grant trigger on table "public"."places" to "service_role";

grant truncate on table "public"."places" to "service_role";

grant update on table "public"."places" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "postgres";

grant insert on table "public"."roles" to "postgres";

grant references on table "public"."roles" to "postgres";

grant select on table "public"."roles" to "postgres";

grant trigger on table "public"."roles" to "postgres";

grant truncate on table "public"."roles" to "postgres";

grant update on table "public"."roles" to "postgres";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."spatial_ref_sys" to "anon";

grant insert on table "public"."spatial_ref_sys" to "anon";

grant references on table "public"."spatial_ref_sys" to "anon";

grant select on table "public"."spatial_ref_sys" to "anon";

grant trigger on table "public"."spatial_ref_sys" to "anon";

grant truncate on table "public"."spatial_ref_sys" to "anon";

grant update on table "public"."spatial_ref_sys" to "anon";

grant delete on table "public"."spatial_ref_sys" to "authenticated";

grant insert on table "public"."spatial_ref_sys" to "authenticated";

grant references on table "public"."spatial_ref_sys" to "authenticated";

grant select on table "public"."spatial_ref_sys" to "authenticated";

grant trigger on table "public"."spatial_ref_sys" to "authenticated";

grant truncate on table "public"."spatial_ref_sys" to "authenticated";

grant update on table "public"."spatial_ref_sys" to "authenticated";

grant delete on table "public"."spatial_ref_sys" to "postgres";

grant insert on table "public"."spatial_ref_sys" to "postgres";

grant references on table "public"."spatial_ref_sys" to "postgres";

grant select on table "public"."spatial_ref_sys" to "postgres";

grant trigger on table "public"."spatial_ref_sys" to "postgres";

grant truncate on table "public"."spatial_ref_sys" to "postgres";

grant update on table "public"."spatial_ref_sys" to "postgres";

grant delete on table "public"."spatial_ref_sys" to "service_role";

grant insert on table "public"."spatial_ref_sys" to "service_role";

grant references on table "public"."spatial_ref_sys" to "service_role";

grant select on table "public"."spatial_ref_sys" to "service_role";

grant trigger on table "public"."spatial_ref_sys" to "service_role";

grant truncate on table "public"."spatial_ref_sys" to "service_role";

grant update on table "public"."spatial_ref_sys" to "service_role";


