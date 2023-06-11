const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decode=jwt.verify(token,process.env.secret_code)
            if(decode){
                req.body.userID=decode.userID
                next()
            }else{
                res.json({msg:"not authorised"})
            }
        } catch (error) {
            res.json({error:error.message})
        }
    }
    else{
        res.json({msg:"please Login"})
    }
}
module.exports={
    auth
}