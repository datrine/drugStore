var router=require("express").Router()
var Listing = require("../model/listing")
router.get("/",(req,res,next)=>{
    //if /listing page req
    if (req.query.search) {
    }
    return res.render("listing")
})
router.post("/",(req,res,next)=>{
    Listing.find((err,listings)=>{
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