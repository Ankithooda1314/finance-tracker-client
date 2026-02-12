import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import { saveAuth } from "../services/auth";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      saveAuth(res.data.token, res.data.name);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <button
          onClick={login}
          className="w-full bg-green-500 p-2 rounded font-bold"
        >
          Login
        </button>

        <p className="text-center text-sm">
          No account?{" "}
          <Link to="/register" className="text-green-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
