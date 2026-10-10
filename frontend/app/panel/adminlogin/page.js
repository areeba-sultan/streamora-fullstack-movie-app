'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.adminKey) {

        // save admin key
      localStorage.setItem("adminKey", data.adminKey);
      // save admin details with role
      localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

  router.push("/panel/admindashboard");

} else {
        setError("Invalid credentials or key not generated");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-red-600/20 blur-[120px] rounded-full top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full bottom-20 right-20"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#111111]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Admin Login
            </h1>
            <p className="text-gray-400 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-red-500 transition"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            Streamora Admin Panel
          </div>
        </div>
      </div>
    </div>
  );
}
