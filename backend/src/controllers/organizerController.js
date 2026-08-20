const Event = require("../models/Event");
const Booking = require("../models/Booking");

// Create Event
// POST /api/organizer/events

const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            image,
            location,
            date,
            price,
            capacity,
            status
        } = req.body;

        const newEvent = await Event.create({
            title,
            description,
            image,
            location,
            date,
            price,
            capacity,
            organizerId: req.user._id,

            status: status || "active"
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });

    } catch (error) {
        console.error("Create event error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message
        });
    }
};

// Get Organizer's Events
// GET /api/organizer/events

const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({
            organizerId: req.user._id
        }).sort({
            createdAt: -1
        });

        const enrichedEvents = await Promise.all(
            events.map(async (event) => {

                const bookedTickets = await Booking.countDocuments({
                    eventId: event._id,
                    status: "confirmed"
                });

                const availableTickets = Math.max(
                    0,
                    event.capacity - bookedTickets
                );

                return {
                    ...event.toObject(),

                    ticketStats: {
                        capacity: event.capacity,
                        bookedTickets,
                        availableTickets,
                        isSoldOut: availableTickets === 0
                    }
                };
            })
        );

        return res.status(200).json({
            success: true,
            count: enrichedEvents.length,
            data: enrichedEvents
        });

    } catch (error) {
        console.error("Get organizer events error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch organizer events",
            error: error.message
        });
    }
};

// Update Event
// PUT /api/organizer/events/:id

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        // Only the owner can update the event
        if (
            event.organizerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Unauthorized: You can only update your own events"
            });
        }

        // Only allow safe fields to be updated
        const allowedFields = [
            "title",
            "description",
            "image",
            "location",
            "date",
            "price",
            "capacity",
            "status"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                $set: updates
            },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (error) {
        console.error("Update event error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: error.message
        });
    }
};

// Delete Event
// DELETE /api/organizer/events/:id

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Only the owner can delete the event
        if (
            event.organizerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Unauthorized: You can only delete your own events"
            });
        }

        await Event.findByIdAndDelete(eventId);

        // Cancel all related bookings
        await Booking.updateMany(
            {
                eventId
            },
            {
                $set: {
                    status: "cancelled"
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error("Delete event error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: error.message
        });
    }
};

// Change Event Status
// PATCH /api/organizer/events/:id/status

const changeEventStatus = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { status } = req.body;

        const allowedStatuses = [
            "active",
            "draft",
            "cancelled",
            "completed"
        ];

        if (
            !status ||
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Only the owner can change the status
        if (
            event.organizerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Unauthorized: You can only change status of your own events"
            });
        }

        event.status = status;

        await event.save();

        return res.status(200).json({
            success: true,
            message:
                `Event status updated to '${status}' successfully`,
            data: event
        });

    } catch (error) {
        console.error("Change event status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to change event status",
            error: error.message
        });
    }
};

// Get Event Bookings
// GET /api/organizer/events/:id/bookings

const getEventBookings = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Only the owner can view bookings
        if (
            event.organizerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Unauthorized: You can only view bookings for your own events"
            });
        }

        const bookings = await Booking.find({
            eventId
        })
            .populate(
                "userId",
                "fullName email accountType"
            )
            .populate(
                "eventId",
                "title date location price"
            )
            .sort({
                bookingDate: -1
            });

        const totalBookings = bookings.length;

        const confirmedCount = bookings.filter(
            (booking) =>
                booking.status === "confirmed"
        ).length;

        return res.status(200).json({
            success: true,

            eventTitle: event.title,

            summary: {
                totalBookings,
                confirmedCount,
                capacity: event.capacity,
                availableTickets: Math.max(
                    0,
                    event.capacity - confirmedCount
                )
            },

            data: bookings
        });

    } catch (error) {
        console.error("Get event bookings error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch event bookings",
            error: error.message
        });
    }
};

// Get Event Ticket Stats
// GET /api/organizer/events/:id/stats

const getEventTicketStats = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Only the owner can view statistics
        if (
            event.organizerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Unauthorized access to event stats"
            });
        }

        const bookedCount =
            await Booking.countDocuments({
                eventId,
                status: "confirmed"
            });

        const pendingCount =
            await Booking.countDocuments({
                eventId,
                status: "pending"
            });

        const cancelledCount =
            await Booking.countDocuments({
                eventId,
                status: "cancelled"
            });

        const availableTickets = Math.max(
            0,
            event.capacity - bookedCount
        );

        const occupancyPercentage =
            event.capacity > 0
                ? (
                      (bookedCount /
                          event.capacity) *
                      100
                  ).toFixed(2)
                : "0.00";

        const totalRevenue =
            bookedCount * event.price;

        return res.status(200).json({
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

                occupancyPercentage:
                    `${occupancyPercentage}%`,

                ticketPrice: event.price,

                estimatedRevenue: totalRevenue
            }
        });

    } catch (error) {
        console.error(
            "Get event ticket stats error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to calculate ticket stats"
        });
    }
};

// Exports

module.exports = {
    createEvent,
    getMyEvents,
    updateEvent,
    deleteEvent,
    changeEventStatus,
    getEventBookings,
    getEventTicketStats
};