const express = require("express");

const router = express.Router();

const {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,

  getAllUsers,
  updateUserRole,
  deleteUser,

  getDashboardStats,
  getRevenueAnalytics,

} = require("../controllers/adminController");

// Test Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Admin API Working",
  });
});

router.get(
  "/dashboard",
  getDashboardStats
);

router.get(
  "/revenue",
  getRevenueAnalytics
);

// Booking Routes
router.get("/bookings", getAllBookings);

router.patch(
  "/bookings/:id",
  updateBookingStatus
);

router.delete(
  "/bookings/:id",
  deleteBooking
);

// =======================
// User Routes
// =======================

router.get(
  "/users",
  getAllUsers
);

router.patch(
  "/users/:id",
  updateUserRole
);

router.delete(
  "/users/:id",
  deleteUser
);

module.exports = router;