'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlay,
  FaInfoCircle,
  FaStar,
  FaRegCalendarAlt,
  FaRegClock,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// IDs you want featured in the slider
const FEATURED_IDS = [8, 17, 23];
function splitTitle(fullTitle = '') {
  const words = fullTitle.trim().split(' ');
  if (words.length <= 1) {
    return { title: fullTitle, subtitle: '' };
  }
  const firstWord = words[0];
  const rest = words.slice(1).join(' ');
  return { title: firstWord, subtitle: rest };
}

// Converts a raw row from your backend into the shape this slider uses
function mapToSlide(row) {
  const { title, subtitle } = splitTitle(row.title);
  return {
    id: row.id,
    title,
    subtitle,
    backdrop: row.image,
    type: row.type ? row.type.split(',')[0].trim().toLowerCase() : 'movies',
    featured: false,
    matchPercent: row.rating ? Math.round((row.rating / 5) * 100) : undefined,
    quality: undefined,
    imdbRating: row.imdb > 0 ? row.imdb : undefined,
    releaseYear: row.releasedyear,
    duration: undefined,
    genres: row.genre ? row.genre.split(',').map((g) => g.trim()) : [],
    description: row.description,
    cast: row.casts
      ? row.casts.split(',').map((name) => ({
          name: name.trim(),
          avatar: 'https://i.pravatar.cc/80',
        }))
      : [],
  };
}

export function HeroSlider() {
  const swiperRef = useRef(null);
  const router = useRouter();

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchFeatured(signal) {
    setLoading(true);
    try {
      const results = await Promise.all(
        FEATURED_IDS.map(async (id) => {
          const res = await fetch(`https://streamora-fullstack-movie-app.onrender.com/movies/${id}`, { signal });
          if (!res.ok) throw new Error(`Movie ${id} not found`);
          return res.json();
        })
      );
      setSlides(results.map(mapToSlide));
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching featured movies:', error);
        setSlides([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchFeatured(controller.signal);
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center bg-black text-gray-400">
        Loading featured titles...
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center bg-black text-gray-500">
        No featured titles available.
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Backdrop */}
              <Image
                src={slide.backdrop}
                alt={`${slide.title} ${slide.subtitle ?? ''}`}
                fill
                priority
                className="object-cover blur-[1px]"
              />
              {/* Gradients for legibility */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                <div className="max-w-xl">
                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {slide.featured && (
                      <span className="flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                        ✨ FEATURED
                      </span>
                    )}
                    {typeof slide.matchPercent === 'number' && (
                      <span className="rounded-md bg-green-600 px-2.5 py-1 text-xs font-bold text-white">
                        {slide.matchPercent}% Match
                      </span>
                    )}
                    {slide.quality && (
                      <span className="rounded-md border border-white/30 px-2.5 py-1 text-xs font-bold text-white">
                        {slide.quality}
                      </span>
                    )}
                    {typeof slide.imdbRating === 'number' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-yellow-400">
                        <FaStar /> {slide.imdbRating}
                      </span>
                    )}
                    {slide.releaseYear && (
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-300">
                        <FaRegCalendarAlt /> {slide.releaseYear}
                      </span>
                    )}
                    {slide.duration && (
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-300">
                        <FaRegClock /> {slide.duration}
                      </span>
                    )}
                  </div>

                  {/* Animated title block */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
                        <span className="text-white">{slide.title} </span>
                        {slide.subtitle && (
                          <span className="text-red-600">{slide.subtitle}</span>
                        )}
                      </h1>

                      {slide.genres?.length > 0 && (
                        <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-gray-300">
                          {slide.genres.map((genre, i) => (
                            <span key={genre} className="flex items-center gap-2">
                              {i > 0 && <span className="text-red-600">|</span>}
                              {genre.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}

                      {slide.description && (
                        <p className="mt-3 max-w-md text-xs leading-relaxed text-gray-200 md:text-sm">
                          {slide.description}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => router.push(`/movies/${slide.type}/${slide.id}`)}
                          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition-colors duration-200 hover:bg-gray-200 md:text-sm"
                        >
                          <FaPlay className="text-xs" /> Play Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => router.push(`/movies/${slide.type}/${slide.id}`)}
                          className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 md:text-sm"
                        >
                          <FaInfoCircle /> More Info
                        </motion.button>
                      </div>

                      {/* Cast */}
                      {slide.cast?.length > 0 && (
                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-xs text-gray-400">Starring:</span>
                          <div className="flex items-center gap-3">
                            {slide.cast.map((actor) => (
                              <div key={actor.name} className="flex items-center gap-1.5">
                                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/20">
                                  <Image
                                    src={actor.avatar}
                                    alt={actor.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs font-medium text-white">
                                  {actor.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev / Next arrows */}
      <button
        className="hero-prev absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-200 hover:bg-black/80"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        className="hero-next absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-200 hover:bg-black/80"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Pagination dots */}
      <div className="hero-pagination absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2" />

      <style jsx global>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          background: #dc2626;
          width: 22px;
          border-radius: 9999px;
          transition: width 0.25s ease;
        }
      `}</style>
    </div>
  );
}

export default HeroSlider;