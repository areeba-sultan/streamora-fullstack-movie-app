"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/bar/Navbar";
import Homefooter from "../../../components/footer/Homefooter";
import Image from "next/image";
import MoviePopup from "../../../components/modal/MoviePop";

export default function AnimeTypePage() {
  const params = useParams();
  const typeParam = params.type?.toLowerCase() || ""; // URL se type
  
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchMovies() {
        try {
          const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list"); 
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

  // Filter anime based on category and type
  const filteredAnime = movies.filter((item) => {
    // Convert category to array and check if includes "anime"
    const categories = item.category
      .split(",")
      .map((c) => c.trim().toLowerCase());
    if (!categories.includes("anime")) return false;

    // Convert type string to array and check if it matches typeParam
    if (!typeParam) return true; // agar typeParam empty ho to sari anime show ho
    const typesArray = item.type
      .split(",")
      .map((t) => t.trim().toLowerCase());

    return typesArray.includes(typeParam.replace(/-/g, ""));
  });

  // Create heading text
  const heading = typeParam
    ? typeParam.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "All";

  const [selectedAnime, setSelectedAnime] = useState(null);
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
        <h1 className="text-4xl font-bold mb-10">{heading} Anime</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredAnime.map((anime) => (
            <div
              key={anime.id}
              onClick={() => {
                setSelectedAnime(anime);
                setOpen(true);
              }}
              className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
            >
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                className="object-cover"
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient from-black/80 via-black/50 to-transparent p-4">
                <h3 className="text-lg font-semibold">{anime.title}</h3>
                <p className="text-sm text-gray-300">{anime.genre}</p>
                <p className="text-xs text-gray-400">{anime.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP COMPONENT */}
      <MoviePopup open={open} setOpen={setOpen} movie={selectedAnime} />
      <Homefooter />
    </div>
  );
}
