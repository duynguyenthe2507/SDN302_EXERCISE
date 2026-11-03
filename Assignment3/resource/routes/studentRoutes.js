const c = require("../controllers/studentController");

const router = require("express").Router();

//dinh tuyen cac request

router.get("/:studentId/attendances");
module.exports = router;
