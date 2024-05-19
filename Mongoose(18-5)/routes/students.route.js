const express = require("express")
const student_model = require("../models/students.model")
const {getData, postData, getSpec, putSpec, deleteSpec,} = require("../controller/student.controller")
const router = express.Router()

router.get("/", getData )
router.post("/", postData)
router.get("/:id", getSpec)
router.put("/:id", putSpec)
router.delete("/:id",deleteSpec)

module.exports = router