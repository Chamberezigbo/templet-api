const express = require('express');

const upload  = require('../config/malter');
const {saveBusiness} = require('../controllers/business.controller');
const {authMiddleware} = require('../middlewares/auth.middleware')

const router = express.Router();

router.post('/create', upload.single('logo'), authMiddleware, saveBusiness);

module.exports = router;