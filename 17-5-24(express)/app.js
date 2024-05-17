const path=require("path")
const express = require("express")
const fs= require("fs")
// var students=[
//     {
//         id:1,
//         name:"akhira",
//         dept:"cse"
//     },
//     {
//         id:2,
//         name:"nandhu",
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
    // fs.readFile("students.json", function(err, data) { 
    
    //     if (err){
    //         console.log("no such resourse")
    //     } 
    //     else{
    //         data=data.toString()
    //         // console.log(typeof data)
    //         students = JSON.parse(data); 
    //         return students;
    //     }
    // }); 
}
var setstudents = (students) => {
    console.log("problem",students)
    fs.writeFile("students.json", JSON.stringify(students), (err) =>{
        if(err)
            console.log("unable to write in file");
    })
}
var app=express()
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("This is home page")

});
app.get("/api/students", (req,res)=>{
    if(students==undefined)
        students= getstudents()
    res.json(students)
    setstudents(students)
})

app.post("/api/students",(req,res)=>{
    if(students==undefined)
        students= getstudents()
    var student=req.body
    students.push(student)
    res.json(students)
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

        res.json(students)
    }
    else{
        res.status(404).json({message:`student with id : ${req.params.id} not found`})
    }
    setstudents(students)
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
        res.json(students)
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
        res.json(students)
    }
    else{
        res.status(404).json({message:`student with id : ${req.params.id} not found`})
    }
});

app.use((req,res,next)=>{
    res.status(404).send("no such resourse")
})

app.listen(3421);