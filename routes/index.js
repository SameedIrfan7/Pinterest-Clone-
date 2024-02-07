var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport=require("passport")
const localstrategy=require("passport-local");

passport.use(new localstrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index")
});

router.post("/login", passport.authenticate("local", {
  successRedirect:"/profile",
  failureRedirect:"/login"
}), function(req, res){
});

router.get("/login", function (req, res, next) {
  res.render("login")
});

router.get("/profile",isLoggedIn, function(req, res, next){
  res.render("profile")
})

router.post("/register", async function(req, res, next){
  const userdata=new userModel({
    username: req.body.username,
  email: req.body.email,
  fullname: req.body.fullname
  })

  userModel.register(userdata, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })
})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())return next();
  res.redirect("/");
}
module.exports = router;
