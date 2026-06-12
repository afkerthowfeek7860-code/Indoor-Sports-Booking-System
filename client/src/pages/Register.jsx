function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-8 rounded-xl w-[450px]">
        <h2 className="text-3xl font-bold mb-5">Register</h2>

        <input placeholder="Full Name" className="border w-full p-3 mb-3 rounded" />
        <input placeholder="Phone Number" className="border w-full p-3 mb-3 rounded" />
        <input placeholder="Email" className="border w-full p-3 mb-3 rounded" />
        <input placeholder="Password" className="border w-full p-3 mb-3 rounded" />

        <button className="bg-green-600 text-white w-full py-3 rounded">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;