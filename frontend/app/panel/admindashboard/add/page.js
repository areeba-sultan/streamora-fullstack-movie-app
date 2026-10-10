'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFilm, FaSave } from "react-icons/fa";

export default function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    releasedyear: "",
    category: "",
    type: "",
    genre: "",
    image: "",
    video: "",
    rating: "",
    seasons: "",
    imdb: "",
    director: "",
    language: "",
    casts: ""
  });

  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = () => {
    return Object.values(form).every((v) => v.toString().trim() !== "");
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!isValid()) {
      setMsg("⚠️ Please fill all fields before submitting");
      return;
    }

    try {
      const adminKey = localStorage.getItem("adminKey");

      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "admin-key": adminKey,
        },
        body: JSON.stringify({
          ...form,
          releasedyear: Number(form.releasedyear),
          rating: Number(form.rating),
          seasons: Number(form.seasons),
          imdb: Number(form.imdb),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed");

      setMsg("✔ Movie added successfully");

      setTimeout(() => router.back(), 1500);

    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-red-950 p-6">

      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <FaFilm className="text-red-500 text-2xl" />
          <h1 className="text-3xl font-bold text-white">
            Add New Movie
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {[
            ["title", "Title"],
            ["releasedyear", "Year"],
            ["category", "Category"],
            ["type", "Type"],
            ["genre", "Genre"],
            ["rating", "Rating"],
            ["imdb", "IMDB"],
            ["director", "Director"],
            ["language", "Language"],
            ["casts", "Casts"],
            ["seasons", "Seasons (0 for movie)"]
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="p-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-red-500 outline-none"
            />
          ))}

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-3 bg-black/40 border border-white/10 rounded-xl text-white md:col-span-2 focus:border-red-500 outline-none"
          />

          <input
            name="video"
            value={form.video}
            onChange={handleChange}
            placeholder="Video URL"
            className="p-3 bg-black/40 border border-white/10 rounded-xl text-white md:col-span-2 focus:border-red-500 outline-none"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="p-3 bg-black/40 border border-white/10 rounded-xl text-white md:col-span-2 focus:border-red-500 outline-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-red-900 hover:scale-[1.02] transition p-3 rounded-xl font-bold text-white"
          >
            <FaSave />
            Save Movie
          </button>

        </form>

        {/* MESSAGE */}
        {msg && (
          <p className="mt-4 text-sm text-gray-300">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}