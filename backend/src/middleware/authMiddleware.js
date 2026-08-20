const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Protect Route

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // JWT contains userId
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach authenticated user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
// Organizer Authorization

const isOrganizer = (req, res, next) => {

    if (
        req.user &&
        (
            req.user.accountType === "organizer" ||
            req.user.accountType === "admin"
        )
    ) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Access denied: Organizer role required"
    });
};

// Admin Authorization

const isAdmin = (req, res, next) => {

    if (
        req.user &&
        req.user.accountType === "admin"
    ) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Access denied: Admin role required"
    });
};

module.exports = {
    protect,
    isOrganizer,
    isAdmin,
    JWT_SECRET
};