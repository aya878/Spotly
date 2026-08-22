const express = require("express");

const {
    getUsers,
    deleteUser,
    getEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/adminController");

const {
    protect,
    isAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


// Admin Authentication

router.use(protect);
router.use(isAdmin);

// Users

router.get("/users", getUsers);

router.delete("/users/:id", deleteUser);

// Events

router.get("/events", getEvents);

router.put("/events/:id", updateEvent);

router.delete("/events/:id", deleteEvent);


module.exports = router;
