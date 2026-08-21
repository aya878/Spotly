const express = require("express");

const {
    registerUser,
   loginUser,
    getProfile,
    updateProfile
} = require("../controllers/authController");


const {
    protect
} = require("../middleware/authMiddleware");


const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
// get profile
router.get("/profile", protect, getProfile);
// update profile
router.put("/profile", protect, updateProfile);

module.exports = router;