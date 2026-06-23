import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

import greenTable from "../assets/images/green-table.png";
import blueTable from "../assets/images/blue-table.png";

function TableReservation() {
  const { tableType } = useParams();

  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const image =
    tableType === "green"
      ? greenTable
      : blueTable;

  const tableName =
    tableType === "green"
      ? "Green Table"
      : "Blue Table";

  const pricePerHour = 1000;

  const slots = [
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "1:00 AM",
  ];

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar
          openRegister={() => {}}
          openLogin={() => {}}
        />
      </div>

      {/* Background */}
      <section
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

          {/* Heading */}
          <h1 className="text-5xl font-bold text-white mb-8">
            {tableName} Reservation
          </h1>

          {/* Reservation Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

            {/* Date */}
            <label className="font-semibold text-white block mb-2">
              Select Date
            </label>

            <input
              type="date"
              className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg w-full mb-8"
            />

            {/* Time Slots */}
            <label className="font-semibold text-white block mb-4">
              Select Time Slot
            </label>

            <div className="grid md:grid-cols-4 gap-3 mb-8">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border transition ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-900 text-white border-slate-700 hover:border-green-500"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Duration */}
            <label className="font-semibold text-white block mb-2">
              Duration
            </label>

            <select
              value={hours}
              onChange={(e) =>
                setHours(Number(e.target.value))
              }
              className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg w-full mb-8"
            >
              <option value={1}>1 Hour</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={5}>5 Hours</option>
              <option value={6}>6 Hours</option>
            </select>

            {/* Payment Method */}
            <label className="font-semibold text-white block mb-3">
              Payment Method
            </label>

            <div className="grid md:grid-cols-3 gap-3 mb-8">

              <button
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-xl border transition ${
                  paymentMethod === "cash"
                    ? "bg-green-600 text-white"
                    : "bg-slate-900 text-white border-slate-700"
                }`}
              >
                Cash
              </button>

              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border transition ${
                  paymentMethod === "card"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-white border-slate-700"
                }`}
              >
                Credit / Debit Card
              </button>

              <button
                onClick={() => setPaymentMethod("payhere")}
                className={`p-4 rounded-xl border transition ${
                  paymentMethod === "payhere"
                    ? "bg-yellow-500 text-black"
                    : "bg-slate-900 text-white border-slate-700"
                }`}
              >
                PayHere
              </button>

            </div>

            {/* Booking Summary */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-white mb-4">
                Booking Summary
              </h2>

              <div className="space-y-3 text-slate-300">

                <div className="flex justify-between">
                  <span>Table</span>
                  <span className="font-semibold text-white">
                    {tableName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Time Slot</span>
                  <span className="font-semibold text-white">
                    {selectedSlot || "Not Selected"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-white">
                    {hours} Hour(s)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-white capitalize">
                    {paymentMethod}
                  </span>
                </div>

                <div className="border-t border-slate-700 pt-4 mt-4 flex justify-between">
                  <span className="text-lg">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-green-500">
                    Rs.{hours * pricePerHour}
                  </span>
                </div>

              </div>

              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition">
                Proceed to Payment
              </button>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default TableReservation;