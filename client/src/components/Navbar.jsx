import { Link } from "react-router-dom";

function Navbar({ openRegister, openLogin }) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-blue-500">
        Majestic Pool Club
      </h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>

        <Link to="/booking">
          Book Now
        </Link>

        <button onClick={openRegister}>
          Sign Up
        </button>

        <button onClick={openLogin}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;