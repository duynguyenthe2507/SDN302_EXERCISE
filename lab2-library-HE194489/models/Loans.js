const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => {new mongoose.Types.ObjectId().toString()}},
    member_id: {
      type: String,
      ref: "Member",
      required: true,
    },

    items: [
      {
        book_id: {
          type: String,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, min: 1, required: true },
      },
    ],

    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },

    status: {
      type: String,
      enum: ["Borrowing", "Returned", "Overdue"],
      default: "Borrowing",
    },
  },
  { 
    timestamps: true, 
   },
);

const Loan = mongoose.model("Loan", loansSchema, "loans");
module.exports = Loan;
