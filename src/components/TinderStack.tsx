"use client";

import axios from "axios";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;;
const currentUsername = "bhumi";
const defaultWishlistName = "bhumi";

export function TinderStack({ products, onClose }: any) {
  const [index, setIndex] = useState(0);

  const handleSwipe = async (dir: "left" | "right") => {
    const product=products[index];
    if (dir === "right") {
      try {
        await axios.post(`${API_BASE}/api/wishlist/add-product/`, {
          product_id: product.id,
          wishlist_name: defaultWishlistName,
          username: currentUsername,
        });
        toast.success(`${product.name} added to wishlist ❤️`);
      } catch (err: any) {
        console.error("Failed to add product:", err);
        toast.error(err.response?.data?.error || "Failed to add product");
      }

    } else {
      toast(`Skipped ${product.name}`);
    }

    if (index < products.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {products.slice(index, index + 1).map((product: any) => (
          <SwipeCard key={product.id} product={product} onSwipe={handleSwipe} />
        ))}
      </AnimatePresence>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-white text-black px-3 py-1 rounded-md shadow"
      >
        ✕ Close
      </button>
    </div>
  );
}

function SwipeCard({ product, onSwipe }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 120; 
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, opacity }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="absolute w-72 h-[360px] bg-white rounded-2xl shadow-xl p-4 flex flex-col"
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-pink-600 font-bold">{product.price}</p>
      </div>
    </motion.div>
  );
}
