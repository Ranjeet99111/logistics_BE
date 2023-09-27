import mongoose from "mongoose";
const pickupAddressSchema = new mongoose.Schema({
    locality: {
      type: String,
      required: true,
    },
    landmark:{
       type:String,
       required:false
    },
    pincode: {
      type: String,
      required: true,
    },
    city:{
        type:String,
        required:true
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  });

  
  const shippingAddressSchema = new mongoose.Schema({
    locality: {
      type: String,
      required: true,
    },
    landmark:{
       type:String,
       required:false
    },
    pincode: {
      type: String,
      required: true,
    },
    city:{
        type:String,
        required:true
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  });

  const orderDetailSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  });


  const packageDetailSchema = new mongoose.Schema({
    deadWeight: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    breadth: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: false,
    unique: false,
  },

  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },

  shippingAddress: {
    type: shippingAddressSchema,
    required: false,
  },
  pickupAddress: {
    type: pickupAddressSchema, // Embed the pickup address schema 
    required: false,
  },
  
  
  orderDetails: [orderDetailSchema],

  packageDetails: {
    type: packageDetailSchema,
    required: false,
  },

  // Order status
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],   
    default: "Pending",
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.virtual("totalPrice").get(function () {
    // Calculate the total price by summing up unit prices in order details
    return this.orderDetails.reduce((total, detail) => total + detail.unitPrice, 0);
  });
  
  // Ensure virtuals are included in JSON output
  orderSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Order", orderSchema);
