const mongoose = require("mongoose");
const Book = require("../models/Books");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
