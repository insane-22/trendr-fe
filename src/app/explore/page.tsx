"use client";

import { useState } from "react";
import { TinderStack } from "@/components/TinderStack";
import { LinkIcon } from "lucide-react";

const reels = [
  {
    id: 1,
    video: "/local/reel3.mp4",
    creator: "Riya Patel",
    description: "Casual kurti outfit for daily wear 🌸",
    likes: 85,
    products: [
      { id: 101, name: "Red Saree", img: "/local/kurti.png", price: "₹1299" },
      {
        id: 102,
        name: "Gold Earrings",
        img: "/local/kurti.png",
        price: "₹499",
      },
    ],
  },
  {
    id: 2,
    video: "/local/reel2.mp4",
    creator: "Ananya Sharma",
    description: "Styling a gorgeous festive saree with gold accessories ✨",
    likes: 120,
    products: [
      { id: 201, name: "Kurti Set", img: "/local/kurti.png", price: "₹899" },
      { id: 202, name: "Heels", img: "/local/kurti.png", price: "₹799" },
    ],
  },
];

export default function ExploreReels() {
  const [showProducts, setShowProducts] = useState<number | null>(null);
  const [likes, setLikes] = useState(
    Object.fromEntries(reels.map((r) => [r.id, r.likes]))
  );

  const handleLiked = (reelId: number) => {
    setLikes((prev) => ({
      ...prev,
      [reelId]: prev[reelId] + 1,
    }));
  };

  const handleShare = async (reel: any) => {
    const shareData = {
      title: "Check out this Trendr Reel",
      text: `${reel.creator} - ${reel.description}`,
      url: window.location.href + `?reel=${reel.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="relative w-full h-screen snap-start flex items-center justify-center"
        >
          <video
            src={reel.video}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute top-6 left-4 text-white max-w-xs">
            <p className="font-semibold text-lg">{reel.creator}</p>
            <p className="text-sm text-gray-200 line-clamp-2">
              {reel.description}
            </p>
          </div>

          <div className="absolute bottom-24 right-3 flex flex-col items-center gap-4 text-white">
            <div className="flex flex-row items-center gap-6">
              <button
                onClick={() => handleLiked(reel.id)}
                className="flex flex-col items-center"
              >
                <span className="text-2xl">❤️</span>
                <span className="text-sm">{likes[reel.id]}</span>
              </button>
              <button
                onClick={() => handleShare(reel)}
                className="flex flex-col items-center"
              >
                <LinkIcon className="text-2xl" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            <button
              onClick={() => setShowProducts(reel.id)}
              className="bg-white text-black px-3 py-1.5 rounded-lg shadow font-semibold text-xs"
            >
              See Products
            </button>
          </div>

          {showProducts === reel.id && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
              <TinderStack
                products={reel.products}
                onClose={() => setShowProducts(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
