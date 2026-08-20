const Event = require("../models/Event");
const Booking = require("../models/Booking");

/**
 * 1. Create Event
 * POST /api/organizer/events
 */
const createEvent = async (req, res) => {
  try {
    const { title, description, image, location, date, price, capacity, status } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      image,
      location,
      date,
      price,
      capacity,
      organizerId: req.user._id,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

/**
 * 2. Get ONLY Organizer's Events with live ticket counts
 * GET /api/organizer/events
 */
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user._id }).sort({ createdAt: -1 });

    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const bookedTickets = await Booking.countDocuments({
          eventId: event._id,
          status: "confirmed",
        });

        const availableTickets = Math.max(0, event.capacity - bookedTickets);

        return {
          ...event.toObject(),
          ticketStats: {
            capacity: event.capacity,
            bookedTickets,
            availableTickets,
            isSoldOut: availableTickets === 0,
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enrichedEvents.length,
      data: enrichedEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch organizer events",
      error: error.message,
    });
  }
};

/**
 * 3. Update Event (Only owned events)
 * PUT /api/organizer/events/:id
 */
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only update your own events",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

/**
 * 4. Delete Event (Only owned events)
 * DELETE /api/organizer/events/:id
 */
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own events",
      });
    }

    await Event.findByIdAndDelete(eventId);

    // Cancel related bookings
    await Booking.updateMany(
      { eventId },
      { $set: { status: "cancelled" } }
    );

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

/**
 * 5. Change Event Status
 * PATCH /api/organizer/events/:id/status
 */
const changeEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;

    const allowedStatuses = ["active", "draft", "cancelled", "completed"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only change status of your own events",
      });
    }

    event.status = status;
    await event.save();

    res.status(200).json({
      success: true,
      message: `Event status updated to '${status}' successfully`,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to change event status",
      error: error.message,
    });
  }
};

/**
 * 6. View people who booked tickets in organizer's event
 * GET /api/organizer/events/:id/bookings
 */
const getEventBookings = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only view bookings for your own events",
      });
    }

    const bookings = await Booking.find({ eventId })
      .populate("userId", "name email role")
      .populate("eventId", "title date location price")
      .sort({ bookingDate: -1 });

    const totalBookings = bookings.length;
    const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;

    res.status(200).json({
      success: true,
      eventTitle: event.title,
      summary: {
        totalBookings,
        confirmedCount,
        capacity: event.capacity,
        availableTickets: Math.max(0, event.capacity - confirmedCount),
      },
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event bookings",
      error: error.message,
    });
  }
};

/**
 * 7. Ticket & Capacity Stats Tracking for a specific event
 * GET /api/organizer/events/:id/stats
 */
const getEventTicketStats = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to event stats",
      });
    }

    const bookedCount = await Booking.countDocuments({ eventId, status: "confirmed" });
    const pendingCount = await Booking.countDocuments({ eventId, status: "pending" });
    const cancelledCount = await Booking.countDocuments({ eventId, status: "cancelled" });
    const availableTickets = Math.max(0, event.capacity - bookedCount);
    const occupancyPercentage = ((bookedCount / event.capacity) * 100).toFixed(2);
    const totalRevenue = bookedCount * event.price;

    res.status(200).json({
      success: true,
      data: {
        eventId: event._id,
        eventTitle: event.title,
        status: event.status,
        capacity: event.capacity,
        bookedTickets: bookedCount,
        availableTickets,
        pendingBookings: pendingCount,
        cancelledBookings: cancelledCount,
        occupancyPercentage: `${occupancyPercentage}%`,
        ticketPrice: event.price,
        estimatedRevenue: totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate ticket stats",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
  changeEventStatus,
  getEventBookings,
  getEventTicketStats,
};
