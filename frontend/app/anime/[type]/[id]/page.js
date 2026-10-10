"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/bar/Navbar";
import Homefooter from "../../../../components/footer/Homefooter";

export default function MovieDetailPage() {
  const params = useParams();
  const { id, type } = params;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://streamora-fullstack-movie-app.onrender.com/movies/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-2xl">Loading movie...</h2>
      </div>
    );

  if (!movie)
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-2xl">Movie not found</h2>
      </div>
    );

  return (
   <div className="min-h-screen bg-[#111] text-white">
      <Navbar />

      <div className="container mx-auto px-20 py-10 flex flex-col items-start">
        {/* Video Section */}
        {movie.video ? (
          <div className="w-full md:w-3/4 lg:w-4/5 aspect-video bg-black rounded-lg overflow-hidden mb-8">
            <iframe
              src={movie.video}
              title={movie.title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="w-full md:w-3/4 lg:w-2/3 flex items-center justify-center h-64 text-gray-400 bg-black rounded-lg mb-8">
            Video not available
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

        {/* Rating */}
        {movie.rating && (
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 font-bold text-xl mr-2">★ {movie.rating}</span>
            <span className="text-gray-400 text-lg">/ 5</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 text-lg font-semibold mb-6">{movie.description}</p>

        {/* Genre / Year / Type */}
        <div className="flex flex-wrap gap-6 text-gray-400 text-lg font-semibold">
          <span>{movie.genre}</span>
          <span>{movie.year}</span>
          <span>{type.replace("-", " ").toUpperCase()}</span>
        </div>
      </div>

      <Homefooter />
    </div>
  );
}