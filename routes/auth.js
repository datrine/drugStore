let passport = require("passport")
let LocalStrategy = require("passport-local").Strategy
var User = require("../model/user")
var bcrypt = require("bcrypt")
var local = function (username, password, done) {
    console.log("in strategy")
    User.findOne({ "username": username }, (err, user) => {
        //console.log("hgghjjhj")
        if (err) {
            console.log("error 1")
            console.log(err)
        }
        if (!user) {
            console.log("no user")
            return done(null, false, { message: "Incorrect user" })
        }
        if (user) {
            //console.log(user)
        bcrypt.compare(password, user.pass_hash, (err, res) => {
            //any err
            if (err) {
                console.log("Error 2")
                console.log(err)
                return done(null, false, { message: "Incorrect pass" })
            }
            //if comparison is true
            if (!res) {
                console.log("no pass")
                return done(null, false, { message: "Incorrect pass" })
            }
            //if comparison is true
            if (res) {
                //console.log("succeeded")
                //console.log(user)
                return done(null, user)
            }
        })
        }
    })
}

module.exports = function (app) {
    app = app;
    console.log("now")
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        console.log(user)
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        //console.log("deserializing id: " + id)
        User.findById(id, function (err, user) {
            //console.log(user)
            done(err, user);
        });
    });
    //passport.use(local)

    app.use('/', function (req, res, next) {
        //console.log("nbkjbjbjbjkj")
        if (!req.user) {
            
        passport.use(new LocalStrategy(local))
        
        passport.authenticate('local', function (err, user, info) {
            //console.log(info)
            req.login_info=info
            if (err) {
                console.log(err)
                return next("route");
            }
            if (!user) {
                console.log("not a logged in user")
                return next("route")
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next("route");
                }
                console.log("logged in")
                return next("route")
            });
        })(req, res, next);
        }
        else{
            return next("route")}
    });
    app.post("/login",(req,res,next)=>{
        console.log("tryna get log")
        console.log(req.user)
        console.log(req.login_info)
        if (req.user) {
            return res.json({isLoggedIn:true})
        }
        if (!req.user) {
            return res.json({isLoggedIn:false,info:req.login_info})
        }
    })
    app.get('/logout', function (req, res) {
        req.logout();
        res.json({isLoggedIn:false})
    });
}