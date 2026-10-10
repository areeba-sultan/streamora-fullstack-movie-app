"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/bar/Navbar";
import Homefooter from "../../../../components/footer/Homefooter";
import { Play, Pause, Volume2, VolumeX, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";

export default function SeriesDetailPage() {
  const params = useParams();
  const seriesId = params.id;

  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `https://streamora-fullstack-movie-app.onrender.com/movies/${seriesId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch series");
        }

        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };

    if (seriesId) {
      fetchSeries();
    }
  }, [seriesId]);

  if (loading) {
    return <p className="text-white p-10">Loading web series...</p>;
  }

  if (!series) {
    return <p className="text-white p-10">Web series not found</p>;
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setVolume((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh]">
        <Image
          src={series.image}
          alt={series.title}
          fill
          className="object-cover opacity-40"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <h1 className="text-5xl font-extrabold mb-4">{series.title}</h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            {series.description}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 flex items-center gap-2 text-lg font-semibold"
              onClick={togglePlay}
            >
              <Play size={20} /> Play Trailer
            </button>

            <button className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30">
              <Heart size={22} />
            </button>

            <button className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30">
              <Share2 size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER */}
      <div className="flex justify-center mt-10">
        <div className="relative w-full max-w-4xl">
          <ReactPlayer
            src={series.video}
            playing={isPlaying}
            controls
            volume={volume}
            width="100%"
            height="100%"
          />

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-4 bg-white/20 p-3 rounded-full backdrop-blur-md hover:bg-white/30"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>

          {/* Volume */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-white/20 p-3 rounded-full backdrop-blur-md hover:bg-white/30"
          >
            {volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-6">
        <h2 className="text-3xl font-bold">Movie Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <p>
            <span className="font-bold text-white">Genre:</span> {series.genre}
          </p>
          <p>
            <span className="font-bold text-white">Year:</span> {series.releasedyear}
          </p>
          <p>
            <span className="font-bold text-white">Rating:</span> ⭐ {series.rating}/5
          </p>
        </div>

        {/* Seasons / Episodes (if TV show) */}
        {Array.isArray(series.seasons) && series.seasons.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Episodes</h2>

            {series.seasons.map((season) => (
              <div key={season.seasonNumber} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Season {season.seasonNumber}
                </h3>

                <div className="space-y-2">
                  {season.episodes?.map((ep) => (
                    <div
                      key={ep.ep}
                      className="flex justify-between bg-[#18181b] p-3 rounded-lg border border-gray-700"
                    >
                      <span>
                        Ep {ep.ep}: {ep.title} ({ep.duration})
                      </span>
                      <a
                        href={ep.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Watch
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Homefooter />
    </div>
  );
}
