const mongoose = require("mongoose");
const Admin = mongoose.Schema;

//information for a new user/admin trying to use the train app
const adminSchema = new Admin(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);
const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
