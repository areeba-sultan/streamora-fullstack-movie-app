"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/bar/Navbar";
import Homefooter from "../../../components/footer/Homefooter";
import Image from "next/image";
import MoviePopup from "../../../components/modal/MoviePop";

export default function MovieTypePage() {
  const params = useParams();
const typeParam = params.type.toLowerCase(); // URL se type, e.g., "top-rated"

 const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from backend
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list"); // Replace with your backend URL
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);
// Filter movies whose type includes the current typeParam
const filteredMovies = movies.filter((movie) => {
  // Convert movie.type string to array of trimmed lowercase types
  const typesArray = movie.type
    .split(",")           // split by comma
    .map((t) => t.trim().toLowerCase());

  // Check if typesArray includes the type from URL
  return movie.category === "movie" && typesArray.includes(typeParam.replace(/-/g, ""));
});

// Create heading text from typeParam
const heading = typeParam
  .replace("-", " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  if (loading)
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-2xl">Loading movies...</h2>
      </div>
    );
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />

      <div className="container mx-auto px-15 py-15">
        <h1 className="text-4xl font-bold mb-10">{heading} Movies</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredMovies.map((movie) => (
              <div
              key={movie.id}
              onClick={()=>{
                setSelectedMovie(movie);
                setOpen(true);
              }}
              className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
               >
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover"
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient from-black/80 via-black/50 to-transparent p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">{movie.genre}</p>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* POPUP COMPONENT */}
      <MoviePopup open={open} setOpen={setOpen} movie={selectedMovie} />
      <Homefooter />
    </div>
  );
}
