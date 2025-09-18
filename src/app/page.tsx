import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative w-full">
        <div className="hidden md:block">
          <Image
            src="/image2.png"
            alt="Smart Shopping"
            width={1920}
            height={534}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-end max-w-7xl mx-auto px-6">
            <div className="text-right">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-50 leading-snug">
                Smart Shopping
              </h2>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-50 leading-snug">
                Trusted by Millions
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-6 inline-block bg-[#9C27B0] text-white px-6 py-3 rounded-md shadow hover:bg-[#7B1FA2] transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="block md:hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-12 px-6">
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
            Smart Shopping
          </h2>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug mt-1">
            Trusted by Millions
          </h2>
          <Link
            href="/products"
            className="mt-6 inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-orange-200 to-pink-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-4 px-6 py-6 text-sm text-gray-800 font-medium">
          <div className="flex items-center gap-2">
            <span>🚚</span> 7 Days Easy Return
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span> Cash on Delivery
          </div>
          <div className="flex items-center gap-2">
            <span>🔥</span> Lowest Prices
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Mega Deals
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4, 5, 6,7,8].map((i) => (
            <div
              key={i}
              className="min-w-[150px] sm:min-w-[180px] border rounded-lg bg-white shadow-sm p-2 hover:shadow-md transition"
            >
              <Image
                src="/image3.png"
                alt={`Product ${i}`}
                width={150}
                height={150}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="text-sm mt-2 text-gray-700">Product {i}</p>
              <p className="text-pink-600 font-medium">₹{99 + i * 20}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
