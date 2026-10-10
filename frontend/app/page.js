'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("user/signup");
    }, 2600);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      
      <motion.h1
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="text-5xl md:text-7xl font-extrabold tracking-widest
          bg-linear-to-r
          from-[#820000]
          via-[#ef2626]
          to-[#d92626]
          bg-clip-text text-transparent
        "
      >
        STREAMORA
      </motion.h1>

    </div>
  );
}
