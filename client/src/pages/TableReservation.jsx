import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabase";

import greenTable from "../assets/images/green-table.png";
import blueTable from "../assets/images/blue-table.png";

function TableReservation() {
  const { tableType } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hours, setHours] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const image =
    tableType === "green"
      ? greenTable
      : blueTable;

  const tableName =
    tableType === "green"
      ? "Green"
      : "Blue";

  const slots = [
  {
    label: "2:00 PM",
    value: "14:00:00",
  },
  {
    label: "3:00 PM",
    value: "15:00:00",
  },
  {
    label: "4:00 PM",
    value: "16:00:00",
  },
  {
    label: "5:00 PM",
    value: "17:00:00",
  },
  {
    label: "6:00 PM",
    value: "18:00:00",
  },
  {
    label: "7:00 PM",
    value: "19:00:00",
  },
  {
    label: "8:00 PM",
    value: "20:00:00",
  },
  {
    label: "9:00 PM",
    value: "21:00:00",
  },
  {
    label: "10:00 PM",
    value: "22:00:00",
  },
  {
    label: "11:00 PM",
    value: "23:00:00",
  },
  {
    label: "12:00 AM",
    value: "00:00:00",
  },
  {
    label: "1:00 AM",
    value: "01:00:00",
  },
];

  useEffect(() => {
    if (!bookingDate) return;

    fetchBookedSlots();
  }, [bookingDate, tableType]);

  const fetchBookedSlots = async () => {
    const tableTypeName =
      tableType === "green"
        ? "Green"
        : "Blue";

    const { data: table } = await supabase
      .from("tables")
      .select("id")
      .eq("table_type", tableTypeName)
      .single();

    if (!table) return;

    const { data, error } = await supabase
      .from("bookings")
      .select("start_time,duration_hours")
      .eq("table_id", table.id)
      .eq("booking_date", bookingDate)
      .neq("booking_status", "Cancelled");

    if (error) {
      console.error(error);
      return;
    }

    setBookedSlots(data || []);
  };

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
    for (let i = 0; i <= hours; i++) {
      if (selectedIndex + i < slots.length) {
        highlightedSlots.push(selectedIndex + i);
      }
    }
  }

  const convertTimeToIndex = (time) => {
  return slots.findIndex(
    (slot) => slot.value === time
  );
};

  const reservedIndexes = [];

  bookedSlots.forEach((booking) => {
    const startIndex = convertTimeToIndex(booking.start_time);

    if (startIndex === -1) return;

    for (let i = 0; i <= booking.duration_hours; i++) {
      if (startIndex + i < slots.length) {
        reservedIndexes.push(startIndex + i);
      }
    }
  });

  const isSelectionAvailable = (startIndex) => {
  for (let i = 0; i <= hours; i++) {
    const currentIndex = startIndex + i;

    if (
      currentIndex >= slots.length ||
      reservedIndexes.includes(currentIndex)
    ) {
      return false;
    }
  }

  return true;
};

  const handleProceedToPayment = () => {
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }

    if (selectedIndex === null) {
      alert("Please select a starting time slot.");
      return;
    }

    navigate("/payment", {
      state: {
        tableName,
        bookingDate,
        startTime: slots[selectedIndex].value,
        hours,
        totalAmount: calculateTotal(),
        tableType,
      },
    });
  };

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
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/booking")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            ✕ Close
          </button>
        </div>

        <h1 className="text-5xl font-bold text-white mb-8">
          {tableName} Table Reservation
        </h1>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

          <label className="font-semibold text-white block mb-2">
            Select Date
          </label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg w-full mb-8"
          />

          <div className="flex gap-6 mb-5">

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-green-600"></div>
              <span className="text-white">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-blue-600"></div>
              <span className="text-white">Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-red-600"></div>
              <span className="text-white">Reserved</span>
            </div>

          </div>

          <label className="font-semibold text-white block mb-4">
            Select Starting Time Slot
          </label>

          <div className="grid md:grid-cols-4 gap-3 mb-8">

            {slots.map((slot, index) => {

              const isReserved =
                reservedIndexes.includes(index);

              const isHighlighted =
                highlightedSlots.includes(index);

              return (
                <button
                  key={slot.value}
                  type="button"
                  disabled={isReserved}
                  onClick={() => {
                    if (isSelectionAvailable(index)) {
                      setSelectedIndex(index);
                    } else {
                      alert(
                        "Selected duration overlaps with an existing reservation."
                      );
                    }
                  }}
                  className={`p-3 rounded-lg border font-semibold transition
                  ${
                    isReserved
                      ? "bg-red-600 border-red-600 text-white cursor-not-allowed"
                      : isHighlighted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-900 border-slate-700 text-white hover:border-green-500"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}

          </div>

          <label className="font-semibold text-white block mb-4">
            Number of Hours
          </label>

          <div className="flex items-center gap-4 mb-8">

            <button
              type="button"
              onClick={() =>
                setHours((prev) =>
                  Math.max(1, prev - 1)
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
              type="button"
              onClick={() => {
                const maxHours =
                  selectedIndex === null
                    ? 6
                    : Math.min(
                        6,
                        slots.length - selectedIndex - 1
                      );

                setHours((prev) =>
                  prev < maxHours ? prev + 1 : prev
                );
              }}
              className="w-12 h-12 bg-green-600 rounded-xl text-white text-2xl"
            >
              +
            </button>

          </div>

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

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-white mb-4">
              Booking Summary
            </h2>

            <div className="space-y-3 text-slate-300">

              <div className="flex justify-between">
                <span>Table</span>
                <span className="font-semibold text-white">
                  {tableName} Table
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-semibold text-white">
                  {bookingDate || "Not Selected"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Starting Slot</span>
                <span className="font-semibold text-white">
                  {selectedIndex !== null
                    ? slots[selectedIndex].label
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
              type="button"
              onClick={handleProceedToPayment}
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