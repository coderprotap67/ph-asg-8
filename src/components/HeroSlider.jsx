"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Summer Sale 50% OFF",
    subtitle: "Upgrade your seasonal loadout with premium lightweight gear.",
    bg: "from-amber-400 to-orange-500"
  },
  {
    title: "Hot Deals Ready",
    subtitle: "High-protection items optimized for ultimate thermal comfort.",
    bg: "from-rose-400 to-pink-500"
  },
  {
    title: "New Summer Collection",
    subtitle: "Fresh minimalist designs crafted for high breathability standards.",
    bg: "from-teal-400 to-emerald-500"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl shadow-2xl">
      {slides.map((slide, index) => (
        index === current && (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.bg} text-white flex flex-col justify-center px-8 md:px-16`}
          >
            <div className="max-w-xl space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">{slide.title}</h1>
              <p className="text-lg opacity-90 drop-shadow-sm">{slide.subtitle}</p>
              <div className="pt-4">
                <Link href="/products" className="btn bg-white text-neutral border-none hover:bg-slate-100 px-8 rounded-xl font-bold shadow-lg">
                  Shop Now
                </Link>
              </div>
            </div>
          </motion.div>
        )
      ))}
    </div>
  );
}