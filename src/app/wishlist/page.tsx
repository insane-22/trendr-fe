"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Designer Kurtis Collection",
    price: "₹350",
    originalPrice: "₹411",
    discount: "15% off",
    img: "/local/kurti.png",
  },
  {
    id: 2,
    name: "Banarasi Silk Saree",
    price: "₹316",
    originalPrice: "₹339",
    discount: "7% off",
    img: "/local/kurti.png",
  },
  {
    id: 3,
    name: "Embroidered Bollywood Saree",
    price: "₹583",
    originalPrice: "₹646",
    discount: "10% off",
    img: "/local/kurti.png",
  },
];

export default function WishlistManager() {
  const [wishlists, setWishlists] = useState([
    { id: 1, name: "My Wishlist", items: [products[0], products[1]] },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const activeList = wishlists.find((w) => w.id === activeId);

  const addWishlist = () => {
    if (!newName.trim()) return;
    const newList = {
      id: Date.now(),
      name: newName,
      items: [],
    };
    setWishlists([...wishlists, newList]);
    setNewName("");
    setShowModal(false);
    setActiveId(newList.id);
  };

  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">My Wishlists</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 bg-[#9C27B0] text-white px-3 py-1.5 rounded-lg text-sm shadow"
        >
          <Plus size={16} /> New List
        </button>
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
        {activeList?.items.length ? (
          activeList.items.map((item) => (
            <div
              key={item.id}
              className="relative border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <Heart className="fill w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-semibold">{item.price}</span>
                  <span className="text-xs line-through text-gray-500">
                    {item.originalPrice}
                  </span>
                  <span className="text-xs text-green-600">{item.discount}</span>
                </div>
              </div>
            </div>
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
    </div>
  );
}
