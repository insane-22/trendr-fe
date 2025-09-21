"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:8000";
const currentUsername = "yukta";

interface ProductPhoto {
  id: number;
  photo_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: number;
  photos: ProductPhoto[];
}

interface Wishlist {
  id: number;
  name: string;
  hasProduct: boolean;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}/`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    axios
      .get(`${API_BASE}/api/wishlist/names/`, {
        params: { username: currentUsername, product_id: product.id },
      })
      .then((res) => {
        setWishlists(res.data);
        const isWishlisted = res.data.some((w: Wishlist) => w.hasProduct);
        setWishlisted(isWishlisted);
      })
      .catch((err) => console.error(err));
  }, [product]);

  const handleWishlistClick = () => {
    setShowModal(true);
  };

  const handleAddToWishlist = async (wishlistName: string) => {
    if (!product) return;
    try {
      await axios.post(`${API_BASE}/api/wishlist/add-product/`, {
        product_id: product.id,
        wishlist_name: wishlistName,
        username: currentUsername,
      });

      setWishlists((prev) =>
        prev.map((w) =>
          w.name === wishlistName ? { ...w, hasProduct: true } : w
        )
      );
      setWishlisted(true);
      setShowModal(false);
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to wishlist");
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        <p className="mt-4 text-gray-600">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div>
          {product.photos.length > 0 && (
            <Image
              src={product.photos[0].photo_url}
              alt={product.name}
              width={500}
              height={500}
              className="h-auto object-contain rounded-md border"
              priority
            />
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.photos.map((photo) => (
              <Image
                key={photo.id}
                src={photo.photo_url}
                alt={`${product.name}-${photo.id}`}
                width={80}
                height={80}
                className="border rounded-md cursor-pointer hover:ring-2 hover:ring-purple-500"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <div className="mt-2 text-sm sm:text-base text-gray-600">
            ⭐ {product.rating}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-gray-700 font-medium">Select Size</p>
              <p className="mt-1 border rounded-md px-3 py-2 inline-block text-sm sm:text-base">
                M, L, XL
              </p>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleWishlistClick}
                className="p-2 rounded-full bg-white shadow hover:bg-pink-50 mt-2"
              >
                <Heart
                  className={`w-6 h-6 ${
                    wishlisted ? "text-red-500" : "text-gray-400"
                  }`}
                  fill={wishlisted ? "red" : "none"}
                />
              </button>
              <span className="text-xs text-gray-500 mt-1">
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-md font-medium hover:bg-purple-50 text-sm sm:text-base">
              Add to Cart
            </button>
            <button className="flex-1 bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 text-sm sm:text-base">
              Buy Now
            </button>
          </div>

          <div className="mt-6 sm:mt-8 mb-10">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Details
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Select Wishlist</h2>
            <div className="flex flex-col gap-2">
              {wishlists.map((wishlist) => (
                <button
                  key={wishlist.id}
                  onClick={() => handleAddToWishlist(wishlist.name)}
                  className={`px-3 py-2 rounded-md border ${
                    wishlist.hasProduct
                      ? "bg-purple-600 text-white border-purple-600"
                      : "text-purple-600 border-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {wishlist.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 w-full px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
