const express = require('express')
const router = express.Router()
const consultantController = require('../controllers/consultantController.js')

router.get('/', consultantController.consultantList)
router.delete('/:id', consultantController.deleteConsultant)

module.exports = router