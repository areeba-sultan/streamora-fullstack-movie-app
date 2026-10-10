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

  const [moviesData, setMoviesData] = useState([]);
  const [selectedshow, setSelectedshow] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://streamora-fullstack-movie-app.onrender.com/movies/list"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch TV shows");
        }

        const data = await response.json();
        setMoviesData(data);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies whose type includes the current typeParam
  const filteredshow = moviesData.filter((item) => {
    if (item.category !== "tvShow") return false; // only TV shows

    const typesArray = (item.type || "")
      .split(",")
      .map((t) => t.trim().toLowerCase());

    return typesArray.includes(typeParam.replace(/-/g, ""));
  });

  // Create heading text from typeParam
  const heading = typeParam
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />

      <div className="container mx-auto px-15 py-15">
        <h1 className="text-4xl font-bold mb-10">{heading} TV Shows</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredshow.map((show) => (
            <div
              key={show.id}
              onClick={() => {
                setSelectedshow(show);
                setOpen(true);
              }}
              className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
            >
              <Image
                src={show.image}
                alt={show.title}
                fill
                className="object-cover"
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient from-black/80 via-black/50 to-transparent p-4">
                <h3 className="text-lg font-semibold">{show.title}</h3>
                <p className="text-sm text-gray-300">{show.genre}</p>
                <p className="text-xs text-gray-400">{show.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP COMPONENT */}
      <MoviePopup open={open} setOpen={setOpen} movie={selectedshow} />

      <Homefooter />
    </div>
  );
}
