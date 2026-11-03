const mongoose = require("mongoose");
const Attendance = require("../models/Attendances");

exports.getAttendanceHistory = async (req, res) => {
  const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ error: `Invalid studentId: ${studentId}` });
    }
  
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: `Student with id = ${studentId} not found` });
      }
  
      const attendanceRecords = await Attendance.find({ studentId })
        .sort({ date: -1 })
        .populate({
          path: "classId",
          populate: { path: "subjectId" },
        });
  
      const formattedRecords = attendanceRecords.map((a) => ({
        id: a._id,
        className: a.classId?.className || "N/A",
        subjectName: a.classId?.subjectId?.name || "N/A",
        date: a.date,
        status: a.status,
      }));
      return res.status(200).json(formattedRecords);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
