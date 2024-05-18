const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const studentsRoutes = require("./routes/students.route")

const port = process.env.PORT
const app = express()

app.use("/api/students",studentsRoutes)
mongoose.connect("mongodb://localhost:27017/JPMCtest")

app.listen(port)