const c = require("../controllers/classController");

const router = require("express").Router();

//dinh tuyen cac request

router.get("/:classId/students", c.getStudentInClass);
router.get("/:classId/attendance-summary", c.getAttendanceSummary);
module.exports = router;
