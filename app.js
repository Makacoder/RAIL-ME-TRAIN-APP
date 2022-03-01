const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./src/routes/user.route");
const ticketRouter = require("./src/routes/train.route");
const AdminRouter = require("./src/routes/admin.route");

require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATA_URI,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Magnificent! You are in! Start hacking!");
  } catch (error) {
    console.log(error);
    console.log("Not connected");
  }
};

connectDB();

app.use("/api/v1", UserRouter);
app.use("/api/v1", ticketRouter);
app.use("/api/v1", AdminRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
