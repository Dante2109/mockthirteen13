const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        jwt.verify(token,"shh",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID;
                next()
            }else{
                res.status(401).send("Please Login")
            }
        })
    }else{
        res.status(401).send("Please login")
    }
}
module.exports={
    authenticate
}