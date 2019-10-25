var mongoose=require("mongoose")
var imgSchema= new mongoose.Schema({
    src:{type:String},
    imgText:{type:String}
})
var priceSchema= new mongoose.Schema({
    price:{type:Number},
    quantifier:{type:String},
    unit:{type:String}
})
var listingSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    priCat: [String],
    desc:String,
    priceDet: [priceSchema],
    tags: [String],
    imgs:[imgSchema],
    creator_id:{
        type:String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
console.log(mongoose.models)
var Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing