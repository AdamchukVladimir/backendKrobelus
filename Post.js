import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
// const Post = new mongoose.Schema({
//     login: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     picture: {type: String}
// });



const Users = new mongoose.Schema({
    login: {type: String, unique: true, required: true, minlength:3, maxlength:20},
    name: {type: String, default: "NoName", minlength:3, maxlength:20},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    favouriteHeroes: [{type:String}], 
    joinDate: {type: Date, default: Date.now},
    picture: {type: String}
})

Users.plugin(uniqueValidator);

export default mongoose.model('Users', Users);