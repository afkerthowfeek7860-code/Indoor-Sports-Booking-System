import { FaUserCircle } from "react-icons/fa";

function AdminNavbar({ adminName = "Administrator" }) {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Manage bookings, users and tables.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <h3 className="text-white font-semibold">
            {adminName}
          </h3>

          <p className="text-slate-400 text-sm">
            System Administrator
          </p>
        </div>

        <FaUserCircle
          size={48}
          className="text-blue-500"
        />

      </div>

    </header>
  );
}

export default AdminNavbar;