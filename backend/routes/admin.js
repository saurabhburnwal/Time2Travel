const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');
const { getTableData, addRow, updateRow, deleteRow } = require('../controllers/adminController');

// All routes require admin role
router.use(verifyToken, requireRole('admin'));

// GET /api/admin/tables/:tableName
router.get('/tables/:tableName', getTableData);

// POST /api/admin/tables/:tableName
router.post('/tables/:tableName', addRow);

// PUT /api/admin/tables/:tableName/:id
router.put('/tables/:tableName/:id', updateRow);

// DELETE /api/admin/tables/:tableName/:id
router.delete('/tables/:tableName/:id', deleteRow);

module.exports = router;
