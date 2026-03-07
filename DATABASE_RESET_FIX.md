# Supabase Database Reset - Fix Summary

## Problem
The `supabase db reset` command was failing with multiple errors:
1. **Syntax error**: `ERROR: syntax error at or near "======="`
2. **Missing relation**: `ERROR: relation "travel_types" does not exist`  
3. **Missing constraint**: `ERROR: there is no unique or exclusion constraint matching the ON CONFLICT specification`

## Root Causes

### 1. Git Merge Conflict Markers
The `supabase/seed.sql` file contained unresolved Git merge conflict markers:
- `<<<<<<< HEAD` at line 24
- `=======` at line 911
- `>>>>>>> dcdbdcc2f4245ad5aa28368a31e4807d04e6fd64` at line 2160

These markers were treated as SQL commands, causing syntax errors.

### 2. Empty Search Path
The seed file had:
```sql
SELECT pg_catalog.set_config('search_path', '', false);
```
This prevented PostgreSQL from finding tables in the public schema.

### 3. Missing Unique Constraints
The seed file used `ON CONFLICT` clauses on columns without unique constraints:
- `ON CONFLICT (role_id)` - roles table
- `ON CONFLICT (email)` - users table  
- `ON CONFLICT (group_type_id)` - group_types table

## Solutions Applied

### 1. Removed Merge Conflict Markers
- Deleted all content from line 909 (`=======`) to the end of file
- Kept the HEAD version content (Tamil Nadu + Telangana data)
- File reduced from 2159 lines to 908 lines

### 2. Fixed Search Path
Changed:
```sql
SELECT pg_catalog.set_config('search_path', '', false);
```
To:
```sql
SELECT pg_catalog.set_config('search_path', 'public', false);
```

### 3. Removed ON CONFLICT Clauses
Since these were for duplicate prevention and not needed on fresh database resets, removed:
- `ON CONFLICT (role_id) DO NOTHING`
- `ON CONFLICT (email) DO NOTHING`
- `ON CONFLICT (group_type_id) DO NOTHING`

## Result

**✅ Database reset successful!**

```
Resetting local database...
Recreating database...
Initialising schema...
Seeding globals from roles.sql...
Applying migration 20260217101637_initialize_tables.sql...
Seeding data from supabase/seed.sql...
Restarting containers...
Finished supabase db reset on branch main.
```

## Database Status

Supabase services are now running at:
- **API URL**: http://127.0.0.1:54321
- **Studio**: http://127.0.0.1:54323
- **Database**: postgresql://postgres:postgres@127.0.0.1:54322/postgres

## Data Seeded

The database now contains:
- ✅ Travel types (Nature, Adventure, Beach, Heritage, Nightlife)
- ✅ Tamil Nadu destinations and hotels
- ✅ Telangana destinations and hotels
- ✅ Group types (Solo, Duo, Family, Friends)
- ✅ Roles (admin, traveler, host)
- ✅ Admin user account

## Next Steps

1. The development app can now connect to Supabase
2. Run `npm run dev` in the travelRoadmap directory
3. Access the app at http://localhost:5173 (or configured port)
4. Use admin credentials: admin@timetotravel.com

## Files Modified

1. `/home/krypton/MCA/TRIMESTER III/SPD/Time2Travel/supabase/seed.sql`
   - Removed merge conflict markers
   - Fixed search_path configuration
   - Removed ON CONFLICT clauses
