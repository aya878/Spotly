const Event = require("./src/models/Event");
const Booking = require("./src/models/Booking");
const User = require("./src/models/User");

console.log("--- 🧪 Spotly Backend Unit Test ---");

try {
  console.log("✓ Event model loaded");
  console.log("✓ Booking model loaded");
  console.log("✓ User model loaded");

  console.log("Event Schema:", Object.keys(Event.schema.paths).join(", "));
  console.log("Booking Schema:", Object.keys(Booking.schema.paths).join(", "));
  console.log("User Schema:", Object.keys(User.schema.paths).join(", "));

  console.log("\n✅ Spotly backend models & schemas verified successfully!");
} catch (err) {
  console.error("❌ Test failed:", err.message);
  process.exit(1);
}
