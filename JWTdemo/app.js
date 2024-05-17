const express=require("express")
const jwt=require("jsonwebtoken")
const app = express()
app.use(express.json())

app.post('/login', (req,res)=>{
    // console.log(req.body)
    const user = {
        uname: req.body.uname,
        pass: req.body.pass
    }
    jwt.sign({user},"akhira",(err,token)=>{
        if(err){
            console.log("cant create token")
            res.status
        }
        else{
            res.status(200).json(token)
        }
    })
})

const verifytoken = (req,res,next) =>{
    const data = req.headers['authorization']
    token=data.split(' ')[1]
    if(token){
        req.token=token
        next()
    }
    else{
        res.status(401).send('unauthorized')
    }
}

app.post("/profile", verifytoken , (req,res)=>{
    jwt.verify(req.token,"akhira",(err,decoded)=>{
        if(err){
            console.log("unable to verify")
        }
        else{
            console.log(decoded)
            res.sendFile("index.html",{root:__dirname})
        }
    })
})

app.listen(4321)