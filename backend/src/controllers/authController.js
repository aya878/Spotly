const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            accountType: user.accountType
        },
        JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};
// Register User

const registerUser = async (req, res) => {

    console.log("🔥 REGISTER ROUTE HIT");
    console.log("BODY:", req.body);

    try {

        const {
            fullName,
            email,
            password,
            confirmPassword,
            accountType
        } = req.body;

        // Required Fields
        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword ||
            !accountType
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // Full Name Validation

        const trimmedFullName = fullName.trim();

        if (trimmedFullName.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Full name must be at least 3 characters"
            });
        }

        if (trimmedFullName.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Full name must not exceed 50 characters"
            });
        }

        // Email Validation

        const normalizedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        // Password Validation

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        if (password.length > 64) {
            return res.status(400).json({
                success: false,
                message: "Password must not exceed 64 characters"
            });
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

        if (
            !hasUppercase ||
            !hasLowercase ||
            !hasNumber ||
            !hasSpecialCharacter
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain uppercase, lowercase, number and special character"
            });
        }

        // Confirm Password

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Account Type Validation
        // Admin cannot be created through public registration it will be created using createAdmin.js file
        if (!["user", "organizer"].includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type"
            });
        }

        // Check Existing Email

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User

        const user = await User.create({
            fullName: trimmedFullName,
            email: normalizedEmail,
            password: hashedPassword,
            accountType
        });

        // Response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                accountType: user.accountType
            }
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Required Fields

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Normalize Email
        const normalizedEmail = email.trim().toLowerCase();

        // Find User

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare Password

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT

        const token = generateToken(user);

        // Response

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                accountType: user.accountType
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get Current User Profile

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// UPDATE PROFILE


const updateProfile = async (req, res) => {

    try {

        const {
            fullName,
            phone,
            city
        } = req.body;

        if (!fullName || fullName.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "Full name must be at least 3 characters"
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.fullName = fullName.trim();
        user.phone = phone ? phone.trim() : "";
        user.city = city ? city.trim() : "";

        await user.save();

        const updatedUser =
            await User.findById(req.user._id)
                .select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {

        console.error("UPDATE PROFILE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    generateToken,
    getProfile,
    updateProfile
};