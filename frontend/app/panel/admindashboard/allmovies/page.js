'use client';

import { useEffect, useState } from "react";
import { FaStar, FaFilm, FaCalendar, FaTag } from "react-icons/fa";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
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
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-black text-white">

      {/* HEADER */}
      <div className="px-4 md:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-wide">
          All Movies
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your Netflix content library
        </p>
      </div>

      {/* CONTENT WRAPPER (IMPORTANT FIX) */}
      <div className="px-4 md:px-8 pb-16">

        {/* LOADING */}
        {loading && (
          <p className="text-gray-400">Loading movies...</p>
        )}

        {/* EMPTY */}
        {!loading && movies.length === 0 && (
          <div className="p-6 bg-red-500/10 border border-red-500 rounded-xl text-red-400">
            No movies found in database
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {movies.map((m) => (
            <div
              key={m.id}
              className="
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                overflow-hidden
                shadow-lg
                hover:shadow-red-500/20
                hover:border-red-500/40
                transition-all duration-300
                hover:scale-[1.02]
              "
            >

              {/* IMAGE */}
              {m.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* BODY */}
              <div className="p-4">

                <h2 className="text-lg font-semibold line-clamp-1">
                  {m.title}
                </h2>

                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {m.description}
                </p>

                {/* INFO */}
                <div className="flex flex-wrap gap-2 text-[11px] text-gray-300 mt-3">

                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                    <FaCalendar className="text-red-500" />
                    {m.releasedyear}
                  </span>

                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                    <FaTag className="text-red-500" />
                    {m.category}
                  </span>

                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                    <FaFilm className="text-red-500" />
                    {m.genre}
                  </span>

                  <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                    <FaStar className="text-yellow-400" />
                    {m.rating}
                  </span>

                </div>

                {/* EXTRA INFO */}
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  <p>IMDB: {m.imdb}</p>
                  <p>Director: {m.director}</p>
                  <p>Language: {m.language}</p>
                </div>

                {/* TRAILER */}
                {m.video && (
                  <a
                    href={m.video}
                    target="_blank"
                    className="inline-block mt-3 text-xs text-red-400 hover:text-red-300 hover:underline"
                  >
                    Watch Trailer →
                  </a>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}