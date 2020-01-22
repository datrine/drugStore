var router=require("express").Router()
let User = require("../model/user")
let bcrypt = require("bcrypt")
let passport = require("passport")
let LocalStrategy = require("passport-local").Strategy


router.get('/',(req,res,next)=>{
    return res.render("register")
});
router.post("/", (req, res, next) => {
    var { user } = req.body
    bcrypt.hash(user.password, 8, (err, hash) => {
        if (err) {
        }
        if (hash) {
            console.log(hash)
            var newUser = new User({
                lname: user.lname,
                mname: user.mname,
                fname: user.fname,
                username: user.username,
                email: user.email,
                pass_hash:hash,
                pass_string:user.password
            });
            newUser.save((err, user) => {
                if (err) {
                    console.log(err)
                    return res.json({user,isSaved:false})
                }
                if (!user) {
                }
                if (user) {
                    console.log(user)
                    return res.json({user,isSaved:true})
                }
            })
        }
    });
});
router.get('/employee',(req,res,next)=>{
    return res.render("register_employee")
})
router.post("/user",(req,res,next)=>{

})
module.exports=router;