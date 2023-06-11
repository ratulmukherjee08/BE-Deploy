const express=require("express")
require("dotenv").config()
const {userModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
userRouter.post("/register",(req,res)=>{
    const {name,email,pass}=req.body
try {
    bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.json({error:err,message})  
        }
        else{
            const user=new userModel({name,email,pass:hash})
            await user.save()
        }
    })
    res.json({msg:"user has been registered",user:req.body})
} catch (error) {
    res.json({error:error.message})
}
})

userRouter.post("/login",async(req,res)=>{

    const {email,pass}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
             bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id},process.env.secret_code)
                    res.json({msg:"Logged In",token})
                }else{
                    res.json({msg:"wrong credientials"})
                }
             })

        }else{
            res.json({msg:"user does not found"})
        }
    } catch (error) {
        res.json({error:error.message})
    }

})

module.exports={
    userRouter
}