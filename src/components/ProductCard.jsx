"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card card-compact bg-white/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 overflow-hidden"
    >
      <figure className="relative h-56 w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm text-neutral text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {product.category}
        </span>
      </figure>
      <div className="card-body p-5">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{product.brand}</span>
        <h2 className="card-title text-lg font-bold text-neutral min-h-[56px] items-start">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-amber-500">★ {product.rating}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link href={`/products/${product.id}`} className="btn btn-primary btn-sm text-white w-full gap-2 rounded-lg">
            <span>View Details</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}