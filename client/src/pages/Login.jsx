function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-8 rounded-xl w-[400px]">
        <h2 className="text-3xl font-bold mb-5">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-3 rounded"
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
