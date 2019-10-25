var fs = require("fs")
var router = require("express").Router()
var data2Buf = require("data-uri-to-buffer")
router.post("/", (req, res, next) => {
    var data = req.body
    var imgUrl = data2Buf(data.imgUrl)
    console.log(imgUrl)
    if (req.user) {

        var dir = "temp/" + req.user.username
        var filePath = dir + "/" + data.name;
        fs.mkdir("public/"+dir, (err) => {
            if (err) {
                console.log(err)
            }
            fs.open("public/"+filePath, "w+", (err, fd) => {
                if (err) {
                    console.log(err)
                    res.status(500)
                    res.statusMessage="Ko ye mi o"
                    res.json({ err })
                }
                if (fd)
                    fs.write(fd, imgUrl, (err, written, buf) => {
                        if (!err)
                            res.json({ filePath })
                    })
                    fs.close(fd,err=>{
                        console.log(err)
                    })
            })
        })
    }
    else {
        res.status(403)
        res.end()
    }
})
router.post("/delete", (req, res, next) => {
    var { src } = req.body
    console.log(src)
    fs.unlink("public/"+src, (err) => {
        if (err) {
            console.log(err)
        }else{
            res.json({msg:"File deleted"})
        }
    })
})
module.exports = router;