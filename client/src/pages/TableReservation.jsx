import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

import greenTable from "../assets/images/green-table.png";
import blueTable from "../assets/images/blue-table.png";

function TableReservation() {
  const { tableType } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hours, setHours] = useState(1);

  const image =
    tableType === "green"
      ? greenTable
      : blueTable;

  const tableName =
    tableType === "green"
      ? "Green Table"
      : "Blue Table";

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

  const calculateTotal = () => {
    if (selectedIndex === null) return 0;

    let total = 0;

    for (let i = 0; i < hours; i++) {
      const slotIndex = selectedIndex + i;

      if (slotIndex >= slots.length) break;

      if (slotIndex < 4) {
        total += 800;
      } else {
        total += 1000;
      }
    }

    return total;
  };

  const highlightedSlots = [];

  if (selectedIndex !== null) {
    for (let i = 0; i < hours; i++) {
      highlightedSlots.push(selectedIndex + i);
    }
  }

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar
          openRegister={() => {}}
          openLogin={() => {}}
        />
      </div>

      <section
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/booking")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ✕ Close
            </button>
          </div>

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
              Select Starting Time Slot
            </label>

            <div className="grid md:grid-cols-4 gap-3 mb-8">
              {slots.map((slot, index) => {
                const isHighlighted =
                  highlightedSlots.includes(index);

                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedIndex(index)}
                    className={`p-3 rounded-lg border transition ${
                      isHighlighted
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-900 text-white border-slate-700 hover:border-green-500"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {/* Hours Selector */}
            <label className="font-semibold text-white block mb-4">
              Number of Hours
            </label>

            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() =>
                  setHours((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-12 h-12 bg-red-600 rounded-xl text-white text-2xl"
              >
                -
              </button>

              <div className="text-white text-2xl font-bold">
                {hours} Hour(s)
              </div>

              <button
                onClick={() =>
                  setHours((prev) =>
                    prev < 6 ? prev + 1 : 6
                  )
                }
                className="w-12 h-12 bg-green-600 rounded-xl text-white text-2xl"
              >
                +
              </button>
            </div>

            {/* Pricing Info */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-8">
              <h3 className="text-white font-bold mb-2">
                Pricing
              </h3>

              <p className="text-slate-300">
                2:00 PM – 5:00 PM :
                <span className="text-green-400 font-bold">
                  {" "}Rs.800/hour
                </span>
              </p>

              <p className="text-slate-300">
                6:00 PM – 1:00 AM :
                <span className="text-blue-400 font-bold">
                  {" "}Rs.1000/hour
                </span>
              </p>
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
                  <span>Starting Slot</span>
                  <span className="font-semibold text-white">
                    {selectedIndex !== null
                      ? slots[selectedIndex]
                      : "Not Selected"}
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
                  <span className="font-semibold text-white">
                    Credit / Debit Card
                  </span>
                </div>

                <div className="border-t border-slate-700 pt-4 mt-4 flex justify-between">
                  <span className="text-lg">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-green-500">
                    Rs.{calculateTotal()}
                  </span>
                </div>

              </div>

              <button
                    onClick={() => navigate("/payment")}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
                  >
                    Proceed to Card Payment
                  </button>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default TableReservation;