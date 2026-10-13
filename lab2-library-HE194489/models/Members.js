const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String, required: true },

    membershipType: {
      type: String,
      enum: ["Student", "Teacher", "Guest"],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Member = mongoose.model("Member", membersSchema, "members");
module.exports = Member;
