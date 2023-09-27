import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../model/user.js";

export const signup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login instead." });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "shhhhh",
      { expiresIn: "3h" }
    );

    return res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Signup failed. Please try again." });
  }
};

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json( users );
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id; 
  const {
  
    password,
    phone,
    firstName,
    lastName,
    companyId,
    companyName,
    plan,
    subscriptionStatus,
    subscriptionDuration,
    renewalDate,
    tier,
    kamName,
    kamEmail,
    kamPhoneNumber,
  } = req.body;

  try {
    // Find the user by ID
    const userToUpdate = await User.findByIdAndUpdate(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's information
    
    userToUpdate.phone = phone;
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.companyId = companyId;
    userToUpdate.companyName = companyName;
    userToUpdate.plan = plan;
    userToUpdate.subscriptionStatus = subscriptionStatus;
    userToUpdate.subscriptionDuration = subscriptionDuration;
    userToUpdate.renewalDate = renewalDate;
    userToUpdate.tier = tier;
    userToUpdate.kamName = kamName;
    userToUpdate.kamEmail = kamEmail;
    userToUpdate.kamPhoneNumber = kamPhoneNumber;

    // If a new password is provided, hash and update it
    if (password) {
      const hashedPassword = bcrypt.hashSync(password);
      userToUpdate.password = hashedPassword;
    }

    // Save the updated user
    await userToUpdate.save();

    // Generate a new JWT token with updated user information
    const token = jwt.sign(
      { userId: userToUpdate._id, email: userToUpdate.email },
      "shhhhh",
      { expiresIn: "3h" }
    );

    return res.status(200).json({ user: userToUpdate, token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Update failed. Please try again." });
  }
};
