'use client';

import { useEffect, useState } from "react";
import { FaStar, FaFilm } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


export default function DeletePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list");
      const data = await res.json();

      setMovies(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const remove = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      const adminKey = localStorage.getItem("adminKey");

      const res = await fetch(`https://streamora-fullstack-movie-app.onrender.com/movies/delete/${id}`, {
        method: "DELETE",
        headers: {
          "admin-key": adminKey,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed");

      await load();
      alert("✔ Movie deleted successfully");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-red-950 text-white p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <MdDeleteOutline className="text-red-500 text-3xl" />
        <h1 className="text-3xl font-bold">
          Delete Movies
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">Loading movies...</p>
      )}

      {/* EMPTY */}
      {!loading && movies.length === 0 && (
        <div className="p-6 bg-red-500/10 border border-red-500 rounded-xl text-red-400">
          No movies found.
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-4">

        {movies.map((m) => (
          <div
            key={m.id}
            className="
              flex justify-between items-center
              bg-white/5 backdrop-blur-xl
              border border-white/10
              p-5 rounded-2xl
              shadow-lg
              hover:border-red-500/40
              hover:shadow-red-500/20
              transition-all duration-300
            "
          >

            {/* LEFT */}
            <div className="space-y-1">

              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaFilm className="text-red-500" />
                {m.title}
              </h2>

              <p className="text-gray-400 text-sm">
                {m.genre} • {m.category}
              </p>

              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <FaStar />
                {m.rating}
              </p>

            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => remove(m.id)}
              className="
                flex items-center gap-2
                bg-linear-to-r from-red-600 to-red-900
                hover:scale-105 transition
                px-5 py-2 rounded-xl font-bold
              "
            >
              <MdDeleteOutline />
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}