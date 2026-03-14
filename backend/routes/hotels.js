const express = require('express');
const router = express.Router();
const { getHotelsByDestination, getHotelById, addCustomHotel } = require('../controllers/hotelController');
const verifyToken = require('../middleware/auth');

// All hotel routes are public

// GET /api/hotels?destination_id=1
router.get('/', getHotelsByDestination);

// GET /api/hotels/:id
router.get('/:id', getHotelById);

// POST /api/hotels — add custom hotel (auth required)
router.post('/', verifyToken, addCustomHotel);

module.exports = router;
