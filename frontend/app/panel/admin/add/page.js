"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/sidebar";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";

export default function AddAdminPage() {
  const [loading, setLoading] = useState(false);
  const [roleOpen,setRoleOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const [message, setMessage] = useState({
    show: false,
    text: "",
    success: true,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createAdmin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const adminKey = localStorage.getItem("adminKey");

      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "admin-key": adminKey || "",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          show: true,
          text: "Admin created successfully.",
          success: true,
        });

        setForm({
          name: "",
          email: "",
          password: "",
          role: "admin",
        });
      } else {
        setMessage({
          show: true,
          text: data.message || "Failed to create admin.",
          success: false,
        });
      }
    } catch {
      setMessage({
        show: true,
        text: "Server Error",
        success: false,
      });
    }

    setLoading(false);

    setTimeout(() => {
      setMessage({
        show: false,
        text: "",
        success: true,
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen flex bg-[#070707] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white">
            Add New Admin
          </h1>

          <p className="text-gray-400 mt-2">
            Create a new administrator for Streamora Dashboard.
          </p>
        </div>

        {/* Toast */}
        {message.show && (
          <div
            className={`mb-6 rounded-xl px-5 py-2 border backdrop-blur-xl transition-all duration-300 ${
              message.success
                ? "bg-green-600/20 border-green-500 text-green-300"
                : "bg-red-600/20 border-red-500 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Card */}
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden ml-50">

          {/* Top */}
          <div className="bg-gradient-to-r from-red-700 to-red-500 px-6 py-5 flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
              <FaUserPlus className="text-2xl text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Create Admin
              </h2>

              <p className="text-red-100 text-sm">
                Fill the information below.
              </p>
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={createAdmin}
            className="p-6 space-y-5"
          >

            {/* Name */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>

              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 h-14 focus-within:border-red-500 transition">

                <FaUser className="text-red-500 mr-3" />

                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="bg-transparent flex-1 outline-none"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Email
              </label>

              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 h-14 focus-within:border-red-500 transition">

                <FaEnvelope className="text-red-500 mr-3" />

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="bg-transparent flex-1 outline-none"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>

              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 h-14 focus-within:border-red-500 transition">

                <FaLock className="text-red-500 mr-3" />

                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="bg-transparent flex-1 outline-none"
                />

              </div>

            </div>

            {/* Role */}
            {/* Role */}
<div>

<label className="text-sm text-gray-300 mb-2 block">
  Role
</label>

<div className="relative">

  <div
    onClick={() => setRoleOpen(!roleOpen)}
    className="
    flex
    items-center
    bg-white/5
    border
    border-white/10
    rounded-xl
    px-4
    h-14
    cursor-pointer
    hover:border-red-500
    transition
    "
  >

    <FaUserShield className="text-red-500 mr-3"/>

    <span className="flex-1">
      {form.role === "ADMIN"
        ? "Admin"
        : "Super Admin"
      }
    </span>

    <span className="text-gray-400">
      ▾
    </span>

  </div>


  {roleOpen && (

    <div
      className="
      absolute
      top-16
      left-0
      w-full
      bg-black/90
      backdrop-blur-xl
      border
      border-white/10
      rounded-xl
      overflow-hidden
      z-50
      shadow-2xl
      "
    >

      <div
        onClick={()=>{
          setForm({
            ...form,
            role:"ADMIN"
          });
          setRoleOpen(false);
        }}
        className="
        px-4
        py-3
        cursor-pointer
        text-gray-300
        hover:bg-red-600
        hover:text-white
        transition
        "
      >
        Admin
      </div>


      <div
        onClick={()=>{
          setForm({
            ...form,
            role:"SUPERADMIN"
          });
          setRoleOpen(false);
        }}
        className="
        px-4
        py-3
        cursor-pointer
        text-gray-300
        hover:bg-red-600
        hover:text-white
        transition
        "
      >
        Super Admin
      </div>


    </div>

  )}

</div>

</div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold text-lg shadow-lg shadow-red-700/30 disabled:opacity-50"
            >
              {loading ? "Creating Admin..." : "Create Admin"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}