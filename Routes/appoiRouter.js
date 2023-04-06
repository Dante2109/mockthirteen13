const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { AppoiModel } = require("../Models/appoiSchema")

const appoiRouter=express.Router()

appoiRouter.get("/",async(req,res)=>{
    let specialization=req.query.specialization;
    let sort=req.query.sort;
    let name=req.query.name || ""
    let page=req.query.page
    console.log(name)
    try {
        let appoi=await AppoiModel.find({name:{$regex:name,$options:"i"}}).skip((page-1)*4).limit(4);
        res.send(appoi)
    } catch (error) {
        res.send(error)
    }
})

appoiRouter.post("/",async(req,res)=>{
    let body=req.body;
    try {
        let date=new Date();
        date=date.toISOString()
        console.log(date)
        let appointment=new AppoiModel({...body,date})
        appointment.save();
        res.status(200).send({msg:"Appointment has been created"})
    } catch (error) {
        res.status(400).send(error)
    }
})

appoiRouter.post("/book/:id",async(req,res)=>{
    let id=req.params.id;
    try {
        let appoi=await AppoiModel.find({_id:id})

        if(appoi[0].slots){
            await AppoiModel.findByIdAndDelete({_id:id},{slots:appoi[0].slots-1})
            res.status(200).send({msg:"Appointment has been booked"})
        }else{
            res.status(404).send({msg:"No appointment slots left"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={
    appoiRouter
}