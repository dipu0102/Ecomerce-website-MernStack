import { token } from "morgan";
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import bcrypt from "bcrypt";
//@desc Register a new user
//@router /api/users
//@access public

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  const userExits = await User.findOne({ email });
  console.log(userExits);
  if (userExits) {
    // return res.status(400).json({ message: "User Already Exists" });
    throw new Error("User Already Exists");
  }
  var hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    // res.status(400).json({ message: "Invalid User Data" });
    throw new Error("Invalid User Data");
  }
});

//@desc Register a new user
//@router /api/users
//@access public

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //First we find if the user exist
  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.comparePassword(password, user.password))) {
    console.log("inside exits");
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid Email or Password");
  }
});

//@desc get a new user profile
//@router /api/profile
//@access private

export const profile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;

  //First we find if the user exist
  const user = await User.findById(_id);
  console.log(user);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    });
  } else {
    throw new Error("User Not Found");
  }
});

//@desc update a  user profile
//@router /api/profile
//@access private

export const updateProfile = expressAsyncHandler(async (req, res) => {
  console.log(req.body);

  //First we find if the user exist
  const user = await User.findById(req.user);
  console.log(user);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
  }
  const updateUser = await user.save();
  console.log(updateUser);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
      address: user.address,
    });
  } else {
    throw new Error("User Not Found");
  }
});

//@desc gett All user profile
//@router /api/profile
//@access private

export const getAllProfile = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  console.log(users);

  if (users) {
    res.json(users);
  } else {
    throw new Error("User Not Found");
  }
});

//@desc delete a user profile
//@router /api/profile
//@access private

export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findOneAndDelete(req.params.id);
    console.log(users);
    res.json({
      message: "User removed",
    });
  } catch (error) {
    throw new Error("User Not Found");
  }
});
