import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

import greenTable from "../assets/images/green-table.png";
import blueTable from "../assets/images/blue-table.png";

function TableReservation() {
  const { tableType } = useParams();

  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);

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

          <h1 className="text-5xl font-bold text-white mb-8">
            {tableName} Reservation
          </h1>

          {/* Reservation Form */}
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

            {/* Summary */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-white mb-4">
                Booking Summary
              </h2>

              <p className="text-slate-300">
                Table:
                <strong className="text-white">
                  {" "}
                  {tableName}
                </strong>
              </p>

              <p className="text-slate-300">
                Time:
                <strong className="text-white">
                  {" "}
                  {selectedSlot || "Not Selected"}
                </strong>
              </p>

              <p className="text-slate-300">
                Duration:
                <strong className="text-white">
                  {" "}
                  {hours} Hour(s)
                </strong>
              </p>

              <p className="text-2xl font-bold text-green-500 mt-4">
                Total: Rs.{hours * pricePerHour}
              </p>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                Confirm Booking
              </button>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default TableReservation;