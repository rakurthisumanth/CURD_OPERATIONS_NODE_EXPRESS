const express=require('express')

const db=require("./db")


const app=express()

app.use(express.json())

app.use('/users',require('./services/users/controller'))

app.get("/",(req,res)=>{
    res.send("Hello")
})

const port=8080;

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})