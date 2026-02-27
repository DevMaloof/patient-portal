// /components/logotext.tsx - Light theme version
import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

const LogoText = () => {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
        <Heart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-blue-300">
          Maloof Health
        </span>
        <span className="text-xs text-blue-300 font-medium">PATIENT PORTAL</span>
      </div>
    </Link>
  );
};

export default LogoText;