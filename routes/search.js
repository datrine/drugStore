var router=require("express").Router()
var Listing = require("../model/listing")
router.post("/",(req,res,next)=>{
    let text=req.query.text
    Listing.find({$or:[{name:text},{priCat}]},(err,listings)=>{
        if(err)
       {
           console.log(err)
            res.json({})
        }
        if(listings){
            console.log(listings)
        res.json(listings)
    }
    })
})
module.exports=router;