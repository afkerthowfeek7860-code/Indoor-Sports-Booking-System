function Booking() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">
        Book Your Pool Table
      </h1>

      <input
        type="date"
        className="border w-full p-3 rounded mb-4"
      />

      <select className="border w-full p-3 rounded mb-4">
        <option>10:00 AM</option>
        <option>11:00 AM</option>
        <option>12:00 PM</option>
      </select>

      <button className="bg-blue-600 text-white px-8 py-3 rounded">
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;
