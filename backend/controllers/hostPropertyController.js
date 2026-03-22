const { query } = require('../config/db');

exports.getHostProperties = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        // First get the host_id
        const hostRes = await query(`SELECT host_id FROM host_profiles WHERE user_id = $1`, [userId]);
        if (hostRes.rowCount === 0) return res.status(403).json({ success: false, message: 'Not a host' });
        const hostId = hostRes.rows[0].host_id;

        const result = await query(`
            SELECT hp.*, d.name as destination_name
            FROM host_properties hp
            LEFT JOIN destinations d ON hp.destination_id = d.destination_id
            WHERE hp.host_id = $1
            ORDER BY hp.created_at DESC
        `, [hostId]);
        
        res.json({ success: true, count: result.rowCount, properties: result.rows });
    } catch (err) {
        next(err);
    }
};

exports.addHostProperty = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const hostRes = await query(`SELECT host_id FROM host_profiles WHERE user_id = $1`, [userId]);
        if (hostRes.rowCount === 0) return res.status(403).json({ success: false, message: 'Not a host' });
        const hostId = hostRes.rows[0].host_id;

        const { destinationId, name, address, maxGuests, providesFood, voluntaryMinAmount, isActive } = req.body;

        const result = await query(`
            WITH inserted AS (
                INSERT INTO host_properties 
                (host_id, destination_id, property_name, address, max_guests, provides_food, voluntary_min_amount, is_active) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING *
            )
            SELECT i.*, d.name as destination_name
            FROM inserted i
            LEFT JOIN destinations d ON i.destination_id = d.destination_id
        `, [hostId, destinationId, name, address, maxGuests, providesFood, voluntaryMinAmount || null, isActive ?? true]);

        res.status(201).json({ success: true, property: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.updateHostProperty = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const propertyId = req.params.id;
        
        // Verify ownership
        const verifyRes = await query(`
            SELECT hp.property_id 
            FROM host_properties hp
            JOIN host_profiles p ON hp.host_id = p.host_id
            WHERE hp.property_id = $1 AND p.user_id = $2
        `, [propertyId, userId]);
        if (verifyRes.rowCount === 0) return res.status(403).json({ success: false, message: 'Property not found or unauthorized' });

        const updates = req.body;
        const fields = [];
        const values = [];
        
        if (updates.name !== undefined) { fields.push('property_name'); values.push(updates.name); }
        if (updates.destinationId !== undefined) { fields.push('destination_id'); values.push(updates.destinationId); }
        if (updates.address !== undefined) { fields.push('address'); values.push(updates.address); }
        if (updates.maxGuests !== undefined) { fields.push('max_guests'); values.push(updates.maxGuests); }
        if (updates.providesFood !== undefined) { fields.push('provides_food'); values.push(updates.providesFood); }
        if (updates.voluntaryMinAmount !== undefined) { fields.push('voluntary_min_amount'); values.push(updates.voluntaryMinAmount); }
        if (updates.isActive !== undefined) { fields.push('is_active'); values.push(updates.isActive); }

        if (fields.length === 0) return res.status(400).json({ success: false, message: 'No fields to update' });

        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
        values.push(propertyId);

        const result = await query(`
            UPDATE host_properties 
            SET ${setClause} 
            WHERE property_id = $${values.length} 
            RETURNING *
        `, values);

        res.json({ success: true, property: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.deleteHostProperty = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const propertyId = req.params.id;
        
        // Verify ownership
        const verifyRes = await query(`
            SELECT hp.property_id 
            FROM host_properties hp
            JOIN host_profiles p ON hp.host_id = p.host_id
            WHERE hp.property_id = $1 AND p.user_id = $2
        `, [propertyId, userId]);
        if (verifyRes.rowCount === 0) return res.status(403).json({ success: false, message: 'Property not found or unauthorized' });

        await query(`DELETE FROM host_properties WHERE property_id = $1`, [propertyId]);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
