const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publishedYear: { type: Number },
    totalCopies: { type: Number, min: 0 },
    availableCopies: { type: Number, min: 0 },
  },
  {
    timestamps: true,
    _id: false, // Tắt tự động sinh _id mới của Mongoose để không đè lên _id từ JSON
  },
);

const Book = mongoose.model("Book", booksSchema, "books");
module.exports = Book;
