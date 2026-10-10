"use client";
import { useParams } from "next/navigation";
import Navbar from "../../../components/bar/Navbar";
import Homefooter from "../../../components/footer/Homefooter";
import Image from "next/image";
import { useEffect, useState } from "react";
import MoviePopup from "../../../components/modal/MoviePop";

export default function GenrePage() {
  const params = useParams();
  const genreParam = params.genre.toLowerCase(); // URL genre from slug (e.g., action)

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list");
      const data = await res.json();
      console.log("Genres in DB:", data.map(d => d.genre));
      setMoviesData(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  fetchMovies();
}, []);

  // 🔥 Filter data by genre (search in ANY item)
  const filteredItems = moviesData.filter((item) => {
  if (!item.genre) return false;

  const genreArray = item.genre
    .split(",")
    .map((g) => g.trim().toLowerCase().replace(/\s+/g, ""));

  const target = genreParam.replace(/-/g, "").replace(/\s+/g, "");

  return genreArray.includes(target);
});
  // Format heading (action → Action)
  const heading =
    genreParam.charAt(0).toUpperCase() + genreParam.slice(1);

  return (
    <div className="min-h-screen bg-[#111] text-white overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">
          {heading} Genre
        </h1>

        {filteredItems.length === 0 ? (
          <p className="text-gray-400 text-lg">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
                className="relative w-full cursor-pointer hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden"
              >
                <div className="relative w-full aspect-3/4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="absolute bottom-0 left-0 w-full bg-gradient from-black to-t p-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-300">
                    {item.genre}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MoviePopup open={open} setOpen={setOpen} movie={selectedItem} />
      <Homefooter />
    </div>
  );
}