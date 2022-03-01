const mongoose = require("mongoose");
const User = mongoose.Schema;

//information for a new user/admin trying to use the train app
const UserSchema = new User(
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
      default: "User",
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;

// User.create = async (newUser) => {
//     let insert = await sql.query("INSERT INTO user SET ?", newUser);
//     if( insert.insertId ) {
//         return insert.insertId;
//     }
//     else {
//         return;
//     }
// };
