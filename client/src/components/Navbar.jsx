import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

function Navbar({ user, openRegister, openLogin }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-blue-500">
        Majestic Pool Club
      </h1>

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/booking"
          className="hover:text-blue-400 transition"
        >
          Book Now
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={openRegister}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </button>

            <button
              onClick={openLogin}
              className="hover:text-blue-400 transition"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;