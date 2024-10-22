const express = require('express')
const userCntrl = require('../controllers/User.js')
const router = express.router()

router.route('/api/users').post(userCntrl.create)
router.route('/api/users').get(userCntrl.list)
router.param('userId',userCntrl.userByID)
router.route('/api/users/:userId').get(userCntrl.read)
router.route('/api/users/:userId').get(userCntrl.update)
router.route('/api/users/:userId').get(userCntrl.remove)

module.exports = router