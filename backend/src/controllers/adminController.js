const User = require("../models/User");
const Event = require("../models/Event");

// Get All Users
// GET /api/admin/users

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 }); //descendingly

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};


// Delete User
// DELETE /api/admin/users/:id

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Preventing admin from accidentatly deleting himself
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot delete their own account"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};


// Get All Events
// GET /api/admin/events

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("organizerId", "fullName email accountType")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch events",
            error: error.message
        });
    }
};


// Update Any Event
// PUT /api/admin/events/:id

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

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: error.message
        });
    }
};


// Delete Any Event
// DELETE /api/admin/events/:id

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

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: error.message
        });
    }
};


module.exports = {
    getUsers,
    deleteUser,
    getEvents,
    updateEvent,
    deleteEvent
};
