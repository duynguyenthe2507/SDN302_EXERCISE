const mongoose = require("mongoose");
const Class = require("../models/Classes");

exports.getStudentsInClass = async (req, res) => {
  const { classId } = req.params;
  const { status } = req.query;
  if (!mongoose.isValidObjectId(classId)) {
    return res.status(400).json({ message: `Invalid classId ${classId}` });
  }
  if (!["enrolled", "dropped"].includes(status)) {
    return res.status(400).json({ error: `Invalid status: ${status || ""}` });
  }
  try {
    const classRecord = await Class.findById(classId).populate(
      "enrollments.studentId",
    );
    if (!classRecord) {
      return res
        .status(404)
        .json({ error: `Class with id = ${classId} not found` });
    }

    const students = classRecord.enrollments
      .filter(
        (enrollment) => enrollment.status === status && enrollment.studentId,
      )
      .map(({ studentId }) => ({
        id: studentId._id,
        studentCode: studentId.studentCode,
        fullName: studentId.fullName,
        email: studentId.email,
      }));
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceSummary = async (req, res) => {
  const { classId } = req.params;
  if (!isValidObjectId(classId)) {
    return res.status(400).json({ error: `Invalid classId: ${classId}` });
  }

  try {
    const classRecord = await Class.findById(classId).populate(
      "enrollments.studentId",
    );
    if (!classRecord) {
      return res
        .status(404)
        .json({ error: `Class with id = ${classId} not found` });
    }

    const enrolledStudents = classRecord.enrollments.filter(
      (enrollment) => enrollment.status === "enrolled" && enrollment.studentId,
    );
    const attendances = await Attendance.find({ classId });
    const summary = enrolledStudents.map(({ studentId }) => {
      const studentAttendances = attendances.filter(
        (attendance) =>
          attendance.studentId.toString() === studentId._id.toString(),
      );
      const present = studentAttendances.filter(
        (attendance) => attendance.status === "PRESENT",
      ).length;
      const absent = studentAttendances.filter(
        (attendance) => attendance.status === "ABSENT",
      ).length;
      const totalSessions = studentAttendances.length;
      const attendanceRate =
        totalSessions === 0
          ? 0
          : Math.round((present / totalSessions) * 1000) / 10;

      return {
        studentCode: studentId.studentCode,
        fullName: studentId.fullName,
        totalSessions,
        present,
        absent,
        attendanceRate,
        warning: attendanceRate < 80,
      };
    });

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
