const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Reservation = require("../models/reservation.model");
require("dotenv").config();

const { rail_Token } = process.env;
// Register an Admin
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
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      return res.status(401).json({
        message: "email already exists,Please login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    const payload = {
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
    };
    const token = await jwt.sign(payload, process.env.rail_Token, {
      expiresIn: "2h",
    });

    await newAdmin.save();
    return res.status(201).json({
      newAdmin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
//Admin sign in
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
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
//Admin check on all commuters on the platform
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.find();
    return res.status(200).json({
      allUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//uploading new reservations for commuters to book
exports.uploadReservation = async (req, res, next) => {
  try {
    const { destination, reservation, time, date } = req.body;
    if (!destination || !reservation || !time || !date)
      return res.status(400).json({
        message: "please fill the required fields",
      });

    const uploads = new Reservation({
      destination,
      reservation,
      time,
      date,
    });
    return res.status(201).json({
      uploads,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
