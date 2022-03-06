var express = require('express')
var router = express.Router()
var { User } = require('../controller/index')

/* Create new user. */
router.post('/create', User.create)
/* GET users listing. */
router.get('/get-users', User.getUsers)
/* GET sinfle user listing. */
router.get('/get-user/:id', User.getSingleUser)
/* Delete user. */
router.delete('/delete-user/:id', User.delete)
/* Update user. */
router.put('/update-user', User.updateUser)

module.exports = router
