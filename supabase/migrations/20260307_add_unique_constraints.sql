-- Add unique constraints for idempotent seeding
-- These allow ON CONFLICT DO NOTHING in seed.sql

-- Users: email must be unique
CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON public.users USING btree (email);
ALTER TABLE public.users ADD CONSTRAINT users_email_unique UNIQUE USING INDEX users_email_unique;

-- Roles: role_name must be unique
CREATE UNIQUE INDEX IF NOT EXISTS roles_role_name_unique ON public.roles USING btree (role_name);
ALTER TABLE public.roles ADD CONSTRAINT roles_role_name_unique UNIQUE USING INDEX roles_role_name_unique;

-- Group types: type_name must be unique
CREATE UNIQUE INDEX IF NOT EXISTS group_types_type_name_unique ON public.group_types USING btree (type_name);
ALTER TABLE public.group_types ADD CONSTRAINT group_types_type_name_unique UNIQUE USING INDEX group_types_type_name_unique;
