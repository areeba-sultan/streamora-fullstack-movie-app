"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/bar/Navbar";
import Homefooter from "../../components/footer/Homefooter";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Film,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const API_URL =
  "https://streamora-fullstack-movie-app.onrender.com";

function getSearchText(movie) {
  let castNames = "";

  if (Array.isArray(movie.casts)) {
    castNames = movie.casts
      .map((cast) =>
        typeof cast === "string"
          ? cast
          : cast?.name || cast?.actor || ""
      )
      .join(" ");
  } else if (typeof movie.casts === "string") {
    try {
      const parsed = JSON.parse(movie.casts);
      castNames = Array.isArray(parsed)
        ? parsed
            .map((cast) =>
              typeof cast === "string"
                ? cast
                : cast?.name || cast?.actor || ""
            )
            .join(" ")
        : movie.casts;
    } catch {
      castNames = movie.casts;
    }
  }

  return [
    movie.title,
    movie.description,
    movie.genre,
    movie.type,
    movie.category,
    movie.director,
    movie.language,
    movie.releasedyear,
    castNames,
  ]
    .filter((value) => value !== null && value !== undefined)
    .join(" ")
    .toLowerCase();
}

function getMoviePath(movie) {
  const typePath = String(movie.type || "all")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `/movies/${typePath}/${movie.id}`;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/movies/list`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load movies");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid movie data");
        }

        setMovies(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search API error:", err);
          setError("Unable to load movies. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    const keywords = normalizedQuery.split(/\s+/);

    return movies
      .filter((movie) => {
        const searchText = getSearchText(movie);

        return keywords.every((keyword) =>
          searchText.includes(keyword)
        );
      })
      .sort((a, b) => {
        const aTitle = String(a.title || "").toLowerCase();
        const bTitle = String(b.title || "").toLowerCase();

        const aStarts = aTitle.startsWith(normalizedQuery);
        const bStarts = bTitle.startsWith(normalizedQuery);

        if (aStarts !== bStarts) {
          return aStarts ? -1 : 1;
        }

        const aIncludes = aTitle.includes(normalizedQuery);
        const bIncludes = bTitle.includes(normalizedQuery);

        if (aIncludes !== bIncludes) {
          return aIncludes ? -1 : 1;
        }

        return aTitle.localeCompare(bTitle);
      });
  }, [movies, normalizedQuery]);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Search header */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient from-red-950/20 via-[#111113] to-[#0b0b0d]" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 sm:pt-20 sm:pb-16">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-1 w-7 bg-red-600 rounded-full" />
              <span className="text-red-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                Streamora Search
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              What are you{" "}
              <span className="text-red-500">looking for?</span>
            </h1>

            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed">
              Discover movies, TV shows and web series.
              Search by title, genre, actor, director,
              language or any related keyword.
            </p>

            {/* Search input */}
            <div className="mt-9 max-w-3xl">
              <div className="group flex items-center gap-3 bg-[#1b1b1f] border border-white/15 rounded-2xl px-4 sm:px-5 py-4 focus-within:border-red-500/70 focus-within:ring-2 focus-within:ring-red-500/10 transition-all shadow-xl shadow-black/20">
                <Search
                  size={23}
                  className="text-gray-400 group-focus-within:text-red-500 transition-colors shrink-0"
                />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, genres, actors..."
                  aria-label="Search movies and TV shows"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder:text-gray-500 text-sm sm:text-base outline-none"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={19} />
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3 px-1">
                Try: Action, Batman, Korean, Sci-Fi, 2025...
              </p>
            </div>
          </div>
        </section>

        {/* Search results */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2
                size={34}
                className="animate-spin text-red-500"
              />
              <p className="text-gray-400 text-sm">
                Loading movies and shows...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <AlertCircle
                size={42}
                className="text-red-500 mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : !normalizedQuery ? (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Film size={36} className="text-gray-500" />
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Your next favorite is one search away
              </h2>

              <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
                Start typing above to explore the Streamora
                collection.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Search size={35} className="text-gray-500" />
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                No results found
              </h2>

              <p className="text-gray-400 text-sm sm:text-base max-w-md">
                We couldn&apos;t find anything matching{" "}
                <span className="text-white font-medium">
                  &quot;{query.trim()}&quot;
                </span>
                . Try another title, genre or keyword.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Search Results
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    Found{" "}
                    <span className="text-white font-semibold">
                      {results.length}
                    </span>{" "}
                    {results.length === 1 ? "result" : "results"} for{" "}
                    <span className="text-red-400">
                      &quot;{query.trim()}&quot;
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-5 lg:gap-x-6">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={getMoviePath(movie)}
                    className="group block min-w-0"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#1b1b1f] border border-white/10 group-hover:border-red-500/50 shadow-lg shadow-black/20 transition-all duration-300 group-hover:-translate-y-1">
                      {movie.image ? (
                        <Image
                          src={movie.image}
                          alt={movie.title || "Movie poster"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Film
                            size={36}
                            className="text-gray-600"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient from-black/90 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="inline-block bg-red-600/90 text-white text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wide">
                          {movie.category || "Movie"}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    <div className="pt-3 px-0.5">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {movie.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-1">
                        {movie.genre || "Entertainment"}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        {movie.releasedyear && (
                          <span>{movie.releasedyear}</span>
                        )}

                        {movie.releasedyear && movie.language && (
                          <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        )}

                        {movie.language && (
                          <span className="truncate">
                            {movie.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Homefooter />
    </div>
  );
}
