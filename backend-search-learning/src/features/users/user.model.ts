import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    trim: true 
   } ,
   username: {
    type: String,
    required: true,
    unique: true,
    trim: true
   },
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true 
   },
   bio: {
    type: String,
    default: ""
   },
   status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
   },
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
   }
}, {
    timestamps: true
})
userSchema.index({username: 1})
userSchema.index({email: 1})
userSchema.index({
    username: "text",
    name: "text",
    bio: "text"
})
export const User = mongoose.model('User', userSchema);