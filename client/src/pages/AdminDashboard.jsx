import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminBookings from "../components/admin/AdminBookings";
import AdminTables from "../components/admin/AdminTables";

function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch bookings
    const { data: bookings } = await supabase
      .from("bookings")
      .select("*");

    // Fetch users
    const { data: users } = await supabase
      .from("profiles")
      .select("id");

    const totalBookings = bookings?.length || 0;

    const pendingBookings =
      bookings?.filter(
        (booking) =>
          booking.booking_status === "Pending"
      ).length || 0;

    const confirmedBookings =
      bookings?.filter(
        (booking) =>
          booking.booking_status === "Confirmed"
      ).length || 0;

    const cancelledBookings =
      bookings?.filter(
        (booking) =>
          booking.booking_status === "Cancelled"
      ).length || 0;

    const totalRevenue =
      bookings?.reduce(
        (sum, booking) =>
          sum + Number(booking.total_amount),
        0
      ) || 0;

    setStats({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalUsers: users?.length || 0,
      totalRevenue,
    });
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">

      <AdminSidebar
        active={active}
        setActive={setActive}
      />

      <div className="flex-1">

        <AdminNavbar />

        <main className="p-8">

          {active === "dashboard" && (

            <>
              <h2 className="text-3xl font-bold text-white mb-8">
                Dashboard Overview
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Total Bookings
                  </h3>

                  <p className="text-5xl text-white font-bold mt-4">
                    {stats.totalBookings}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Pending Bookings
                  </h3>

                  <p className="text-5xl text-yellow-400 font-bold mt-4">
                    {stats.pendingBookings}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Confirmed Bookings
                  </h3>

                  <p className="text-5xl text-green-400 font-bold mt-4">
                    {stats.confirmedBookings}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Cancelled Bookings
                  </h3>

                  <p className="text-5xl text-red-400 font-bold mt-4">
                    {stats.cancelledBookings}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Registered Users
                  </h3>

                  <p className="text-5xl text-blue-400 font-bold mt-4">
                    {stats.totalUsers}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-slate-400">
                    Total Revenue
                  </h3>

                  <p className="text-5xl text-green-500 font-bold mt-4">
                    Rs. {stats.totalRevenue}
                  </p>
                </div>

              </div>

            </>

          )}

          {active === "bookings" && (
            <AdminBookings />
          )}

          {active === "tables" && (
            <AdminTables />
          )}

          {active === "users" && (
            <div className="bg-slate-800 rounded-2xl p-12 border border-slate-700 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Manage Users
              </h2>

              <p className="text-slate-400">
                Coming in the next step...
              </p>
            </div>
          )}

          {active === "revenue" && (
            <div className="bg-slate-800 rounded-2xl p-12 border border-slate-700 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Revenue Analytics
              </h2>

              <p className="text-slate-400">
                Coming in the next step...
              </p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;
