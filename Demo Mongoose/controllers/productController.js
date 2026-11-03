const Product = require("../models/Products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const products = new Product(req.body);
    await products.save();
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
