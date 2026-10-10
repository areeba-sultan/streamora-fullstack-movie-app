"use client";
import Image from "next/image";
import Navbar from "../../components/bar/Navbar";
import Homefooter from "../../components/footer/Homefooter";
import { useEffect, useState } from "react";
import MoviePopup from "../../components/modal/MoviePop";

const API_URL = "https://streamora-fullstack-movie-app.onrender.com";

export default function WebSeriesPage() {
  const [open, setOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [webSeries, setWebSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWebSeries() {
      try {
        const res = await fetch(`${API_URL}/movies/list`);

        if (!res.ok) {
          throw new Error("Failed to fetch web series");
        }

        const data = await res.json();

        const filtered = (Array.isArray(data) ? data : []).filter(
          (item) => item.category?.toLowerCase() === "webseries"
        );

        setWebSeries(filtered);
      } catch (err) {
        console.error("Error fetching web series:", err);
        setError("Unable to load web series.");
      } finally {
        setLoading(false);
      }
    }

    fetchWebSeries();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">Web Series</h1>

        {loading && (
          <p className="text-gray-400">Loading web series...</p>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!loading && !error && webSeries.length === 0 && (
          <p className="text-gray-400">No web series found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {webSeries.map((series) => (
            <div
              key={series.id}
              onClick={() => {
                setSelectedSeries(series);
                setOpen(true);
              }}
              className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={series.image}
                  alt={series.title || "Web Series"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-gradient from-black/80 to-transparent p-3">
                <h3 className="text-lg font-semibold">
                  {series.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {series.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MoviePopup
        open={open}
        setOpen={setOpen}
        movie={selectedSeries}
      />

      <Homefooter />
    </div>
  );
}
