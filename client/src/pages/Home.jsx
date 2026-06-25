import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBg from "../assets/hero-bg.png";
import Register from "./Register";
import RegisterModal from "../components/RegisterModal";
import Login from "./Login";
import LoginModal from "../components/LoginModal";

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current logged in user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar
        user={user}
        openRegister={() => setShowRegister(true)}
        openLogin={() => setShowLogin(true)}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      >
        <Register
          onRegisterSuccess={() => {
            setShowRegister(false);

            // Uncomment if you want to open login automatically
            // setShowLogin(true);
          }}
        />
      </RegisterModal>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      >
        <Login
          onLoginSuccess={() => {
            setShowLogin(false);
          }}
        />
      </LoginModal>

      {/* Hero Section */}
      <section
        className="relative min-h-screen text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <div>
            <p className="text-green-400 font-semibold mb-4">
              #1 8-Ball Pool Club
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Play. Compete.
              <span className="text-blue-500"> Win.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              Reserve professional 8-ball pool tables at Majestic Pool Club.
              Enjoy premium facilities, competitive matches, and an unforgettable
              experience.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
                Book a Table
              </button>

              <button className="border border-white hover:bg-white hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            About Majestic Pool Club
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Majestic Pool Club provides a premium environment for pool lovers.
            Whether you're a beginner or a competitive player, our professional
            tables and welcoming atmosphere offer the perfect place to play.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                Professional Tables
              </h3>

              <p className="text-slate-600">
                High-quality tournament-standard 8-ball pool tables.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                Easy Booking
              </h3>

              <p className="text-slate-600">
                Reserve your table online in seconds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                Affordable Pricing
              </h3>

              <p className="text-slate-600">
                Competitive rates for casual and professional players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Players Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Best pool club I've ever visited.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Professional tables and great atmosphere.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Online booking makes everything easy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;