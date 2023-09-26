import mongoose from "mongoose";

const Schema =mongoose.Schema;
const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    phone:{
        type:String,
        required:false,
        minlength:10
    },
    firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      companyId: {
        type: String,
        required: false,
      },
      companyName: {
        type: String,
        required: false,
      },
      plan: {
        type: String,
        enum: ["Lite", "Standard", "Premium"],
        default: "Lite",
      },
      subscriptionStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
      },
      subscriptionDuration: {
        type: String,
        default: "NA",
      },
      renewalDate: {
        type: Date,
      },
      tier: {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
      kamName: {
        type: String,
        default: "customer support",
      },
      kamEmail: {
        type: String,
        default: "Support@siproket.com",
      },
      kamPhoneNumber: {
        type: String,
      },
})

export default mongoose.model("User", userSchema);