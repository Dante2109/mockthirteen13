const express=require("express");
const { connection } = require("./Configs/db");
const cors=require("cors")
const server=express();
server.use(cors())
server.use(express.json())
server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is connected on ${process.env.PORT}`)
})
