var express = require('express');
var router = express.Router();
var Listing = require("../model/listing")
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        return res.render("add_prod")
    }
    else {
        return res.send("<h4>You are not authorized</h4>")
    }
    //res.render("add_prod")
});

router.post('/', function (req, res, next) {
    console.log(req.body.priceInfoArr)
    var { name, imgInfoArr, tags, priCat, desc, priceInfoArr } = req.body
    //imgInfoArr = JSON.parse(imgInfoArr)
    //priceInfoArr = priceObjArray
    let listing = new Listing({
        name: name,
        imgs: imgInfoArr,
        tags,
        desc,
        priCat,
        creator_id:req.user.id,
        priceDet: priceInfoArr
    })
    listing.save((err, listing) => {
        if (err) {
            console.log(err)
            res.json({ isCreated: true })
        }
        if (listing) {
            //console.log(listing)
            res.json({ isCreated: true })
        }
    })
});

module.exports = router;