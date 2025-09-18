"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full h-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <Search/>
      </span>

      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Search for products, categories..."}
        className="pl-10 pr-4 py-2 w-full border-gray-300 focus-visible:ring-[#9C27B0] focus-visible:border-[#9C27B0] rounded-lg"
      />
    </div>
  );
}

