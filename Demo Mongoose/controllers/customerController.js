const Customer = require("../models/Customers");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCustomerById = async (req, res) => {
  try {
    const customers = await Customer.findById(req.params.id);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createCustomer = async (req, res) => {
  try {
    const customers = new Customer(req.body);
    await customers.save();
    res.status(201).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateCustomerById = async (req, res) => {
  try {
    const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteCustomerById = async (req, res) => {
  try {
    const customerId = Number(req.params.id);
    const customerIndex = data.customers.findIndex((c) => c.id === customerId);

    if (customerIndex === -1) {
      return res.status(404).json({ message: "Article not found" });
    }

    const deletedCustomer = data.customers.splice(customerIndex, 1);
    res.status(200).json(deletedCustomer[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

