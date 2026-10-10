"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Optional: save user info in localStorage
        localStorage.setItem("adminKey", data.adminKey); // save key
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful!");
        router.push("/home"); // redirect to homepage
      } else {
        setMessage(data.error || "Invalid credentials");
      }
    } catch (err) {
      setMessage("Server error, try again later");
      console.error(err);
    }
  };

    return (
    
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#232528] to-[#3b1e1e] relative overflow-hidden px-4">

      {/* Background glow animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute w-96 h-96 bg-red-600/40 blur-3xl rounded-full -top-20 -left-20"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2 }}
        className="absolute w-96 h-96 bg-red-700/40 blur-3xl rounded-full -bottom-20 -right-20"
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-white font-bold">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent>
            <motion.form
            onSubmit={handleLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-gray-200 placeholder:text-gray-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-gray-200 placeholder:text-gray-400"
                />
              </div>

              {/* Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg">
                  Login
                </Button>
              </motion.div>

             {/* Error / Success Message */}
              {message && (
                <p className="text-center text-sm mt-2 text-red-400">{message}</p>
              )}

              <p className="text-center text-gray-300 text-sm mt-3">
                Don’t have an account?{" "}
                <Link href="/user/signup">
                <span className="text-red-400 hover:underline cursor-pointer">
                  Sign Up
                </span></Link>
              </p>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
