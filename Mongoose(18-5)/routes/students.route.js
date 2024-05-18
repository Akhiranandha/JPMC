const express = require("express")
const student_model = require("../models/students.model")

const router = express.Router()

router.get("/", (req,res) =>{
    res.send("Hello World")
})

router.post("/", async(req,res)=>{
    var student = await student_model.create({
        _id:6,
        name: "Akhira",
        phone: 789651163,
        email: "akhira@gmail.com",
    })
    // var student={}
    console.log(req.headers)
    res.json(student)
})

module.exports = router