import {
  FaTachometerAlt,
  FaClipboardList,
  FaTable,
  FaUsers,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar({ active, setActive }) {
  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: "bookings",
      title: "Bookings",
      icon: <FaClipboardList />,
    },
    {
      id: "tables",
      title: "Tables",
      icon: <FaTable />,
    },
    {
      id: "users",
      title: "Users",
      icon: <FaUsers />,
    },
    {
      id: "revenue",
      title: "Revenue",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-700 min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-500">
          Majestic Pool Club
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition text-left
              ${
                active === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }
            `}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>
          </button>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">

        <button
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;