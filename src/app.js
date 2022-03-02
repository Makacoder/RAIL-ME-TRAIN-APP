const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routes/user.route");
const ticketRouter = require("./routes/train.route");
const AdminRouter = require("./routes/admin.route");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

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

app.get("/", (req, res) => {
  res.send({
    message: "You're a Badass Hacker",
  });
});

app.use("/api/v1", UserRouter);
app.use("/api/v1", ticketRouter);
app.use("/api/v1", AdminRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
