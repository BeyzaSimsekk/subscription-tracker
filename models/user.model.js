import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true,"User name is required"], //[required, (error)message]
        trim: true, //removes spaces
        minLength: 2,
        maxLength: 50,
    }, 
    email:{
        type: String,
        required: [true, "User email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        //start w/ a string + @ + string + . + string
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"], //u.beyza.simsek@gmail.com
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: 6
    }
},{timestamps: true}); //created_at, updated_at columns will be added


const User = mongoose.model("User", userSchema);

export default User;

// User.create({}) : 
//{
//    name: John Doe,
//    email: johnnyBravo@huhahah.com,
//    password: ruhi123,
//}