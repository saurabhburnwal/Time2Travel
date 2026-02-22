const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabase');
const axios = require('axios');

const FASTAPI_SERVICE_URL = process.env.FASTAPI_SERVICE_URL || 'http://localhost:8000';

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
        const { user_id, destination_id, travel_type_id, days, budget, group_type_id } = req.body;

        if (!destination_id || !travel_type_id || !days || !budget || !group_type_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('travel_preferences')
            .insert([
                {
                    user_id: user_id || null, // Allow anonymous users
                    destination_id,
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
 * Triggers the optimization engine to generate a travel roadmap
 */
app.post('/antigravity/generate-roadmap', async (req, res) => {
    try {
        const { preference_id } = req.body;

        if (!preference_id) {
            return res.status(400).json({ error: 'preference_id is required' });
        }

        // 1. Fetch preferences
        const { data: pref, error: prefError } = await supabase
            .from('travel_preferences')
            .select('*')
            .eq('preference_id', preference_id)
            .single();

        if (prefError || !pref) {
            return res.status(404).json({ error: 'Preferences not found' });
        }

        // 2. Fetch Places, Distances, and Hotels for the destination
        const [placesRes, distancesRes, hotelsRes] = await Promise.all([
            supabase.from('places').select('*').eq('destination_id', pref.destination_id),
            supabase.from('place_distances').select('*'), // Ideally filter by places in destination
            supabase.from('hotels').select('*').eq('destination_id', pref.destination_id)
        ]);

        if (placesRes.error) throw placesRes.error;
        if (distancesRes.error) throw distancesRes.error;
        if (hotelsRes.error) throw hotelsRes.error;

        // 3. Prepare data for Optimization Engine (FastAPI)
        const optimizationData = {
            places: placesRes.data.map(p => ({
                place_id: p.place_id,
                name: p.name,
                latitude: p.latitude,
                longitude: p.longitude,
                entry_fee: p.entry_fee || 0,
                avg_visit_time: p.avg_visit_time || 60,
                travel_type_id: p.travel_type_id
            })),
            distances: distancesRes.data.map(d => ({
                place_a_id: d.place_a_id,
                place_b_id: d.place_b_id,
                distance: d.distance
            })),
            hotels: hotelsRes.data,
            days: pref.days,
            budget: pref.budget,
            travel_type_id: pref.travel_type_id,
            group_type_id: pref.group_type_id
        };

        // 4. Call FastAPI
        const response = await axios.post(`${FASTAPI_SERVICE_URL}/optimize`, optimizationData);
        const roadmapData = response.data;

        // 5. Store results in Supabase - ROADMAPS
        const { data: roadmap, error: roadmapError } = await supabase
            .from('roadmaps')
            .insert([{
                user_id: pref.user_id,
                destination_id: pref.destination_id,
                total_distance: roadmapData.roadmap.total_distance,
                estimated_cost: roadmapData.roadmap.estimated_cost
            }])
            .select()
            .single();

        if (roadmapError) throw roadmapError;

        // 6. Store results in Supabase - ROADMAP_PLACES
        const roadmapPlaces = [];
        roadmapData.roadmap.days.forEach(day => {
            day.places.forEach((place, index) => {
                roadmapPlaces.push({
                    roadmap_id: roadmap.roadmap_id,
                    place_id: place.place_id,
                    day_number: day.day,
                    visit_order: index + 1
                });
            });
        });

        const { error: placesError } = await supabase
            .from('roadmap_places')
            .insert(roadmapPlaces);

        if (placesError) throw placesError;

        // 7. Store results in Supabase - EXPENSES
        const { error: expenseError } = await supabase
            .from('expenses')
            .insert([{
                roadmap_id: roadmap.roadmap_id,
                accommodation: roadmapData.expenses.accommodation,
                food: roadmapData.expenses.food,
                transport: roadmapData.expenses.transport,
                entry_fees: roadmapData.expenses.entry_fees
            }]);

        if (expenseError) throw expenseError;

        res.status(201).json({
            message: 'Roadmap generated and stored successfully',
            roadmap_id: roadmap.roadmap_id,
            roadmap: roadmapData.roadmap
        });

    } catch (error) {
        console.error('Error generating roadmap:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Express API running on port ${PORT}`);
});
