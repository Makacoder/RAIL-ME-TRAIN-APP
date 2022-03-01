const express = require("express");
const User = require("../controllers/user.controller");
const router = express.Router();
const { authorize } = require("../middleware/auth.middleware");

//Commuters sign up path
router.post("/registerUser", User.register);
//Commuters login path
router.post("/loginUser", User.login);

router.get("/registeredUser", authorize, User.registeredUsers);
router.get("/getAllServices", authorize, User.getAllServices);

module.exports = router;
