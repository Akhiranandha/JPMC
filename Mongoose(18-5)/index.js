const express = require("express")
const connectDB = require("./connection/mongodb.connect")
const bodyParser = require("body-parser") 
const cors=require("cors")
require("dotenv").config()
const studentsRoutes = require("./routes/students.route")

const port = process.env.PORT
const app = express()
connectDB();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use("/api/students",studentsRoutes)

app.get("/", (req,res) => {
    res.send("Hello this is home")
})

app.listen(port, () =>{
    console.log(`Server is up at port ${port}`)
})