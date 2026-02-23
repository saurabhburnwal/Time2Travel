const express = require('express');
const router = express.Router();
const { getStates, getDestinations, getTravelTypes, getGroupTypes } = require('../controllers/lookupController');

// All lookup routes are public — no auth required

// GET /api/lookup/states
router.get('/states', getStates);

// GET /api/lookup/destinations?state=Kerala
router.get('/destinations', getDestinations);

// GET /api/lookup/travel-types
router.get('/travel-types', getTravelTypes);

// GET /api/lookup/group-types
router.get('/group-types', getGroupTypes);

module.exports = router;
