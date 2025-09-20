"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Toaster } from "react-hot-toast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExplorePage = pathname.startsWith("/explore");

  return (
    <div className="flex flex-col min-h-screen">
      {!isExplorePage && <Navbar />}
      <Toaster />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
