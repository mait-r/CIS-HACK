//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.use(session({
  secret: "our litte secret.",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret : String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("user", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  }

);
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }

);

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/hospital4you",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

const hpitalSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  state : String,
  Address : String,
  Contact : String,
  Infrastructure_rating : Number,
  Staff_rating : Number,
  General_Physicians : Number,
 Pediatricians : Number,
 General_Surgeon : Number,
 Cardiologist : Number,
 Dentist : Number,
 Dermatologists : Number,
 Gynecologist : Number,
 ENT_Specialist : Number

});
const Hpital = new mongoose.model("Hpital", hpitalSchema);

const temp1_hpital = new Hpital({
  name: "Agadi Hospital and Research Centre",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "4-1-16 Tilak Road Hyderabad 500 001",
  Contact : "+ 91 40 475 2988",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
 Pediatricians : Math.floor(Math.random()*10),
 General_Surgeon : Math.floor(Math.random()*10),
 Cardiologist : Math.floor(Math.random()*10),
 Dentist : Math.floor(Math.random()*10),
 Dermatologists : Math.floor(Math.random()*10),
 Gynecologist : Math.floor(Math.random()*10),
 ENT_Specialist : Math.floor(Math.random()*10)
});
temp1_hpital.save();
const temp2_hpital = new Hpital({
  name: "Aditya Hospitals",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "35 HS Road Wilson Garden Bangalore",
  Contact : "+ 91 80 222 2925",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
 Pediatricians : Math.floor(Math.random()*10),
 General_Surgeon : Math.floor(Math.random()*10),
 Cardiologist : Math.floor(Math.random()*10),
 Dentist : Math.floor(Math.random()*10),
 Dermatologists : Math.floor(Math.random()*10),
 Gynecologist : Math.floor(Math.random()*10),
 ENT_Specialist : Math.floor(Math.random()*10)
});
temp2_hpital.save();
const temp3_hpital = new Hpital({
  name: "Amar Leela Hospital",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "B-1/6 Janakpuri-58 Delhi",
  Contact : "+ 91 11 553 7965",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp3_hpital.save();
const temp4_hpital = new Hpital({
  name: "Amit Jaggi Memorial Hospital",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "Bibhavav Nagar Agra",
  Contact : "+ 91 562 233 0600",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp4_hpital.save();
const temp5_hpital = new Hpital({
  name: "Apex Hospitals",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address :"SP-6 Malviya Industrial Area Malviya Ngr 302017 Jaipur",
  Contact : "+ 91 141 751 871",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp5_hpital.save();
const temp6_hpital = new Hpital({
  name: "Asian Heart Institute",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "Bandra Kurla Complex Bandra (East) Mumbai 400 051",
  Contact : "+ 91 22 5698 6666",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp6_hpital.save();
const temp7_hpital = new Hpital({
  name: "B.M. Birla Heart Research Centre",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "1/1 National Library Avenue Calcutta 700 027 West Bengal",
  Contact : "+ 91 33 456 7890",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp7_hpital.save();
const temp8_hpital = new Hpital({
  name: "Bhagawan Mahaveer Jain Hospital",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "Jln Mrg Malviya Ngr 302017 Jaipur",
  Contact : "+ 91 141 700 107",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp8_hpital.save();
const temp9_hpital = new Hpital({
  name: "Chennai Apollo Hospital",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "21 Greams Lane Off Greams road Chennai 600 006",
  Contact : "+ 91 44 829 3333 / 0200",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp9_hpital.save();
const temp10_hpital = new Hpital({
  name: "Escorts Heart Institute and Research Center",
  rating: Math.floor(Math.random()*10),
  state : "Delhi",
  Address : "Okhla Rd,New Delhi ",
  Contact : "+91 05322605561",
  Infrastructure_rating : Math.floor(Math.random()*10),
  Staff_rating : Math.floor(Math.random()*10),
  General_Physicians : Math.floor(Math.random()*10),
  Pediatricians : Math.floor(Math.random()*10),
  General_Surgeon : Math.floor(Math.random()*10),
  Cardiologist : Math.floor(Math.random()*10),
  Dentist : Math.floor(Math.random()*10),
  Dermatologists : Math.floor(Math.random()*10),
  Gynecologist : Math.floor(Math.random()*10),
  ENT_Specialist : Math.floor(Math.random()*10)
});
temp10_hpital.save();

var allhospital = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/search",function(req,res){
  var allhospital = [];
  const stateprovidedbyuser = req.body.stateName;

Hpital.find({state : stateprovidedbyuser},function(err,foundlist){
  if(err){
    console.log(err);
  }else if(foundlist){

      for(var i=0;i<foundlist.length;i++){
          allhospital.push(foundlist[i]);
      }


      console.log("filter are clear")
      res.render("search_page",{detailsofthehospital :allhospital});
    }else

    console.log("filter not clear")
  }
);


});


app.get("/", function(req, res) {
  res.render("home");
});
app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile"]
  })
);
app.get("/login", function(req, res) {
  res.render("login");
});
app.get("/register", function(req, res) {
  res.render("register");
});
app.get("/secrets", function(req, res) {
  User.find({"secret":{$ne:null}},function(err, foundusers){
    if(err){
      console.log(err);
    }else{
      if(foundusers){
        res.render("secrets",{usersWithSecrets : foundusers});
      }
    }
  })

});
app.get("/submit",function(req,res){
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit",function(req,res){
  const submittedsecret = req.body.secret;
  User.findById(req.user.id ,function(err, founduser){
    if(err){
      console.log(err);
    }else{
      if(founduser){
        founduser.secret =submittedsecret;
        founduser.save(function(){
          res.redirect("/secrets");
        })
      }
    }
  })
})


app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})
app.get("/auth/google/hospital4you",
  passport.authenticate("google", {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });
app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      })
    }
  })
});
app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });


});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port");
});
