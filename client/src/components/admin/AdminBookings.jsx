import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        tables (
          table_name,
          table_type
        )
      `)
      .order("booking_date", { ascending: true });

    if (error) {
      console.error("Bookings Error:", error);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setBookings(data);
    setLoading(false);
  };

  const updateBookingStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({
        booking_status: status,
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Booking ${status}`);
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Booking deleted");
    fetchBookings();
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading bookings...
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-3xl font-bold text-white mb-8">
        Manage Bookings
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-700">

        <table className="min-w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left text-white">
                Table
              </th>

              <th className="px-6 py-4 text-left text-white">
                Date
              </th>

              <th className="px-6 py-4 text-left text-white">
                Time
              </th>

              <th className="px-6 py-4 text-left text-white">
                Hours
              </th>

              <th className="px-6 py-4 text-left text-white">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-white">
                Status
              </th>

              <th className="px-6 py-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t border-slate-700 bg-slate-900"
              >

                <td className="px-6 py-4 text-white">
                  {booking.tables?.table_name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {booking.booking_date}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {booking.start_time}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {booking.duration_hours}
                </td>

                <td className="px-6 py-4 text-green-400 font-semibold">
                  Rs.{booking.total_amount}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        booking.booking_status === "Confirmed"
                          ? "bg-green-600 text-white"
                          : booking.booking_status === "Cancelled"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                  >
                    {booking.booking_status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Confirmed"
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Cancelled"
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() =>
                        deleteBooking(booking.id)
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminBookings;