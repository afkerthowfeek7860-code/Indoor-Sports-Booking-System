import { useState } from "react";
import { supabase } from "../services/supabase";
import { toast } from "react-toastify";

function Register({ onRegisterSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        toast.error(error.message);
        return;
      }

      // Update profile created by trigger
      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
          })
          .eq("id", data.user.id);

        if (profileError) {
          console.error(profileError);
          toast.error("Failed to update profile.");
          return;
        }
      }

      // Success notification
      toast.success("Registration Successful!");

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Close the registration modal
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }

    } catch (err) {
      console.error("Register Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 text-center">
        Create Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;