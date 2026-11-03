const express = require('express');
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/:id', customerController.createCustomer);
router.put('/:id', customerController.updateCustomerById);
router.delete('/:id', customerController.deleteCustomerById);

module.exports = router;