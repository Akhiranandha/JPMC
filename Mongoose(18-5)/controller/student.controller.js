const st_model = require("../models/students.model")

async function getData(req,res){
    const data = await st_model.find({})
    res.json(data)
}
async function postData(req,res){
    try{
        const data =req.body
        console.log(req.body)
        const s = await st_model.create(data)
        res.status(200).json(s)
    }
    catch(err){
        // console.log("error while posting data : ",err)
        res.status(500).json({"message":err.message})
    }
}

async function putSpec(req,res){
    try{
        const id = req.params.id
        const options = {new : true}
        const s = await st_model.findByIdAndUpdate(id,req.body,options)
        if(s){
            res.status(200).json(s)
        }
        else{
            res.status(404).json({"message":`record with id ${id} not found`})
        }
    }
    catch(err){
        console.log("error while puting data : ",err)
        res.status(500).json({"message":err.message})
    }
}

async function deleteSpec(req,res){
    try{
        const id = req.params.id
        const s = await st_model.findByIdAndDelete(id)
        if(s){
            res.status(200).json(s)
        }
        else{
            res.status(404).json({"message":`record with id ${id} not found`})
        }
    }
    catch(err){
        console.log("error while deleting data : ",err)
        res.status(500).json({"message":err.message})
    }
}

async function getSpec(req,res){
    try{
        const id = req.params.id
        const s = await st_model.findById(id)
        if(s){
            res.status(201).json(s)
        }
        else{
            res.status(404).json({"message":`record with id ${id} not found`})
        }
    }
    catch(err){
        console.log("error while accessing data : ",err)
        res.status(500).json({"message":err.message})
    }
}

module.exports = {getData, postData, getSpec, putSpec, deleteSpec}