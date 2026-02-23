const express = require('express');
const router = express.Router();
const { getExpensesByRoadmap, saveExpenses, updateExpenses } = require('../controllers/expenseController');
const verifyToken = require('../middleware/auth');

// All expense routes require auth

// GET /api/expenses/roadmap/:roadmapId
router.get('/roadmap/:roadmapId', verifyToken, getExpensesByRoadmap);

// POST /api/expenses/roadmap/:roadmapId
router.post('/roadmap/:roadmapId', verifyToken, saveExpenses);

// PUT /api/expenses/:id
router.put('/:id', verifyToken, updateExpenses);

module.exports = router;
