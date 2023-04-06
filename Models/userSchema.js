const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    password:{type:String,required:[true,"Incomplete Information"]},
    email:{type:String,required:[true,"Incomplete Information"]}
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}