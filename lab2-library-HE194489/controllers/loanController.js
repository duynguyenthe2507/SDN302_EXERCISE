const Loan = require("../models/Loans");
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate("member_id")
      .populate("items.book_id");

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id })
      .populate("member_id")
      .populate("items.book_id");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { member_id, items, dueDate } = req.body;

    if (!member_id || !items || !items.length || !dueDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const loan = await Loan.create(req.body);
    return res.status(201).json(loan);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getLoanByMemberId = async (req, res) => {
  try {
    const { memberId } = req.params;

    const loans = await Loan.find({ member_id: memberId })
      .populate("member_id")
      .populate("items.book_id");

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
