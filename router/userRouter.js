const express = require('express')
const router = express.Router()
const { userController } = require('../controller/index')
//semua alamat/endpoint/url di API


router.get('/getUsers', userController.getAllUsers)
router.get('/getById/:id', userController.getUserById)
router.get('/getByUsername-username', userController.searchByUsername)
router.get('/getRole-role', userController.searchByrole)
router.get('/login/:username/:password', userController.login)
//localhost http://localhost:2000/users/getUserById/1 req.param
//http://localhost:2000/users/getByUsername-username?username=lia

module.exports = router