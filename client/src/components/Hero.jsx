function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">
          Welcome to
        </h1>

        <h2 className="text-6xl font-bold text-blue-600 mt-3">
          Majestic Pool Club
        </h2>

        <p className="mt-5 text-lg text-gray-600">
          Reserve your 8-ball pool table online and play without waiting.
        </p>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg mt-6">
          Book a Table
        </button>
      </div>
    </section>
  );
}

export default Hero;
