import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";
import { toast } from "react-toastify";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <>
        <Navbar
          openRegister={() => {}}
          openLogin={() => {}}
        />

        <section className="min-h-screen bg-slate-900 flex justify-center items-center">
          <div className="bg-slate-800 p-10 rounded-2xl text-center">

            <h2 className="text-3xl font-bold text-white mb-4">
              No Booking Found
            </h2>

            <button
              onClick={() => navigate("/booking")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Booking
            </button>

          </div>
        </section>
      </>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Booking Data:", booking);

    if (
      !cardName ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      toast.error("Please complete all payment fields.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login first.");
      navigate("/");
      return;
    }

    const { data: tableData, error: tableError } =
      await supabase
        .from("tables")
        .select("id")
        .eq("table_type", booking.tableType === "green" ? "Green" : "Blue")
        .single();

    console.log("Table Data:", tableData);
    console.log("Table Error:", tableError);

    if (tableError) {
      console.error(tableError);

      toast.error("Unable to find selected table.");

      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        table_id: tableData.id,
        booking_date: booking.bookingDate,
        start_time: booking.startTime,
        duration_hours: booking.hours,
        total_amount: booking.totalAmount,
        booking_status: "Pending",
      });
    
      if (error) {
      console.error("Booking Insert Error:", error);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Booking Successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);

    setLoading(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar
          openRegister={() => {}}
          openLogin={() => {}}
        />
      </div>

      <section className="min-h-screen bg-slate-900 py-20 px-6">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* Booking Summary */}

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
              Booking Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between text-slate-300">
                <span>Table</span>

                <span className="font-semibold text-white">
                  {booking.tableName}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Date</span>

                <span className="font-semibold text-white">
                  {booking.bookingDate}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Start Time</span>

                <span className="font-semibold text-white">
                  {booking.startTime}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Hours</span>

                <span className="font-semibold text-white">
                  {booking.hours}
                </span>
              </div>

              <div className="border-t border-slate-700 pt-5 flex justify-between">

                <span className="text-xl text-white">
                  Total
                </span>

                <span className="text-3xl font-bold text-green-500">
                  Rs.{booking.totalAmount}
                </span>

              </div>

            </div>

          </div>

          {/* Payment Form */}

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              Card Payment
            </h1>

            <form
              onSubmit={handlePayment}
              className="space-y-5"
            >
                            <div>
                <label className="text-white block mb-2">
                  Cardholder Name
                </label>

                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-white block mb-2">
                  Card Number
                </label>

                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-white block mb-2">
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2">
                    CVV
                  </label>

                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold transition ${
                  loading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {loading ? "Processing Payment..." : "Pay Now"}
              </button>

            </form>

          </div>

        </div>

      </section>

    </>
  );
}

export default Payment;