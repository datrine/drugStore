var mongoose=require("mongoose")
var subListSchema= new mongoose.Schema({
    quantity:{type:Number},
    price:{type:Number},
    quantifier:{type:String},
    totalPrice:{type:Number}
})
var sectionSchema= new mongoose.Schema({
    price:{type:Number},
    quantifier:{type:String},
    name:{type:String},
    prod_id:{type:String},
})
var listingSchema= new mongoose.Schema({
    buyer_id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address1: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address2: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: Date,
        default: Date.now
    }
});
console.log(mongoose.models)
var Billing=mongoose.model("Listing",listingSchema)
module.exports=Billing 