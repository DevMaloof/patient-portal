// /app/login/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { Heart, Loader2, Mail, CheckCircle, Stethoscope, Activity, Shield, Users } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Run this only on the client
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);

      const verified = searchParams.get("verified");
      const expired = searchParams.get("expired");

      if (verified === "1") {
        toast.success("✅ Email verified successfully!");
      } else if (expired === "1") {
        toast.error("⏳ Verification link has expired. Please sign up again.");
      } else if (verified === "0") {
        toast.error("❌ Invalid verification link. Please sign up again.");
      }

      // Remove query params after showing toast
      if (verified || expired) {
        const url = new URL(window.location.href);
        url.searchParams.delete("verified");
        url.searchParams.delete("expired");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
          <Heart className="absolute inset-0 m-auto text-blue-400 w-16 h-16 animate-pulse" />
        </div>
        <div className="text-center backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
          <p className="text-blue-100 text-xl font-medium mb-2">Welcome back to</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Maloof Health</h1>
          </div>
          <p className="text-blue-200/70">Preparing your secure login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="w-full flex flex-col items-center px-4 sm:px-6 pt-20 lg:pt-32 pb-8">
          <div className="max-w-md w-full">
            {/* Logo and Brand */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                <Heart className="w-12 h-12 text-blue-400" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</h1>
                </div>
                <p className="text-blue-200/70">Welcome back to your patient portal</p>
              </div>
            </div>

            <LoginForm />
          </div>
        </div>

        {/* Right Side - Video/Image */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/50 to-transparent" />
          <video
            src="/medical-hero.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Welcome Back</h3>
                  <p className="text-blue-100">Access your health records securely</p>
                </div>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>View medical records & test results</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Schedule appointments</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Message your healthcare team</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Request prescription refills</span>
                </li>
              </ul>

              {/* Security Badge */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <Shield className="w-4 h-4" />
                  <span>HIPAA Compliant • 256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;