"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import axios from "axios";
import Link from "next/link";

const API_BASE = "http://localhost:8000";

interface Product {
  id: number;
  name: string;
  price: number;
  photos: { id: number; photo_url: string }[];
}

interface SharedWishlist {
  id: number;
  name: string;
  products: Product[];
  shared_by: string;
}

export default function SharedWishlistPage() {
  const params = useParams();
  const { share_code } = params as { share_code: string };
  const [wishlist, setWishlist] = useState<SharedWishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSharedWishlist();
  }, [share_code]);

  const fetchSharedWishlist = async () => {
    setLoading(true);
    try {
      const res = await axios.get<SharedWishlist>(
        `${API_BASE}/api/wishlist/view-shared-wishlist/`,
        { params: { share_code } }
      );
      setWishlist(res.data);
      setError("");
    } catch (err: any) {
      console.error("Failed to fetch shared wishlist:", err);
      setError(err.response?.data?.error || "Could not fetch shared wishlist");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4">Loading shared wishlist...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!wishlist) return null;

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-lg font-bold">{wishlist.name}</h1>
      <p className="text-sm text-gray-500">Shared by {wishlist.shared_by}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {wishlist.products.length ? (
          wishlist.products.map((item) => (
            <Link
            href={`/product/${item.id-1}`}
            target="_blank"
              key={item.id}
              className="relative border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.photos[0]?.photo_url || "/local/kurti.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <Heart className="fill w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-semibold">{item.price}</span>
                  <span className="text-xs line-through text-gray-500">
                    {(item.price * 1.1).toFixed(0)}
                  </span>
                  <span className="text-xs text-green-600">{"10% off"}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 text-sm">
            No items in this shared wishlist.
          </p>
        )}
      </div>
    </div>
  );
}
