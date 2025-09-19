"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const videos = [
  { id: 1, src: "/reel1.mp4", user: "UserOne", caption: "Cool outfit drop 🔥" },
  { id: 2, src: "/reel2.mp4", user: "UserTwo", caption: "Festive vibes ✨" },
  { id: 3, src: "/reel3.mp4", user: "UserThree", caption: "Best deal of the day 💸" },
];

export default function ExplorePage() {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video) => (
        <section
          key={video.id}
          className="relative h-screen w-full snap-start flex items-center justify-center"
        >
          {/* Video fills full screen */}
          <video
            src={video.src}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70"></div>

          {/* Bottom info */}
          <div className="absolute bottom-20 left-4 text-white max-w-[70%]">
            <p className="font-semibold">@{video.user}</p>
            <p className="text-sm">{video.caption}</p>
          </div>

          {/* Right-side actions */}
          <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 text-white">
            <button onClick={() => toggleLike(video.id)}>
              <Heart
                size={32}
                className={likes[video.id] ? "fill-red-500 text-red-500" : ""}
              />
            </button>
            <button>
              <MessageCircle size={32} />
            </button>
            <button>
              <Share2 size={32} />
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}


/*
"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reels = [
  {
    id: 1,
    video: "/reel1.mp4",
    products: [
      { id: 101, name: "Red Saree", img: "/saree.jpg", price: "₹1299" },
      { id: 102, name: "Gold Earrings", img: "/earrings.jpg", price: "₹499" },
    ],
  },
  {
    id: 2,
    video: "/reel2.mp4",
    products: [
      { id: 201, name: "Kurti Set", img: "/kurti.jpg", price: "₹899" },
      { id: 202, name: "Heels", img: "/heels.jpg", price: "₹799" },
    ],
  },
  {
    id: 3,
    video: "/reel3.mp4",
    products: [
      { id: 301, name: "Western Dress", img: "/dress.jpg", price: "₹1599" },
    ],
  },
];

export default function ExploreReels() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left" || dir === "right") {
      setCurrentIndex((prev) => (prev + 1) % reels.length);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {reels
          .slice(currentIndex, currentIndex + 1)
          .map((reel, index) => (
            <SwipeableReel
              key={reel.id}
              reel={reel}
              onSwipe={handleSwipe}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

function SwipeableReel({ reel, onSwipe }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-20, 20]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (info.offset.x > 150) onSwipe("right");
        else if (info.offset.x < -150) onSwipe("left");
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <video
        src={reel.video}
        className="w-full h-screen object-cover"
        autoPlay
        loop
        muted
      />

      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {reel.products.map((p: any) => (
            <div
              key={p.id}
              className="min-w-[140px] bg-white rounded-lg shadow-md p-2 flex-shrink-0"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-28 object-cover rounded-md"
              />
              <p className="text-sm mt-2 font-medium">{p.name}</p>
              <p className="text-pink-600 font-semibold">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

*/