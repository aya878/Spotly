const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const adminEmail = "admin@spotly.com";
        const adminPassword = "Admin@123";

        const existingAdmin = await User.findOne({
            email: adminEmail
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            adminPassword,
            10
        );

        const admin = await User.create({
            fullName: "Spotly Admin",
            email: adminEmail,
            password: hashedPassword,
            accountType: "admin"
        });

        console.log("Admin created successfully");
        console.log("Email:", admin.email);
        console.log("Account Type:", admin.accountType);

        process.exit(0);

    } catch (error) {
        console.error("Failed to create admin:");
        console.error(error.message);

        process.exit(1);
    }
};

createAdmin();