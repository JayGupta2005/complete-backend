import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required : [true, "Usernmae is required"],
        unique: [true, "Must be unique"]
    },
    email:{
        type:String,
        required : [true, "email required"],
        unique : [true, "Must be unique"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    }
})

const userModel = mongoose.model("user", userModel);

export default userModel;