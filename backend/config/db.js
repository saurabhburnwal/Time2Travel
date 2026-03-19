const { Pool } = require('pg');
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(dbHost);
const shouldUseSsl = process.env.DB_SSL
    ? process.env.DB_SSL === 'true'
    : !isLocalHost;

const poolConfig = {
    host: dbHost,
    port: parseInt(process.env.DB_PORT) || 54322,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
};

if (shouldUseSsl) {
    poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// Test connection on startup (skip in tests)
if (process.env.NODE_ENV !== 'test') {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('❌ Database connection error:', err.message);
        } else {
            console.log('✅ Connected to PostgreSQL database');
            release();
        }
    });
}

/**
 * Execute a parameterised query
 * @param {string} text  - SQL query string
 * @param {Array}  params - Query parameters
 */
const query = (text, params) => pool.query(text, params);

module.exports = { pool, query };
