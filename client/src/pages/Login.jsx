function Login() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 text-center">
        Login
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;