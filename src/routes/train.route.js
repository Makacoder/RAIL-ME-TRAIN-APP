const express = require("express");
const ticket = require("../controllers/train.controller");
const router = express.Router();
const { authorize, isAdmin } = require("../middleware/auth.middleware");

//Admin auth with jwt
router.post("/booking", authorize, ticket.trainTicket);
router.patch("/updateTrainTime/:_id", authorize, ticket.updateTrainTime);
router.delete("/deleteBooking/:_id", authorize, ticket.deleteBooking);
router.get("/countBooking", authorize, isAdmin, ticket.countBookings);

module.exports = router;
