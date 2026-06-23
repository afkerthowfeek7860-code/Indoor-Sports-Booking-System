import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Register from "./Register";
import Login from "./Login";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import greenTable from "../assets/images/green-table.png";
import blueTable from "../assets/images/blue-table.png";

function Booking() {
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar
        openRegister={() => setShowRegister(true)}
        openLogin={() => setShowLogin(true)}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      >
        <Register />
      </RegisterModal>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      >
        <Login />
      </LoginModal>

      <section className="min-h-screen bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold mb-3">
              RESERVE YOUR TABLE
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Choose Your Table
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Experience premium billiards on our professionally maintained tables.
              Select your preferred table and book instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Green Table */}
            <div className="group bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-2 shadow-2xl">

              <img
                src={greenTable}
                alt="Green Table"
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-4">
                  Available
                </span>

                <h2 className="text-3xl font-bold text-white mb-3">
                  Green Table
                </h2>

                <p className="text-slate-400 mb-6">
                  Professional tournament-grade green table with premium cushions
                  and perfectly leveled surfaces for competitive gameplay.
                </p>

                <ul className="space-y-2 mb-6 text-slate-300">
                  <li>✓ Tournament Standard</li>
                  <li>✓ Premium Cloth</li>
                  <li>✓ Professional Lighting</li>
                  <li>✓ Air Conditioned Area</li>
                </ul>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold text-green-400">
                      Rs.1000
                    </span>
                    <span className="text-slate-400 ml-2">
                      / hour
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/booking/green")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Book Green Table
                </button>

              </div>
            </div>

            {/* Blue Table */}
            <div className="group bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 shadow-2xl">

              <img
                src={blueTable}
                alt="Blue Table"
                className="h-72 w-full object-cover"
              />

              <div className="p-8">

                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
                  Available
                </span>

                <h2 className="text-3xl font-bold text-white mb-3">
                  Blue Table
                </h2>

                <p className="text-slate-400 mb-6">
                  Premium blue table designed for both casual players and serious
                  competitors seeking a world-class playing experience.
                </p>

                <ul className="space-y-2 mb-6 text-slate-300">
                  <li>✓ Competition Grade</li>
                  <li>✓ Premium Cloth</li>
                  <li>✓ Professional Lighting</li>
                  <li>✓ Air Conditioned Area</li>
                </ul>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold text-blue-400">
                      Rs.1000
                    </span>
                    <span className="text-slate-400 ml-2">
                      / hour
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/booking/blue")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Book Blue Table
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default Booking;