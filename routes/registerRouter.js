const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController.js')

router.post('/admin', adminController.registerAdmin)
router.post('/consultant', adminController.registerConsultant)

module.exports = router