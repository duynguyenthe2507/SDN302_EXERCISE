const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/:studentId/attendances", attendanceController.getAttendanceHistory);

module.exports = router;
