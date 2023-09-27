import express from "express";
import _return from "../model/return.js";

export const createReturn = async (req, res, next) => {
  const { customerName, customerEmail, shippingAddress } = req.body;

  try {
    const newReturn = new _return({
      customerName,
      customerEmail,
      shippingAddress,
    });

    await newReturn.save();

    return res.status(201).json(newReturn);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Order creation failed. Please try again." });
  }
};

export const getAllReturn = async (req, res, next) => {
  try {
    const newreturn = await _return.find();
    return res.status(200).json(newreturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching orders." });
  }
};

export const getReturnById = async (req, res, next) => {
  const returnId = req.params.id;

  try {
    const newreturn = await _return.findById(returnId);

    if (!newreturn) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(newreturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching order by ID" });
  }
};

export const deleteReturn = async (req, res, next) => {
  const returnId = req.params.id;
  console.log("====>>>>",returnId)
  try {
    const newreturn = await _return.findByIdAndRemove(returnId);

    if (!newreturn) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching order by ID" });
  }
};

export const updateReturn = async (req, res, next) => {
  const {
    customerName,
    customerEmail,
    shippingAddress,
    orderDetails,
    packageDetails,
    warehouseAddress,
  } = req.body;
  const returnId = req.params.id;
  let newReturn;

  try {
    newReturn = await _return.findByIdAndUpdate(returnId, {
      customerName,
      customerEmail,
      shippingAddress,
      orderDetails,
      packageDetails,
      warehouseAddress,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!newReturn) {
    return res.status(500).json({ message: "Unable to update the blog!" });
  }
  return res.status(200).json(newReturn);
};
