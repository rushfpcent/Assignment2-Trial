const express = require('express');
const userCntrl = require('../controllers/User');
const router = express.Router();

/*router.route('/api/users').post(userCntrl.create)
router.route('/api/users').get(userCntrl.list)
router.param('userId',userCntrl.userByID)
router.route('/api/users/:userId').get(userCntrl.read)
router.route('/api/users/:userId').get(userCntrl.update)
router.route('/api/users/:userId').get(userCntrl.remove)
*/

//Had to rearrange as the code above was a bit messy and had some redundancy
router.route('/')
    .post(userCntrl.create)
    .get(userCntrl.list)
    .delete(userCntrl.removeAll)

router.param('userId', userCntrl.userByID);

router.route('/:userId')
    .get(userCntrl.read)
    .put(userCntrl.update)
    .delete(userCntrl.remove)

module.exports = router