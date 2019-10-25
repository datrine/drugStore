var router=require("express").Router()
var User=require("../model/user")
router.post("/email",(req,res,next)=>{
    User.collection||User.createCollection()
    User.findOne({email:req.body.email},(err,doc)=>{
        if (err) {
            console.log(err)
            return res.json({valid:false})
        }
        if (doc) {
            return res.json({valid:false})
        }
    return res.json({valid:true})
    })
})
router.post("/username",(req,res,next)=>{
    User.collection||User.createCollection()
    User.findOne({username:req.body.username},(err,doc)=>{
        if (doc) {
            return res.json({valid:false})
        }
    return res.json({valid:true})
    })
})
module.exports=router