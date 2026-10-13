const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.get("/", loanController.getAllLoans);
router.get("/member/:memberId", loanController.getLoanByMemberId);
router.post("/", loanController.createLoan);
router.get("/:id/memberId", loanController.getLoanByMemberId);
router.get("/:id", loanController.getLoanById);
router.put("/:id/return", loanController.returnLoanById);

module.exports = router;
