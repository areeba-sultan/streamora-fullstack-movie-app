'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  FaHome,
  FaFilm,
  FaTv,
  FaListUl,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

const navItems = [
  { label: "Home", icon: FaHome, href: "/" },
  { label: "Movies", icon: FaFilm, href: "/movies" },
  { label: "TV Series", icon: FaTv, href: "/tv-shows" },
  { label: "My List", icon: FaListUl, href: "/list" },
];

const genres = [
  "All",
  "Action",
  "Adventure",
  "Fantasy",
  "Comedy",
  "Horror",
  "Romance",
  "Hindi",
  "Drama",
  "Family",
  "Classic",
  "Revenge",
  "Mystery",
];

export default function Navbar() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [openProfile, setOpenProfile] = useState(false);
  const notificationCount = 3;
  const router = useRouter();

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);

    if (genre === "All") {
      router.push("/movies");
    } else {
      router.push(`/genre/${genre.toLowerCase()}`);
    }
  };
     const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();

  setTimeout(() => {
    router.push("/user/signup");
  }, 1500);
};
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black"
    >
      {/* Top row */}
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
        {/* Logo + links */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="cursor-pointer bg-linear-to-r from-[#820000] via-[#ef2626] to-[#d92626] bg-clip-text text-2xl font-extrabold text-transparent"
            >
              Streamora
            </motion.span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ label, icon: Icon, href }) => (
              <Link key={label} href={href}>
                <motion.div
                  whileHover={{ y: -1 }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-red-500"
                >
                  <Icon className="text-base" />
                  {label}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Search"
            className="text-gray-300 transition-colors duration-200 hover:text-red-500"
          >
            <FaSearch className="text-lg" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Notifications"
            className="relative text-gray-300 transition-colors duration-200 hover:text-red-500"
          >
            <FaBell className="text-lg" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          <motion.div
            onClick={() => setOpenProfile(!openProfile)}
            whileHover={{ scale: 1.04 }}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/90 px-2.5 py-1.5 transition-all duration-200 hover:border-red-500/70 hover:bg-red-600/20"
          >
            <FaUserCircle className="text-xl text-white" />
            <FaChevronDown className="text-xs text-gray-300" />
          </motion.div>
           {openProfile && (
        <motion.div
           nitial={{ opacity: 0, y: -5 }}
           animate={{ opacity: 1, y: 0 }}
           className="absolute right-0 top-10 mt-4 w-40 rounded-xl bg-black/60 backdrop-blur-md p-2 shadow-xl z-50"
          >

      <button
      onClick={handleLogout}
      className="
        w-full rounded-lg px-4 py-2.5 
        text-center text-sm font-medium text-gray-200
        transition-all duration-200
        hover:bg-red-600/70
        hover:text-white
      "
    >
      Logout
    </button>
    </motion.div>
  )}

        </div>
      </div>

      {/* Genre filter row */}
      <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-6 pb-3 pt-1 scrollbar-hide">
        {genres.map((genre) => {
          const isActive = genre === activeGenre;
          return (
            <motion.button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {genre}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}