'use client';

import { useEffect, useState } from "react";
import { FaFilm, FaPen, FaTimes, FaCheckCircle } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";

export default function UpdatePage() {
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const [editMovie, setEditMovie] = useState(null);
  const [msg, setMsg] = useState("");

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
    language: "",
    imdb: "",
    director: "",
    casts: "",
  });

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list");
      const data = await res.json();
      setMovies(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (movie) => {
    setEditMovie(movie);
    setMsg("");

    setForm({
      title: movie.title || "",
      description: movie.description || "",
      releasedyear: movie.releasedyear || "",
      category: movie.category || "",
      type: movie.type || "",
      genre: movie.genre || "",
      image: movie.image || "",
      video: movie.video || "",
      rating: movie.rating || "",
      seasons: movie.seasons || "",
      language: movie.language || "",
      imdb: movie.imdb || "",
      director: movie.director || "",
      casts: movie.casts || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateMovie = async (e) => {
    e.preventDefault();

    try {
      const adminKey = localStorage.getItem("adminKey");

      const res = await fetch(
        `https://streamora-fullstack-movie-app.onrender.com/movies/update/${editMovie.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "admin-key": adminKey,
          },
          body: JSON.stringify({
            ...form,
            releasedyear: Number(form.releasedyear),
            rating: Number(form.rating),
            imdb: Number(form.imdb),
            seasons: Number(form.seasons),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setEditMovie(null);
      await load();

      setMsg("✔ Movie Updated Successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#1a0000] to-black text-white p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-6">
        <MdMovieEdit className="text-red-500" />
        Update Movies
      </h1>

      {/* SUCCESS CARD */}
      {msg && (
        <div className="mb-6 p-4 rounded-2xl border border-red-500 bg-red-500/10 backdrop-blur-xl flex items-center gap-2">
          <FaCheckCircle className="text-red-500" />
          {msg}
        </div>
      )}

      {/* LIST */}
      <div className="grid gap-4">
        {movies.map((m) => (
          <div
            key={m.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center hover:border-red-500/50 transition"
          >
            <div>
              <h2 className="font-bold flex items-center gap-2">
                <FaFilm className="text-red-500" />
                {m.title}
              </h2>
              <p className="text-gray-400 text-sm">{m.genre}</p>
            </div>

            <button
              onClick={() => openEdit(m)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow-md active:scale-95 transition flex items-center gap-2"
            >
              <FaPen />
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editMovie && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center p-4">

          <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            {/* MODAL HEADER */}
            <h2 className="text-xl font-bold mb-5 text-white flex items-center gap-2">
              <MdMovieEdit className="text-red-500" />
              Edit Movie
            </h2>

            {/* FORM GRID FIXED */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {Object.entries(form).map(([key, value]) => (
                <input
                  key={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key}
                  className="p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-red-500"
                />
              ))}

              {/* BUTTONS */}
              <div className="md:col-span-2 flex gap-3 mt-2">

                <button
                  onClick={updateMovie}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold shadow-lg active:scale-95"
                >
                  Update Movie
                </button>

                <button
                  type="button"
                  onClick={() => setEditMovie(null)}
                  className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}