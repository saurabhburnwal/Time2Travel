const express = require('express');
const router = express.Router();
const { getHotelsByDestination, getHotelById } = require('../controllers/hotelController');

// All hotel routes are public

// GET /api/hotels?destination_id=1
router.get('/', getHotelsByDestination);

// GET /api/hotels/:id
router.get('/:id', getHotelById);

module.exports = router;
