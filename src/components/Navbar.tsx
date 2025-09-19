"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User2, Menu, X } from "lucide-react";
import SearchInput from "./SearchInput";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linksData = [
    { path: "/women-ethnic", name: "Women Ethnic" },
    { path: "/women-western", name: "Women Western" },
    { path: "/men", name: "Men" },
    { path: "/kids", name: "Kids" },
    { path: "/home-kitchen", name: "Home & Kitchen" },
    { path: "/beauty-health", name: "Beauty & Health" },
    { path: "/jewellery", name: "Jewellery & Accessories" },
    { path: "/bags-footwear", name: "Bags & Footwear" },
    { path: "/electronics", name: "Electronics" },
    { path: "/sports", name: "Sports & Fitness" },
    { path: "/automobile", name: "Car & Motorbike" },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/image.png"
            alt="logo"
            width={120}
            height={30}
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl px-6">
          <SearchInput />
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/supplier" className="hover:text-[#9C27B0]">
              Become a Supplier
            </Link>
            |
            <Link href="/investor" className="hover:text-[#9C27B0]">
              Investor Relations
            </Link>
            |
          </div>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-0.5 hover:text-[#9C27B0] text-gray-700"
          >
            <User2 className="h-5 w-5" />
            <span className="hidden md:block">Profile</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center gap-0.5 hover:text-[#9C27B0] text-gray-700 relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:block">Cart</span>
            <span className="absolute top-0 right-[-8px] text-xs bg-[#9C27B0] text-white rounded-full px-1">
              0
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-[#9C27B0]"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchInput />
      </div>

      <nav className="hidden md:flex items-center justify-center border-t border-gray-200 bg-white text-sm font-medium">
        <ul className="flex gap-8 px-6 py-3">
          {linksData.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                className="hover:text-[#9C27B0] transition-colors text-gray-700"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white text-sm font-medium">
          <ul className="flex flex-col gap-4 px-4 py-4">
            {linksData.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.path}
                  className="block hover:text-[#9C27B0] transition-colors text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
