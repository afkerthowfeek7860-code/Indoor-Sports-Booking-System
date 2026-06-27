const supabase = require("../services/supabaseAdmin");

// ===============================
// Get All Bookings
// ===============================
const getAllBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        tables!bookings_table_id_fkey (
          table_name,
          table_type
        ),
        profiles!bookings_user_id_fkey (
          full_name,
          role
        )
      `)
      .order("booking_date", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Update Booking Status
// ===============================
const updateBookingStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .update({
        booking_status: status,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

// ===============================
// Delete Booking
// ===============================
const deleteBooking = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

// ===============================
// Get All Users
// ===============================
const getAllUsers = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json(error);
    }

    const { data: authUsers, error: authError } =
      await supabase.auth.admin.listUsers();

    if (authError) {
      return res.status(400).json(authError);
    }

    const users = data.map((profile) => {

    const authUser = authUsers.users.find(
      (user) => user.id === profile.id
    );

    return {
      ...profile,
      email: authUser?.email || "-",
    };

  });

  res.json(users);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

// ===============================
// Update User Role
// ===============================
const updateUserRole = async (req, res) => {

  try {

    const { id } = req.params;
    const { role } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        role,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      success: true,
      message: "Role updated successfully",
      data,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

// ===============================
// Delete User
// ===============================
const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = async (req, res) => {
  try {

    const { data: bookings, error: bookingError } =
      await supabase
        .from("bookings")
        .select("*");

    if (bookingError) {
      return res.status(400).json(bookingError);
    }

    const { data: users, error: userError } =
      await supabase
        .from("profiles")
        .select("*");

    if (userError) {
      return res.status(400).json(userError);
    }

    const stats = {
      totalBookings: bookings.length,

      pendingBookings: bookings.filter(
        (booking) => booking.booking_status === "Pending"
      ).length,

      confirmedBookings: bookings.filter(
        (booking) => booking.booking_status === "Confirmed"
      ).length,

      cancelledBookings: bookings.filter(
        (booking) => booking.booking_status === "Cancelled"
      ).length,

      totalUsers: users.length,

      totalRevenue: bookings.reduce(
        (sum, booking) =>
          sum + Number(booking.total_amount),
        0
      ),
    };

    res.json(stats);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

  // ===============================
// Revenue Analytics
// ===============================
const getRevenueAnalytics = async (req, res) => {

  try {

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(`
        *,
        tables!bookings_table_id_fkey(
          table_name
        ),
        profiles!bookings_user_id_fkey(
          full_name
        )
      `);

    if (error) {
      return res.status(400).json(error);
    }

    const today = new Date();

    const todayString = today
      .toISOString()
      .split("T")[0];

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // -----------------------
    // Revenue Statistics
    // -----------------------

    const totalRevenue = bookings.reduce(
      (sum, booking) =>
        sum + Number(booking.total_amount),
      0
    );

    const todayRevenue = bookings
      .filter(
        (booking) =>
          booking.booking_date === todayString
      )
      .reduce(
        (sum, booking) =>
          sum + Number(booking.total_amount),
        0
      );

    const monthRevenue = bookings
      .filter((booking) => {

        const date = new Date(
          booking.booking_date
        );

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );

      })
      .reduce(
        (sum, booking) =>
          sum + Number(booking.total_amount),
        0
      );

    const averageBooking =
      bookings.length > 0
        ? Math.round(
            totalRevenue / bookings.length
          )
        : 0;

    // -----------------------
    // Booking Status
    // -----------------------

    const confirmed =
      bookings.filter(
        (booking) =>
          booking.booking_status ===
          "Confirmed"
      ).length;

    const pending =
      bookings.filter(
        (booking) =>
          booking.booking_status ===
          "Pending"
      ).length;

    const cancelled =
      bookings.filter(
        (booking) =>
          booking.booking_status ===
          "Cancelled"
      ).length;

    res.json({
      totalRevenue,
      todayRevenue,
      monthRevenue,
      averageBooking,

      confirmed,
      pending,
      cancelled,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

module.exports = {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,

  getAllUsers,
  updateUserRole,
  deleteUser,

  getDashboardStats,
  getRevenueAnalytics,
};