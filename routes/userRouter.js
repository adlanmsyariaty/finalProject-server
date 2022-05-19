const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const { userAuthentication } = require('../middlewares/authentication')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.use(userAuthentication)
router.put('/:id', userController.updateUser)

module.exports = router