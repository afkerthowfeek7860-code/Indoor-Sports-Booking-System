import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";
import { toast } from "react-toastify";

function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);

    // Get logged in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("Please login first.");
      navigate("/");
      return;
    }

    setUser(user);

    // Get all bookings of the logged in user
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        tables (
          table_name,
          table_type
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Unable to load bookings.");
      setLoading(false);
      return;
    }

    setBookings(data);
    setLoading(false);
  };

  // Statistics
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.booking_status === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.booking_status === "Confirmed"
  ).length;

  if (loading) {
    return (
      <>
        <Navbar
          user={user}
          openRegister={() => {}}
          openLogin={() => {}}
        />

        <section className="min-h-screen bg-slate-900 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-white">
            Loading Dashboard...
          </h1>
        </section>
      </>
    );
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

      return (
    <>
      <Navbar
        user={user}
        openRegister={() => {}}
        openLogin={() => {}}
      />

      <section className="min-h-screen bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white">
              Welcome Back,
            </h1>

            <h2 className="text-3xl font-semibold text-blue-400 mt-2">
              {displayName}
            </h2>

            <p className="text-slate-400 mt-3">
              Manage all your reservations in one place.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
              <h3 className="text-slate-400 text-lg">
                Total Bookings
              </h3>

              <p className="text-5xl font-bold text-white mt-3">
                {totalBookings}
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
              <h3 className="text-slate-400 text-lg">
                Pending
              </h3>

              <p className="text-5xl font-bold text-yellow-400 mt-3">
                {pendingBookings}
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
              <h3 className="text-slate-400 text-lg">
                Confirmed
              </h3>

              <p className="text-5xl font-bold text-green-400 mt-3">
                {confirmedBookings}
              </p>
            </div>

          </div>

          {/* Booking List */}

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
              My Bookings
            </h2>

            {bookings.length === 0 ? (

              <div className="text-center py-20">

                <h3 className="text-2xl font-bold text-white mb-4">
                  No Bookings Yet
                </h3>

                <p className="text-slate-400 mb-8">
                  Reserve your first table and it will appear here.
                </p>

                <button
                  onClick={() => navigate("/booking")}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold transition"
                >
                  Book Now
                </button>

              </div>

            ) : (

              <div className="space-y-6">

                {bookings.map((booking) => (

                  <div
                    key={booking.id}
                    className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                      <div>

                        <h3 className="text-2xl font-bold text-white mb-4">
                          {booking.tables?.table_name}
                        </h3>

                        <div className="space-y-2 text-slate-300">

                          <p>
                            📅 Date :
                            <span className="ml-2 text-white">
                              {booking.booking_date}
                            </span>
                          </p>

                          <p>
                            🕒 Start Time :
                            <span className="ml-2 text-white">
                              {booking.start_time}
                            </span>
                          </p>

                          <p>
                            ⏳ Duration :
                            <span className="ml-2 text-white">
                              {booking.duration_hours} Hour(s)
                            </span>
                          </p>

                          <p>
                            💰 Total :
                            <span className="ml-2 text-green-400 font-bold">
                              Rs.{booking.total_amount}
                            </span>
                          </p>

                        </div>

                      </div>

                      <div className="text-center">

                        <h4 className="text-slate-400 mb-3">
                          Status
                        </h4>

                        <span
                          className={`px-5 py-2 rounded-full font-semibold ${
                            booking.booking_status === "Confirmed"
                              ? "bg-green-600 text-white"
                              : booking.booking_status === "Cancelled"
                              ? "bg-red-600 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {booking.booking_status}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>
      </section>
    </>
  );
}

export default UserDashboard;
