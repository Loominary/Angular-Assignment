const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');

router.get      ('/', cm.getAllCustomers);
router.post     ('/', cm.addCustomer)
router.put    ('/:id', cm.editCustomer);
router.delete ('/:id', cm.deleteCustomer) ;

module.exports = router;