"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomeCarousel({
  heading,
  movieIds = [],
  type = "movie",
  variant = "default", // "default" | "top10" | "new"
}) {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://streamora-fullstack-movie-app.onrender.com/movies/list");
        const data = await res.json();
        setMoviesData(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const normalize = (str = "") =>
    String(str).toLowerCase().replace(/\s+/g, "").replace(/[,|-]/g, "");

  const data = moviesData.filter((item) => {
    if (!item || !item.category) return false;
    if (!type) return true;
    return normalize(item.category).includes(normalize(type));
  });

  let finalList =
    Array.isArray(movieIds) && movieIds.length > 0
      ? data.filter((d) => movieIds.includes(d.id))
      : data;

  const isTop10 = variant === "top10";
  const isNew = variant === "new";

  if (isTop10) {
    finalList = finalList.slice(0, 10);
  }

  return (
    <div className="w-full py-8 ">
      <div className="flex justify-between items-center px-4 mb-8">
        <h2 className={isTop10 ? "text-3xl font-bold text-white" : "text-3xl font-bold text-white mt-3"}>
          {heading}
        </h2>
      </div>

      <Carousel className="w-full px-4">
        <CarouselContent className="ml-2 md:-ml-4">
          {finalList.map((item, idx) => {
            const typePath = item.type
              ? item.type.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-")
              : "movie";

            // ---------- TOP 10 CARD ----------
            if (isTop10) {
              const rank = idx + 1;
              return (
                <CarouselItem
                  key={item.id}
                  className="pl-6 md:pl-10 basis-3/4 sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative flex items-end"
                  >
                    {/* Big rank number behind the card */}
                    <span
                      className="absolute -left-8 bottom-0 select-none font-black leading-none text-[#1a1a1a] z-0"
                      style={{ fontSize: "11rem", WebkitTextStroke: "1px #2a2a2a" }}
                    >
                      {rank}
                    </span>

                    <Link href={`/movies/${typePath}/${item.id}`} className="relative z-10 ml-14">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25 }}>
                       <div>
                   <div className="relative w-56 h-[230px] md:w-64 md:h-[250px] rounded-lg overflow-hidden shadow-xl">
                   <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                         />
                   </div>

                     <div className="mt-7 text-white">
                      <h3 className="text-base font-bold leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                         {item.year}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                          {item.genre}
                          </p>
                      </div>
                    </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            }

            // ---------- DEFAULT / NEW CARD ----------
            return (
              <CarouselItem
                key={item.id}
                className="pl-6 md:pl-10 basis-3/4 sm:basis-1/2 md:basis-2/5 lg:basis-1/5"
              >
                <Link href={`/movies/${typePath}/${item.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="bg-transparent shadow-none border-none">
                      <div className="relative w-full aspect-[2/3] max-w-[240px] rounded-2xl overflow-hidden">
                        {isNew && (
                          <span className="absolute top-2 left-2 z-10 rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                            NEW
                          </span>
                        )}
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-sm"
                        />
                      </div>

                      <CardContent className="p-2 text-white">
                        <p className="text-xs text-gray-400">{item.year}</p>
                        <h3 className="text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {item.genre}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="text-black ml-3 mb-20" />
        <CarouselNext className="text-black mr-4" />
      </Carousel>
    </div>
  );
}