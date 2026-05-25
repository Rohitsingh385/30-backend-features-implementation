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
   }
}, {
    timestamps: true
})
userSchema.index({username: 1})
userSchema.index({email: 1})
export const User = mongoose.model('User', userSchema);