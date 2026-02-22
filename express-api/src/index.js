const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabase');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'express-api' });
});

/**
 * POST /preferences
 * Stores travel preferences in the database
 */
app.post('/preferences', async (req, res) => {
    try {
        const { user_id, travel_type_id, days, budget, group_type_id } = req.body;

        if (!travel_type_id || !days || !budget || !group_type_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('travel_preferences')
            .insert([
                {
                    user_id: user_id || null,
                    travel_type_id,
                    days,
                    budget,
                    group_type_id
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({ message: 'Preferences stored successfully', data: data[0] });
    } catch (error) {
        console.error('Error storing preferences:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /antigravity/generate-roadmap
 * Stub for roadmap generation
 */
app.post('/antigravity/generate-roadmap', async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
});

app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}`);
});
