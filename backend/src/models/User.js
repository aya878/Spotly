const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name must not exceed 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },

    accountType: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user"
    },

    phone: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    avatar: {
      type: String,
      default: "user-avatar.png"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);