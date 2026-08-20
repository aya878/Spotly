const express = require("express");

const {
    createEvent,
    getMyEvents,
    updateEvent,
    deleteEvent,
    changeEventStatus,
    getEventBookings,
    getEventTicketStats
} = require("../controllers/organizerController");

const {
    protect,
    isOrganizer
} = require("../middleware/authMiddleware");

const router = express.Router();

// Organizer Authentication

router.use(protect);
router.use(isOrganizer);

// Event Options

router.post("/events", createEvent);

router.get("/events", getMyEvents);

router.put("/events/:id", updateEvent);

router.delete("/events/:id", deleteEvent);

// Event Status

router.patch(
    "/events/:id/status",
    changeEventStatus
);

// Bookings & Statistics

router.get(
    "/events/:id/bookings",
    getEventBookings
);

router.get(
    "/events/:id/stats",
    getEventTicketStats
);

module.exports = router;