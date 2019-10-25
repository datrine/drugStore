var router=require("express").Router()
var Listing = require("../model/listing")
router.get("/",(req,res,next)=>{
    res.render("my_prod")
})
router.post("/",(req,res,next)=>{
    Listing.find((err,listings)=>{
        if(err)
        res.json({})
        if(listings){
            console.log(listings)
        res.json(listings)
    }
    })
})
module.exports=router;