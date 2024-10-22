const express = require('express');
const contactCntrl = require('../controllers/Contact');
const router = express.Router();

router.route('/')
    .post(contactCntrl.create)
    .get(contactCntrl.list)
    .delete(contactCntrl.removeAll)

router.param('contactId', contactCntrl.contactByID);

router.route('/:contactId')
    .get(contactCntrl.read)
    .put(contactCntrl.update)
    .delete(contactCntrl.remove)

module.exports = router