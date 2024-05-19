
const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.URL
const connectDB = async () => {
    try {
        mongoose.connect(url)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log("Unable to connect to the server",err)
    }
}

module.exports = connectDB