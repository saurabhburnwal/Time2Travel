/**
 * export-seed.js
 *
 * Exports the current Supabase local database data into supabase/seed.sql
 * so that it survives `supabase db reset`.
 *
 * Usage:  npm run export-seed
 *         node scripts/export-seed.js
 *
 * How it works:
 *   1. Connects to the local Supabase Postgres via `docker exec`
 *   2. Runs `pg_dump --data-only` to export all table data
 *   3. Writes the output to supabase/seed.sql
 *
 * After running this, you can safely do `supabase db reset` and
 * all your users, reviews, trips, etc. will be restored.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '..', 'supabase', 'seed.sql');

// Tables in dependency order (referenced tables first)
const TABLES = [
    'roles',
    'destinations',
    'travel_types',
    'group_types',
    'roadmap_types',
    'users',
    'hotels',
    'places',
    'host_profiles',
    'host_registrations',
    'travel_preferences',
    'roadmaps',
    'roadmap_places',
    'roadmap_accommodations',
    'reviews',
    'expenses',
    'safety_contacts',
];

function getContainerName() {
    try {
        // Find the Supabase DB container
        const output = execSync(
            'docker ps --filter "name=supabase_db" --format "{{.Names}}"',
            { encoding: 'utf-8' }
        ).trim();

        if (output) return output.split('\n')[0];

        // Fallback: try with project name
        const output2 = execSync(
            'docker ps --filter "ancestor=supabase/postgres" --format "{{.Names}}"',
            { encoding: 'utf-8' }
        ).trim();

        return output2.split('\n')[0] || null;
    } catch {
        return null;
    }
}

function main() {
    console.log('🔍 Finding Supabase DB container...');
    const container = getContainerName();
    if (!container) {
        console.error('❌ Could not find Supabase DB container. Is Supabase running? (supabase start)');
        process.exit(1);
    }
    console.log(`✅ Found container: ${container}`);

    // Build the table flags for pg_dump
    const tableFlags = TABLES.map(t => `-t "public.${t}"`).join(' ');

    // Run pg_dump inside the Docker container
    const cmd = `docker exec ${container} pg_dump -U postgres --data-only --inserts --on-conflict-do-nothing --no-owner --no-privileges ${tableFlags} postgres`;

    console.log('📦 Exporting database data...');
    try {
        const output = execSync(cmd, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });

        // Add a header comment
        const header = [
            '--',
            '-- PostgreSQL database dump (auto-exported by export-seed.js)',
            `-- Exported at: ${new Date().toISOString()}`,
            '--',
            '-- This file is auto-generated. Run: npm run export-seed',
            '-- to update it with the latest data from your local Supabase.',
            '--',
            '',
        ].join('\n');

        fs.writeFileSync(SEED_FILE, header + output, 'utf-8');
        console.log(`✅ Seed exported to: ${SEED_FILE}`);
        console.log(`📄 File size: ${(fs.statSync(SEED_FILE).size / 1024).toFixed(1)} KB`);
        console.log('');
        console.log('You can now safely run: supabase db reset');
        console.log('All your users, trips, reviews, etc. will be restored.');
    } catch (err) {
        console.error('❌ pg_dump failed:', err.message);

        // Fallback: try without --on-conflict-do-nothing (older pg_dump)
        console.log('⚠️  Retrying without --on-conflict-do-nothing...');
        try {
            const cmdFallback = `docker exec ${container} pg_dump -U postgres --data-only --inserts --no-owner --no-privileges ${tableFlags} postgres`;
            let output = execSync(cmdFallback, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });

            // Manually add ON CONFLICT DO NOTHING to INSERT statements
            output = output.replace(/^(INSERT INTO .+)\);$/gm, '$1) ON CONFLICT DO NOTHING;');

            const header = [
                '--',
                '-- PostgreSQL database dump (auto-exported by export-seed.js)',
                `-- Exported at: ${new Date().toISOString()}`,
                '--',
                '',
            ].join('\n');

            fs.writeFileSync(SEED_FILE, header + output, 'utf-8');
            console.log(`✅ Seed exported to: ${SEED_FILE}`);
        } catch (err2) {
            console.error('❌ Fallback also failed:', err2.message);
            process.exit(1);
        }
    }
}

main();
