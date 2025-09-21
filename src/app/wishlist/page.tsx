"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Plus, Clipboard } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const API_BASE = "http://localhost:8000";
const currentUsername = "yukta";
// const products = [
//   {
//     id: 1,
//     name: "Designer Kurtis Collection",
//     price: "₹350",
//     originalPrice: "₹411",
//     discount: "15% off",
//     img: "/local/kurti.png",
//   },
//   {
//     id: 2,
//     name: "Banarasi Silk Saree",
//     price: "₹316",
//     originalPrice: "₹339",
//     discount: "7% off",
//     img: "/local/kurti.png",
//   },
//   {
//     id: 3,
//     name: "Embroidered Bollywood Saree",
//     price: "₹583",
//     originalPrice: "₹646",
//     discount: "10% off",
//     img: "/local/kurti.png",
//   },
// ];

interface Product {
  id: number;
  name: string;
  price: number;
  photos: { id: number; photo_url: string }[];
}

interface Wishlist {
  id: number;
  name: string;
  products: Product[];
}

export default function WishlistManager() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [activeId, setActiveId] = useState(1);
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const res = await axios.get<Wishlist[]>(`${API_BASE}/api/wishlist/`, {
        params: { username: currentUsername },
      });
      setWishlists(res.data);
      if (res.data.length > 0) setActiveId(res.data[0].id);
    } catch (err) {
      console.error("Failed to fetch wishlists:", err);
    }
  };

  const addWishlist = () => {
    if (!newName.trim()) return;

    axios
      .post<Wishlist>(`${API_BASE}/api/wishlist/create/`, {
        name: newName,
        username: currentUsername,
      })
      .then((res) => {
        setWishlists([...wishlists, res.data]);
        setActiveId(res.data.id);
        setNewName("");
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Failed to create wishlist:", err);
        toast.error(err.response?.data?.error || "Something went wrong");
      });
  };

  const shareWishlist = async (wishlistName: string) => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/wishlist/create-shared-wishlist/`,
        {
          username: currentUsername,
          wishlist_name: wishlistName,
        }
      );
      const code = res.data.share_code;
      setShareLink(`${window.location.origin}/shared/${code}`);
      setShareModal(true);
    } catch (err) {
      console.error("Failed to create share link:", err);
    }
  };

  const activeList = wishlists.find((w) => w.id === activeId);

  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">My Wishlists</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 bg-[#9C27B0] text-white px-3 py-1.5 rounded-lg text-sm shadow"
          >
            <Plus size={16} /> New List
          </button>
          {activeList && (
            <button
              onClick={() => shareWishlist(activeList.name)}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm shadow"
            >
              Share
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {wishlists.map((list) => (
          <button
            key={list.id}
            onClick={() => setActiveId(list.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              list.id === activeId
                ? "bg-[#9C27B0] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {list.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {activeList?.products.length ? (
          activeList.products.map((item) => (
            <Link
              href={`/product/${item.id}`}
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
            No items in this wishlist.
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Create New Wishlist</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter wishlist name"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={addWishlist}
                className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {shareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Share Link</h2>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast.success(`Added to wishlist ❤️`);
                }}
                className="bg-gray-200 rounded-lg p-2 hover:bg-gray-300 cursor-pointer"
                title="Copy link"
              >
                <Clipboard size={16} />
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShareModal(false)}
                className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
