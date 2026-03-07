const express = require('express');
const router = express.Router();
const { getAllDestinations, getDestinationById, getPlacesForDestination } = require('../controllers/destinationController');

// All destination routes are public

// GET /api/destinations?state=Kerala
router.get('/', getAllDestinations);

// GET /api/destinations/:id
router.get('/:id', getDestinationById);

// GET /api/destinations/:id/places?travel_type=Nature
router.get('/:id/places', getPlacesForDestination);

module.exports = router;
