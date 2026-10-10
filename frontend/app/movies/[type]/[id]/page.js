"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  Star,
  Calendar,
  Globe,
  Clapperboard,
  User,
} from "lucide-react";
import Navbar from "../../../../components/bar/Navbar";
import Homefooter from "../../../../components/footer/Homefooter";

export default function MovieDetailPage() {
  const params = useParams();
  const { id, type } = params;
  const [playVideo, setPlayVideo] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <h2 className="text-2xl">Loading movie...</h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <h2 className="text-2xl">Movie not found</h2>
      </div>
    );
  }

  const genreList = movie.genre
    ? movie.genre.split(",").map((g) => g.trim()).filter(Boolean)
    : [];

  const languageList = movie.language
    ? movie.language.split(",").map((l) => l.trim()).filter(Boolean)
    : [];

  const castList = movie.casts
    ? movie.casts.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  // Extract YouTube src from the iframe HTML string stored in movie.video
  const getVideoSrc = (iframeHtml) => {
    if (!iframeHtml) return null;
    const match = iframeHtml.match(/src=['"]([^'"]+)['"]/);
    return match ? match[1] : null;
  };
  const videoSrc = getVideoSrc(movie.video);

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full h-screen">
      {playVideo && (
  <button
    onClick={() => setPlayVideo(false)}
    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/70 hover:bg-red-600 flex items-center justify-center transition"
  >
    <X size={24} />
  </button>
)}
        {playVideo && videoSrc ? (  
  <iframe
    src={`${videoSrc}&autoplay=1`}
    title={movie.title}
    width="100%"
    height="100%"
    className="absolute inset-0 w-full h-full"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  />
) : (
  <>
    <Image
      src={movie.image}
      alt={movie.title}
      fill
      className="object-cover"
      priority
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c]/80 via-transparent to-transparent" />
  </>
)}
      
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c]/80 via-transparent to-transparent" />
      {!playVideo && (
        <div className="absolute bottom-10 left-6 sm:left-12 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.description && (
            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              {movie.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-6">
            {videoSrc && (
             <button
  onClick={() => setPlayVideo(true)}
  className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-red-600/30"
>
  <Play size={18} fill="white" />
  Play Now
</button>
            )}
            <button className="p-2.5 rounded-full border border-white/30 hover:bg-white/10 transition">
              <Plus size={18} />
            </button>
            <button className="p-2.5 rounded-full border border-white/30 hover:bg-white/10 transition">
              <ThumbsUp size={18} />
            </button>
            <button className="p-2.5 rounded-full border border-white/30 hover:bg-white/10 transition">
              <Volume2 size={18} />
            </button>
          </div>
        </div> 
      )
      }
      </div>

    
      {/* INFO GRID */}
      <div className="px-6 sm:px-12 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-left shadow-lg">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Description
            </h3>
            <p className="text-gray-200 leading-relaxed">{movie.description}</p>
          </div>

          {/* Cast */}
          {castList.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-left shadow-lg">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Cast
              </h3>
              <div className="flex flex-wrap gap-4">
                {castList.map((actor, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-20 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                      <User size={24} className="text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-300 mt-2 line-clamp-2">
                      {actor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: sidebar */}
        <div className="space-y-6">
          {/* Released Year */}
          {movie.releasedyear && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-left shadow-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Calendar size={14} /> Released Year
              </h4>
              <p className="text-lg font-semibold">{movie.releasedyear}</p>
            </div>
          )}

          {/* Languages */}
          {languageList.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-left shadow-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                <Globe size={14} /> Available Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {languageList.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/10 text-xs text-gray-200 font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ratings */}
          {(movie.imdb || movie.rating) && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-left shadow-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                <Star size={14} /> Ratings
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {movie.imdb && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1.5">IMDb</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-sm">{movie.imdb}</span>
                    </div>
                  </div>
                )}
                {movie.rating && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1.5">Streamora</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-red-500 fill-red-500" />
                      <span className="font-semibold text-sm">{movie.rating}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Genres */}
          {genreList.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-left shadow-lg">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                <Clapperboard size={14} /> Genres
              </h4>
              <div className="flex flex-wrap gap-2">
                {genreList.map((g, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-red-600/20 text-red-400 text-xs font-medium"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Director */}
          {movie.director && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-left shadow-lg">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Director
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User size={18} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-100">{movie.director}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Homefooter />
    </div>
  );
}