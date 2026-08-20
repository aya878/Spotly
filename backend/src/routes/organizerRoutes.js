const express = require("express");
const {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
  changeEventStatus,
  getEventBookings,
  getEventTicketStats,
} = require("../controllers/organizerController");
const { protect, isOrganizer } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply auth middleware to all organizer routes
router.use(protect);
router.use(isOrganizer);

// Event CRUD
router.post("/events", createEvent);
router.get("/events", getMyEvents);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Status update
router.patch("/events/:id/status", changeEventStatus);

// Attendees & ticket tracking stats
router.get("/events/:id/bookings", getEventBookings);
router.get("/events/:id/stats", getEventTicketStats);

module.exports = router;
