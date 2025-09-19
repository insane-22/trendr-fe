"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Toaster } from "react-hot-toast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExplorePage = pathname.startsWith("/explore");

  return (
    <>
      {!isExplorePage && <Navbar />}
      <Toaster />
      {children}
    <MobileBottomNav />
    </>
  );
}
