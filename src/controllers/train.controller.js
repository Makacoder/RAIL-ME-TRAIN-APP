const bookATrain = require("../models/Train.model");
//registration of Commuters
exports.trainTicket = async (req, res, next) => {
  try {
    const { fullName, address, destination, reservation, time, date } =
      req.body;
    if (!fullName || !address || !destination || !reservation || !time || !date)
      return res.status(400).json({
        message: "please fill the required fields",
      });

    const ticket = await bookATrain.create({
      fullName,
      address,
      destination,
      reservation,
      time,
      date,
    });
    return res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// editing Commuters information

exports.updateTrainTime = async (req, res, next) => {
  try {
    const { time } = req.body;
    if (!req.body.time) {
      return res.status(401).json({
        success: false,
        message: "only train time can be updated",
      });
    }
    const { _id } = req.params;

    const updateTrainTime = await bookATrain.findOneAndUpdate(
      { _id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      updateTrainTime,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deleting Commuters information
exports.deleteBooking = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleteBooking = await bookATrain.findOneAndDelete({ _id });
    return res.status(200).json({
      message: `This booking has been cancelled`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.totalBookings = async (req, res, next) => {
  try {
    const totalBooking = await bookATrain.find();

    return res.status(200).json({
      success: true,
      totalBooking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//checking the number of bookings done
exports.countBookings = async (req, res, next) => {
  try {
    const bookings = await bookATrain.countDocuments();
    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
