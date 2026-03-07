const express = require('express');
const router = express.Router();
const { getMyContacts, addContact, updateContact, deleteContact } = require('../controllers/safetyController');
const verifyToken = require('../middleware/auth');

// All safety routes require auth

// GET /api/safety/contacts
router.get('/contacts', verifyToken, getMyContacts);

// POST /api/safety/contacts
router.post('/contacts', verifyToken, addContact);

// PUT /api/safety/contacts/:id
router.put('/contacts/:id', verifyToken, updateContact);

// DELETE /api/safety/contacts/:id
router.delete('/contacts/:id', verifyToken, deleteContact);

module.exports = router;
