"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // ---------------- HANDLE SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match!");
    }

    try {
      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => router.push("/user/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, try again later");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#232528] to-[#3b1e1e] relative overflow-hidden px-4">

      {/* Background Effects */}
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

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-white">
              Create Account
            </CardTitle>
            <p className="text-center text-gray-300 text-sm mt-1">
              Join us and enjoy unlimited entertainment 🎬
            </p>
          </CardHeader>

          <CardContent>
            
            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-gray-300">Full Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-gray-300">Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label className="text-gray-300">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-5 rounded-xl transition"
              >
                Create Account
              </Button>

              {/* Message */}
              {message && (
                <p className="text-center mt-2 text-sm text-red-400">{message}</p>
              )}
            </form>

            {/* Already Have Account */}
            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account?{" "}
              <Link href="/user/login" className="text-red-400 hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
