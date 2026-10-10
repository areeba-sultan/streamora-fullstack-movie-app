"use client";
import Image from "next/image";
import Navbar from "../../components/bar/Navbar";
import Homefooter from "../../components/footer/Homefooter";
import { useState, useEffect } from "react";
import MoviePopup from "../../components/modal/MoviePop";

export default function TvshowPage() {
  const [open, setOpen] = useState(false);
  const [selectedshow, setSelectedshow] = useState(null);
  const [moviesData, setMoviesData] = useState([]);

  // Fetch from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list");
        const data = await res.json();
        setMoviesData(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter only TV Shows
  const show = moviesData.filter((item) => {
    const categories =
      item.category?.split(",").map((c) => c.trim().toLowerCase()) || [];
    return categories.includes("tvshow");
  });

  return (
    <div className="min-h-screen bg-[#111] text-white overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">TV Show</h1>

        {/* Grid of TV Shows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {show.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedshow(item);
                setOpen(true);
              }}
              className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-3/4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 p-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MoviePopup open={open} setOpen={setOpen} movie={selectedshow} />
      <Homefooter />
    </div>
  );
}