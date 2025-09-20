"use client";

import { useState, useEffect } from "react";
import { TinderStack } from "@/components/TinderStack";
import { LinkIcon } from "lucide-react";

interface ProductPhoto {
  id: number;
  photo_url: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  photos: ProductPhoto[];
}

interface Video {
  id: number;
  video_url: string;
  caption: string;
  likes: number;
  uploader_name: string;
  products: Product[];
}

export default function ExploreReels() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/videos/");
        const data: Video[] = await res.json();

        const videosWithUploader = data.map((v) => ({
          ...v,
          uploader_name: v.uploader_name || "Unknown",
        }));

        setVideos(videosWithUploader);
        setLikes(
          Object.fromEntries(videosWithUploader.map((v) => [v.id, v.likes]))
        );
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleLiked = async (videoId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/videos/${videoId}/like/`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setLikes((prev) => ({ ...prev, [videoId]: data.likes }));
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleShare = async (video: Video) => {
    const shareData = {
      title: "Check out this Trendr Reel",
      text: `${video.uploader_name} - ${video.caption}`,
      url: window.location.href + `?video=${video.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-white p-6">Loading reels...</div>;

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video) => (
        <div
          key={video.id}
          className="relative w-full h-screen snap-start flex items-center justify-center"
        >
          <video
            src={video.video_url}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            preload="metadata"
          />

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute top-6 left-4 text-white max-w-xs">
            <p className="font-semibold text-lg">{video.uploader_name}</p>
            <p className="text-sm text-gray-200 line-clamp-2">
              {video.caption}
            </p>
          </div>

          <div className="absolute bottom-24 right-3 flex flex-col items-center gap-4 text-white">
            <div className="flex flex-row items-center gap-6">
              <button
                onClick={() => handleLiked(video.id)}
                className="flex flex-col items-center"
              >
                <span className="text-2xl">❤️</span>
                <span className="text-sm">{likes[video.id]}</span>
              </button>
              <button
                onClick={() => handleShare(video)}
                className="flex flex-col items-center"
              >
                <LinkIcon className="text-2xl" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            <button
              onClick={() => setShowProducts(video.id)}
              className="bg-white text-black px-3 py-1.5 rounded-lg shadow font-semibold text-xs"
            >
              See Products
            </button>
          </div>

          {showProducts === video.id && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
              <TinderStack
                products={video.products.map((p) => ({
                  ...p,
                  img: p.photos[0]?.photo_url || "/placeholder.png",
                }))}
                onClose={() => setShowProducts(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
