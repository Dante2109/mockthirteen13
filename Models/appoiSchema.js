const mongoose=require("mongoose")
const appoiSchema=mongoose.Schema({
    name: String,
    image:String,
    specialization: String,
    experience: Number,
    location: String,
    date: String,
    slots : Number,
    fee: Number
},{
    versionKey:false
})

const AppoiModel=mongoose.model("appointment",appoiSchema)
module.exports={
    AppoiModel
}