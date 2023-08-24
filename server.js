const express =require("express");
const app=express();
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
const expressSession = require('express-session');
const passport=require("passport");
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

const {connectMongoose,User}=require("./database");
const { initializingPassport,isAuthenticated } = require("./passpostConfig");
connectMongoose();
// initializingPassport(passport);
initializingPassport(passport);
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async(req,res)=>{
  const user=await User.findOne({username:req.body.username});
  if(user){ return res.status(400).send("User already exists")};
  const newUser= await User.create(req.body);
  res.status(201).send(newUser);
});
app.post("/login",passport.authenticate("local",{failureRedirect:"/register",successRedirect:"/"}),async(req,res)=>{

})
app.get("/profile",isAuthenticated,(req,res)=>{
    res.send(req.user);
})
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.send("Error occurred while logging out.");
        }
        res.send("Logged out successfully.");
    });
});

app.listen(3000,()=>{
    console.log("Listening on 3000");
})