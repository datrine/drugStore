var router=require("express").Router()
var Cart = require("../model/cart")
router.get("/billing",(req,res,next)=>{
    if(req.query.cart_id){
        console.log("iyttft")
        Cart.find({id:req.query.cart_id},(err,cart)=>{
            if(err){
                console.log(err)
            }
            if(cart){
                return res.render("billing")
            }
            if(!cart){
                return res.send("<h3>cart not found</h3>")
            }
        }
        )}
        else{
        return res.send("<h3>cart not found</h3>")}
})
router.post("/billing",(req,res,next)=>{
    if(req.body.cart_id){
        console.log(req.body.cart_id)
        Cart.findById(req.body.cart_id,(err,cart)=>{
            if(err){
                console.log(err)
            }
            if(cart){
                console.log(cart)
                return res.json(cart)
            }
            if(!cart){
                return res.json({res:false})
               // return res.send("<h3>cart not found</h3>")
            }
        }
        )}
        else{
        return res.send("<h3>cart not found</h3>")}
})
router.post("/checkout",(req,res,next)=>{
    console.log(req.body)
    let{item_list}=req.body.cart;
    let cart=new Cart({
        user_id:req.user.id,
        name:req.user.username,
        item_list
    })
    cart.save((err,cart)=>{
        if(err)
       {
           console.log(err)
            res.json({})
        }
        if(cart){
            console.log(cart)
        res.json(cart)
    }
    })
})
module.exports=router;