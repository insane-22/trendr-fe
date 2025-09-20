// app/product/[id]/page.tsx
import Image from "next/image";

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

export default async function ProductPage({ params }: { params: any }) {
  // Next 13+ requires this "await params" pattern for dynamic routes
  const { id } = await params; // <-- await params before accessing id

  const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
    cache: "no-store", // always fresh
  });

  if (!res.ok) return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
      <p className="mt-4 text-gray-600">The product you are looking for does not exist.</p>
    </div>
  )

  const product: Product = await res.json();
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
            ⭐ {product.rating} ratings
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
    </main>
  );
}
