import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";

function AdminRevenue() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const { data } = await adminApi.get("/revenue");
      setStats(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load revenue analytics.");
    }
  };

  if (!stats) {
    return (
      <div className="text-white text-xl">
        Loading Revenue...
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-3xl font-bold text-white mb-8">
        Revenue Analytics
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-slate-400">
            Total Revenue
          </h3>

          <p className="text-4xl text-green-400 font-bold mt-4">
            Rs. {stats.totalRevenue}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-slate-400">
            Today's Revenue
          </h3>

          <p className="text-4xl text-blue-400 font-bold mt-4">
            Rs. {stats.todayRevenue}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-slate-400">
            This Month
          </h3>

          <p className="text-4xl text-yellow-400 font-bold mt-4">
            Rs. {stats.monthRevenue}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-slate-400">
            Average Booking
          </h3>

          <p className="text-4xl text-purple-400 font-bold mt-4">
            Rs. {stats.averageBooking}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-green-700 rounded-xl p-6 text-center">
          <h3 className="text-white text-xl">
            Confirmed
          </h3>

          <p className="text-5xl font-bold text-white mt-4">
            {stats.confirmed}
          </p>
        </div>

        <div className="bg-yellow-500 rounded-xl p-6 text-center">
          <h3 className="text-black text-xl">
            Pending
          </h3>

          <p className="text-5xl font-bold text-black mt-4">
            {stats.pending}
          </p>
        </div>

        <div className="bg-red-600 rounded-xl p-6 text-center">
          <h3 className="text-white text-xl">
            Cancelled
          </h3>

          <p className="text-5xl font-bold text-white mt-4">
            {stats.cancelled}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminRevenue;