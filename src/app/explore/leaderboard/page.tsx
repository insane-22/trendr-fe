"use client";

import { useState } from "react";

const weeklyBest = {
  featured: {
    id: 1,
    video: "/local/reel3.mp4",
    creator: "Riya Patel",
    category: "Casual",
    description: "Casual kurti outfit for daily wear 🌸",
    likes: 320,
  },
  categories: [
    {
      category: "Festive",
      reel: {
        id: 2,
        video: "/local/reel2.mp4",
        creator: "Ananya Sharma",
        description: "Styling a gorgeous festive saree with gold accessories ✨",
        likes: 500,
      },
    },
    {
      category: "Casual",
      reel: {
        id: 3,
        video: "/local/reel1.mp4",
        creator: "Priya Singh",
        description: "Comfy summer outfit ☀️",
        likes: 280,
      },
    },
    {
      category: "Accessories",
      reel: {
        id: 4,
        video: "/local/reel4.mp4",
        creator: "Sneha Verma",
        description: "Jewelry styling inspo 💍",
        likes: 150,
      },
    },
  ],
};

export default function WeeklyBest() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="relative w-full h-[80vh] flex items-center justify-center">
        <video
          src={weeklyBest.featured.video}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-6">
          <p className="text-xl font-bold">{weeklyBest.featured.creator}</p>
          <p className="text-gray-200">{weeklyBest.featured.description}</p>
          <p className="mt-2 text-pink-500 font-semibold">
            {weeklyBest.featured.category} · ❤️ {weeklyBest.featured.likes}
          </p>
        </div>
      </div>

      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">🏆 Best by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeklyBest.categories.map((cat) => (
            <div
              key={cat.category}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <video
                src={cat.reel.video}
                className="w-full h-64 object-cover"
                loop
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-semibold">{cat.category}</p>
                <p className="text-sm">{cat.reel.creator}</p>
                <p className="text-pink-400 text-sm">❤️ {cat.reel.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
