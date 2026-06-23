"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const params = useParams(); // URL থেকে প্রোডাক্টের :id নেওয়ার জন্য
  
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  // 🔒 ১. প্রোটেক্টেড রুট লজিক: ইউজার লগইন না থাকলে ব্যাকআউট করানো
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view product details!");
      router.push(`/login?callbackUrl=/products/${params.id}`);
    }
  }, [session, isPending, router, params.id]);

  // 📦 ২. ডাটাবেজ/এপিআই থেকে নির্দিষ্ট প্রোডাক্টের ডাটা ফেচ করা
  useEffect(() => {
    if (session) {
      setLoadingProduct(true);
      // আপনার ব্যাকএন্ড এপিআই রুট অনুযায়ী চেঞ্জ করতে পারেন (যেমন: /api/products/${params.id})
      fetch(`/api/products/${params.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load product details!");
        })
        .finally(() => {
          setLoadingProduct(false);
        });
    }
  }, [session, params.id]);

  // 🔄 ৩. সেশন বা প্রোডাক্ট ডাটা লোড হওয়ার সময়ের স্পিনার
  if (isPending || (session && loadingProduct)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ✅ ৪. ইউজার লগইন থাকলে এবং প্রোডাক্ট ডাটা পাওয়া গেলে স্ক্রিনে রেন্ডার করা
  if (session?.user && product) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ব্যাক বাটন */}
        <Link href="/" className="btn btn-sm btn-ghost gap-2 mb-6 rounded-xl">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100">
          {/* প্রোডাক্ট ইমেজ */}
          <div className="flex justify-center items-center bg-slate-50 rounded-2xl p-4 min-h-[300px]">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[350px] object-contain rounded-xl hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-slate-300 text-sm">No Image Available</div>
            )}
          </div>

          {/* প্রোডাক্টের বিবরণ */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="badge bg-[#ff6b6b]/10 text-[#ff6b6b] border-none font-semibold px-3 py-1 rounded-lg text-xs">
                {product.category || "Summer Essential"}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl font-bold text-[#ff6b6b] pt-1">
                ${product.price}
              </p>
              <div className="divider"></div>
              <h3 className="font-bold text-sm text-slate-600">Product Description</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {product.description || "No description available for this item."}
              </p>
            </div>

            {/* কার্ট বা অ্যাকশন বাটন */}
            <div className="pt-4">
              <button 
                onClick={() => toast.success("Added to cart! 🛒")}
                className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg bg-[#ff6b6b] border-none hover:bg-[#ff5252] h-12"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}