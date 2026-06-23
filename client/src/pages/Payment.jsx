import Navbar from "../components/Navbar";

function Payment() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar
          openRegister={() => {}}
          openLogin={() => {}}
        />
      </div>

      <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 w-full max-w-xl shadow-2xl">

          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Card Payment
          </h1>

          <form className="space-y-5">

            <div>
              <label className="text-white block mb-2">
                Cardholder Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="text-white block mb-2">
                Card Number
              </label>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-white block mb-2">
                  Expiry Date
                </label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="text-white block mb-2">
                  CVV
                </label>

                <input
                  type="password"
                  placeholder="123"
                  className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
            >
              Pay Now
            </button>

          </form>

        </div>
      </section>
    </>
  );
}

export default Payment;