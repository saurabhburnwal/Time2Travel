const { query } = require('../config/db');

// List of allowed tables to manage via generic admin routes
const ALLOWED_TABLES = [
    'destinations',
    'hotels',
    'places',
    'reviews',
    'users',
    'host_profiles',
    'host_registrations',
    'host_properties',
    'host_bookings',
    'host_unavailability',
    'travel_types',
    'roadmaps',
    'roadmap_types',
    'roadmap_places',
    'roadmap_accommodations',
    'expenses',
    'roles',
    'group_types',
    'travel_preferences',
    'safety_contacts'
];

exports.getTableData = async (req, res, next) => {
    try {
        const { tableName } = req.params;
        if (!ALLOWED_TABLES.includes(tableName)) {
            return res.status(403).json({ success: false, message: 'Table not allowed.' });
        }

        let sql;
        // Use JOINs for tables that need related data
        if (tableName === 'users') {
            sql = `SELECT u.*, r.role_name as role 
                   FROM users u 
                   LEFT JOIN roles r ON u.role_id = r.role_id 
                   ORDER BY u.user_id LIMIT 500`;
        } else if (tableName === 'host_profiles') {
            sql = `SELECT hp.*, u.name, u.email 
                   FROM host_profiles hp 
                   LEFT JOIN users u ON hp.user_id = u.user_id 
                   ORDER BY hp.host_id LIMIT 500`;
        } else {
            sql = `SELECT * FROM ${tableName} ORDER BY 1 LIMIT 500`;
        }

        const result = await query(sql);
        res.json({ success: true, count: result.rowCount, data: result.rows });
    } catch (err) {
        next(err);
    }
};

exports.addRow = async (req, res, next) => {
    try {
        const { tableName } = req.params;
        const rowData = req.body;

        if (!ALLOWED_TABLES.includes(tableName)) {
            return res.status(403).json({ success: false, message: 'Table not allowed.' });
        }

        const colRes = await query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1`, [tableName]);
        if (colRes.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Table not found in schema.' });
        }
        const validColumns = colRes.rows.map(r => r.column_name);
        
        let rowDataToInsert = { ...rowData };
        
        if (tableName === 'users' && rowDataToInsert.password) {
            const bcrypt = require('bcryptjs');
            rowDataToInsert.password_hash = await bcrypt.hash(rowDataToInsert.password, 10);
            delete rowDataToInsert.password;
        }

        if (tableName === 'users' && rowDataToInsert.role) {
            const roleRes = await query(`SELECT role_id FROM roles WHERE LOWER(role_name) = LOWER($1)`, [rowDataToInsert.role]);
            if (roleRes.rowCount > 0) {
                rowDataToInsert.role_id = roleRes.rows[0].role_id;
            }
            delete rowDataToInsert.role;
        }

        const keys = [];
        const values = [];
        Object.entries(rowDataToInsert).forEach(([k, v]) => {
            if (validColumns.includes(k)) {
                keys.push(k);
                values.push(v);
            }
        });
        
        if (keys.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid columns to insert.' });
        }

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        const columns = keys.join(', ');

        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
        const result = await query(sql, values);

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.updateRow = async (req, res, next) => {
    try {
        const { tableName, id } = req.params;
        const rowData = req.body;

        if (!ALLOWED_TABLES.includes(tableName)) {
            return res.status(403).json({ success: false, message: 'Table not allowed.' });
        }

        const colRes = await query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1`, [tableName]);
        if (colRes.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Table not found in schema.' });
        }
        const validColumns = colRes.rows.map(r => r.column_name);

        // Identify the ID column name (usually tableName_id or id)
        const idColRes = await query(`
            SELECT a.attname
            FROM pg_index i
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE i.indrelid = $1::regclass AND i.indisprimary;
        `, [tableName]);

        const idColumn = idColRes.rowCount > 0 ? idColRes.rows[0].attname : 'id';
        
        // Exclude role_id update to prevent accidental privilege escalation unless handled separately
        // For standard fields update
        let rowDataToUpdate = { ...rowData };
        
        if (tableName === 'users' && rowDataToUpdate.password) {
            const bcrypt = require('bcryptjs');
            rowDataToUpdate.password_hash = await bcrypt.hash(rowDataToUpdate.password, 10);
            delete rowDataToUpdate.password;
        }

        if (tableName === 'users' && rowDataToUpdate.role) {
            const roleRes = await query(`SELECT role_id FROM roles WHERE LOWER(role_name) = LOWER($1)`, [rowDataToUpdate.role]);
            if (roleRes.rowCount > 0) {
                rowDataToUpdate.role_id = roleRes.rows[0].role_id;
            }
            delete rowDataToUpdate.role;
        }

        const keys = [];
        const values = [];
        Object.entries(rowDataToUpdate).forEach(([k, v]) => {
            if (validColumns.includes(k) && k !== idColumn) {
                keys.push(k);
                values.push(v);
            }
        });
        
        if (keys.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid columns to update.' });
        }

        const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
        
        values.push(id);
        const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${idColumn} = $${values.length} RETURNING *`;
        const result = await query(sql, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Row not found.' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.deleteRow = async (req, res, next) => {
    try {
        const { tableName, id } = req.params;

        if (!ALLOWED_TABLES.includes(tableName)) {
            return res.status(403).json({ success: false, message: 'Table not allowed.' });
        }

        // Identify the ID column name
        const idColRes = await query(`
            SELECT a.attname
            FROM pg_index i
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE i.indrelid = $1::regclass AND i.indisprimary;
        `, [tableName]);

        const idColumn = idColRes.rowCount > 0 ? idColRes.rows[0].attname : 'id';

        const sql = `DELETE FROM ${tableName} WHERE ${idColumn} = $1`;
        const result = await query(sql, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Row not found.' });
        }

        res.json({ success: true, message: 'Row deleted successfully.' });
    } catch (err) {
        next(err);
    }
};
