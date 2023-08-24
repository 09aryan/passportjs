const mongoose=require("mongoose")

exports.connectMongoose=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/passportjs').then((e)=>console.log("connected to mongo db")).catch((e)=>console.log(e));
}
const userSchema=new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
});
exports.User=mongoose.model("User",userSchema);