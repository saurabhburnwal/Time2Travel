const express = require('express');
const router = express.Router();
const { getAllPlaces, getPlaceById } = require('../controllers/placeController');

// All place routes are public

// GET /api/places?destination_id=1&travel_type=Nature
router.get('/', getAllPlaces);

// GET /api/places/:id
router.get('/:id', getPlaceById);

module.exports = router;
