var mongoose=require("mongoose")
var subListSchema= new mongoose.Schema({
    id:{type:Number},
    quantity:{type:Number},
    price:{type:Number},
    quantifier:{type:String},
    vat:{type:Number}
})
var item_listSchema= new mongoose.Schema({
    sub_list:{type:[subListSchema]},
    name:{type:String},
    id:{type:String},
    img:{type:String},
})
var cartSchema= new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    item_list:[item_listSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
});
console.log(mongoose.models)
var Cart=mongoose.model("Cart",cartSchema)
module.exports=Cart