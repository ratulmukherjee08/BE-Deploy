const express=require("express")
const {auth}=require("../moddleware/auth.middleware")


const noteRouter=express.Router()
noteRouter.use(auth)
const {noteModel}=require("../model/note.module")
noteRouter.post("/create",async(req,res)=>{
try {
    const note=new noteModel(req.body)
    await note.save()
    res.json({msg:"New note has been added",note:req.body})
} catch (error) {
    res.json({error:error.message})
}

})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await  noteModel.find({userID:req.body.userID})
        res.send(notes)
    } catch (error) {
        res.json({error:error.message})
    }
    

})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID}=req.params
   try {
    const note=await noteModel.findOne({_id:noteID})
    const userIDinNoteDoc=note.userID
      if(userIDinUserDoc===userIDinNoteDoc){
        await noteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.json({msg:`${note.title} has been updated`})
}else{
    res.json({msg:"Not Authorized"})
}
   } catch (error) {
    res.json({error:error})
   }

})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID}=req.params
   try {
    const note=await noteModel.findOne({_id:noteID})
    const userIDinNoteDoc=note.userID
      if(userIDinUserDoc===userIDinNoteDoc){
        await noteModel.findByIdAndDelete({_id:noteID})
        res.json({msg:`${note.title} has been updated`})
}else{
    res.json({msg:"Not Authorized"})
}
   } catch (error) {
    res.json({error:error})
   }

})

module.exports={
    noteRouter
}