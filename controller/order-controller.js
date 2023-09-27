import express from "express";
import Order from "../model/order.js";

export const createOrder = async (req, res, next) => {
  const { customerName, customerEmail, shippingAddress } = req.body;

  try {
    const newOrder = new Order({
      customerName,
      customerEmail,
      shippingAddress,
    });

    await newOrder.save();

    return res.status(201).json({ order: newOrder });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Order creation failed. Please try again." });
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json( orders );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching orders." });
  }
};
export const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching order by ID" });
  }
};


export const updateOrder = async (req, res, next) => {
  const {
    customerName,
    customerEmail,
    shippingAddress,
    orderDetails,
    packageDetails,
    pickupAddress,
  } = req.body;
  const orderId = req.params.id;
  let newOrders;

  try {
    newOrders = await Order.findByIdAndUpdate(orderId, {
      customerName,
      customerEmail,
      shippingAddress,
      orderDetails,
      packageDetails,
      pickupAddress,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!newOrders) {
    return res.status(500).json({ message: "Unable to update the blog!" });
  }
  return res.status(200).json(newOrders );
};
