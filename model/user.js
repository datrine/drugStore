var mongoose=require("mongoose")
var userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    pass_hash:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mname:{
        type:String,
    },
    isEmailVer:{
        type:Boolean,
        default:false
    },
    date_created:{
        type:Date,
        default:Date.now()
    },
    pass_string:{
        type:String,
        required:true}
})
var User=mongoose.model("User",userSchema)
module.exports=User;