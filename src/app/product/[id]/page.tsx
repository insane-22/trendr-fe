import { products } from "@/data/product";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-6 text-center text-sm md:text-base">Product not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className=" h-auto object-contain rounded-md border"
            priority
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
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
            <span className="line-through text-gray-400 text-sm sm:text-base">
              ₹{product.originalPrice}
            </span>
            <span className="text-green-600 font-medium text-sm sm:text-base">
              {product.discount}
            </span>
          </div>

          <div className="mt-2 text-sm sm:text-base text-gray-600">
            ⭐ {product.rating} ({product.reviews} Reviews,{" "}
            {product.ratingsCount} Ratings)
          </div>

          <div className="mt-4">
            <p className="text-gray-700 font-medium">Select Size</p>
            <p className="mt-1 border rounded-md px-3 py-2 inline-block text-sm sm:text-base">
              {product.size}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-md font-medium hover:bg-purple-50 text-sm sm:text-base">
              Add to Cart
            </button>
            <button className="flex-1 bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 text-sm sm:text-base">
              Buy Now
            </button>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Details
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              {product.details}
            </p>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              <strong>Brand:</strong> {product.brand}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
