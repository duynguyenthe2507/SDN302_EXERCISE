const mongoose = require("mongoose");
const Loan = require("../models/Loans");

const populateLoanReferences = (query) =>
  query.populate("member_id").populate("items.book_id");

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await populateLoanReferences(Loan.find());
    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid loan ID" });
    }

    const loan = await populateLoanReferences(Loan.findById(req.params.id));
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getLoanByMemberId = async (req, res) => {
  try {
    const memberId = req.params.memberId || req.params.id;
    if (!mongoose.isValidObjectId(memberId)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }

    const loans = await populateLoanReferences(
      Loan.find({ member_id: memberId }),
    );
    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    return res.status(201).json(loan);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.returnLoanById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid loan ID" });
    }

    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    if (loan.status === "Returned") {
      return res.status(409).json({ message: "Loan has already been returned" });
    }

    loan.status = "Returned";
    loan.returnDate = new Date();
    await loan.save();

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
