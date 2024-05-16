const http = require("http")
const fs=require("fs")
var server = http.createServer((req,res)=>{
    console.log(req.url)
    var u=req.url
    var students=[
        {
            name:"akhira",
            dept:"CSE"
        },
        {
            name:"nithin",
            dept:"ECE"
        }
    ]
    switch(u){
        case "/":
            res.write("Home page")
            res.end()
            break
        case "/students":
            res.writeHead(200,{"content-type":"text/json"})
            res.write(JSON.stringify(students))
            res.end()
            break
        case "/index.html":
            fs.readFile("index.html",(err,data)=>{
                if(err){
                    console.log("no such file")
                }
                else{
                    res.write(data)
                    res.end()
                }
            })
            break
        default:
            res.write("resourse not found")
            res.end()
    }
})
server.listen(4321)
