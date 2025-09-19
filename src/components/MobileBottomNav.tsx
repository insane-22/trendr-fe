"use client";

import Link from "next/link";
import { Home, ShoppingBag, HelpCircle, User2, ListVideo } from "lucide-react";

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
      <div className="flex justify-around items-center h-14">
        <Link
          href="/"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          href="/explore"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600"
        >
          <ListVideo size={20} />
          <span>Explore</span>
        </Link>

        <Link
          href="/orders"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600"
        >
          <ShoppingBag size={20} />
          <span>My Orders</span>
        </Link>

        <Link
          href="/help"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600"
        >
          <HelpCircle size={20} />
          <span>Help</span>
        </Link>

        <Link
          href="/account"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600"
        >
          <User2 size={20} />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}
