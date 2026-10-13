const mongoose = require("mongoose");
const Member = require("../models/Members");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findOne({ _id: req.params.id });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.status(201).json(member);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateMemberById = async (req, res) => {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteMemberById = async (req, res) => {
  try {
    const member = await Member.findOneAndDelete({ _id: req.params.id });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};