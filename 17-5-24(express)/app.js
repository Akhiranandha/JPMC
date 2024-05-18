const path=require("path")
const express = require("express")
const fs= require("fs")
const cors = require("cors");


// var students=[
//     {
//         id:1,
//         name:"akhira",
//         dept:"cse"
//     },
//     {
//         id:2,
//         name:"madhu",
//         dept:"ece"
//     },
//     {
//         id:3,
//         name:"nikhil",
//         dept:"CIVIL"
//     }
// ]
var students
var getstudents = () =>{
    var data=fs.readFileSync("students.json")
    if(data){
        students = JSON.parse(data); 
        return students;
    }
    else{
        console.log("no such resourse")
    }
}
var setstudents = (students) => {
    fs.writeFile("students.json", JSON.stringify(students), (err) =>{
        if(err)
            console.log("unable to write in file");
    })
}
var app=express()
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
    res.status(200).send("This is home page")

});
app.get("/api/students", (req,res)=>{
    if(students==undefined)
        students= getstudents()
    res.json(students)
})

app.post("/api/students",(req,res)=>{
    if(students==undefined)
        students= getstudents()
    var student=req.body
    students.push(student)
    res.status(200).json(students)
    setstudents(students)
})

app.put("/api/students/:id",(req,res)=>{
    if(students==undefined)
        students= getstudents()
    var id=parseInt(req.params.id)
    var student=students.find(student => student.id===id)
    if(student){
        student.name=req.body.name
        student.dept=req.body.dept

        res.status(200).json(students)
        setstudents(students)
    }
    else{
        res.status(404).json({message:`student with id : ${req.params.id} not found`})
    }
})

app.patch("/api/students/:id",(req,res)=>{
    if(students==undefined)
        students= getstudents()
    var id=parseInt(req.params.id)
    var student=students.find(student => student.id===id)
    if(student){
        if(req.body.name)
            student.name=req.body.name
        if(req.body.dept)
            student.dept=req.body.dept
        res.status(200).json(students)
        setstudents(students)
    }
    else{
        res.status(404).json({message:`student with id : ${req.params.id} not found`})
    }
})

app.delete("/api/students/:id",(req,res)=>{
    if(students==undefined)
        students= getstudents()
    var id=parseInt(req.params.id)
    var student=students.find(student => student.id===id)
    if(student){
        var ind=students.indexOf(student)
        students.splice(ind,1)
        res.status(200).json(students)
        setstudents(students)
    }
    else{
        res.status(404).json({message:`student with id : ${req.params.id} not found`})
    }
});

app.use((req,res,next)=>{
    res.status(404).send("no such resourse")
})

app.listen(4321);