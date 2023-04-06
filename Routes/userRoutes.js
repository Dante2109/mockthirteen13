const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../Models/userSchema")
const userRouter=express.Router()

userRouter.get("/",async(req,res)=>{
    try {
        let data=await UserModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
    // res.status(200).send("Everything is Working")
})


userRouter.post("/register",async(req,res)=>{
    const {email,password}=req.body
    try {
        let count=await UserModel.count({email});
        console.log(count)
        if(!count){
            bcrypt.hash(password,5,async(err,hash)=>{
                let user=new UserModel({...req.body,password:hash})
                await user.save()
                res.status(200).send({msg:"User has been successfully registerd with the following email",email})
            })
        }else{
            res.status(406).send({msg:"User already Exists"})
        }
    } catch (error) {
        res.status(400).send(error)
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await UserModel.find({email})
        if(user.length){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"shh")
                    res.status(200).send({msg:"Login Successful",token})
                }else{
                    res.status(403).send({msg:"Wrong Credentials"})
                }
            })
        }else{
            res.status(404).send({msg:"User not found"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={
    userRouter
}