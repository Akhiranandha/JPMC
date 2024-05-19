// const { name } = require("ejs")
const mongoose = require("mongoose")
const student_schema = mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name: String,
    phone: Number,
    email: String
})
const student_model = mongoose.model("student",student_schema)

module.exports = student_model
