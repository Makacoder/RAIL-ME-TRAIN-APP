const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Services = require("../models/reservation.model");
require("dotenv").config();
const { rail_Token } = process.env;
// New commuters sign up on the platform
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } =
      req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "kindly fill the required field",
      });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(401).json({
        success: false,
        message: "email already exists,Please login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwt.sign(payload, process.env.rail_Token, {
      expiresIn: "2h",
    });

    await newUser.save();
    return res.status(201).json({
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//Commuters logging in for the first time
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        success: false,
        message: "Email doens't exist, please create account",
      });
    }
    const isPasswordExist = await bcrypt.compare(password, emailExist.password);
    console.log(isPasswordExist);
    if (!isPasswordExist) {
      return res.status(401).json({
        success: false,
        message: "password does not exist",
      });
    }
    const data = {
      id: emailExist.id,
      email: emailExist.email,
      role: emailExist.role,
    };
    const token = await jwt.sign(data, rail_Token, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      message: "login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//viewing commuters on the platform
exports.registeredUsers = async (req, res, next) => {
  try {
    const registeredUser = await User.find();

    return res.status(200).json({
      success: true,
      registeredUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Commuters can see all services on the platform
exports.getAllServices = async (req, res, next) => {
  try {
    const allServices = await Services.find();
    return res.status(200).json({
      allServices,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
