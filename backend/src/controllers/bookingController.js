const Booking = require("../models/Booking");
const Event = require("../models/Event");

const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.status !== "active") {
      return res.status(400).json({ success: false, message: "Cannot book: Event is not active" });
    }

    const confirmedBookings = await Booking.countDocuments({ eventId, status: "confirmed" });
    if (confirmedBookings >= event.capacity) {
      return res.status(400).json({ success: false, message: "Event is fully booked / sold out" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      status: "confirmed",
      bookingDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking };
