// /components/dialog.tsx - Updated button colors
"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  User,
  LogOut,
  LogIn,
  Heart,
  Activity,
  Calendar,
  FileText,
  Shield,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dialogcode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/user/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        window.location.reload();
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Profile Button - Compact */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-800/80 hover:bg-slate-700/80 flex items-center space-x-2 p-1.5 rounded-lg text-white font-medium backdrop-blur-sm border border-white/10 transition-all duration-300"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-400/50 transition-all">
          <Image
            src={user?.image || "/UserImage.png"}
            alt="Profile"
            fill
            className="object-cover"
          />
          {isAuthenticated && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-1 ring-slate-800"></div>
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-white">
            {user?.name?.split(" ")[0] || "Guest"}
          </p>
          <p className="text-xs font-medium text-blue-400">
            {isAuthenticated ? "Patient" : "Sign In"}
          </p>
        </div>
      </button>

      {/* Dialog - Smaller & Compact */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Section - Compact */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all">
                  <Image
                    src={user?.image || "/UserImage.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                {isAuthenticated && (
                  <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-1.5 rounded-full cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300">
                    <User className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isUploading}
                    />
                  </label>
                )}
                {isAuthenticated && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] border-2 border-slate-900">
                    ✓
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-white">
                  {user?.name?.split(" ")[0] || "Guest"}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-[180px]">{user?.email || ""}</p>
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-emerald-500/20 rounded-full text-emerald-300 text-[10px] border border-emerald-500/30">
                    <Heart className="w-2.5 h-2.5" />
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons - Fixed Dark Theme */}
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                      <Activity className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>Health Dashboard</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>My Appointments</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                      <FileText className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>Medical Records</span>
                  </Button>

                  <div className="pt-2 border-t border-white/10 mt-2">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                        <LogOut className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/login");
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                      <LogIn className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>Sign In</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 h-10 text-sm shadow-md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/signup");
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mr-2">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>Create Account</span>
                  </Button>
                </>
              )}

              <Button
                className="w-full justify-center bg-slate-700 hover:bg-slate-600 text-gray-200 hover:text-white border border-white/10 transition-all duration-300 h-9 text-xs mt-1"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="w-3.5 h-3.5 mr-2" />
                Close
              </Button>
            </div>

            {/* Trust badge - Compact */}
            {isAuthenticated && (
              <div className="mt-3 pt-2 border-t border-white/10 text-center">
                <p className="text-[10px] text-gray-500">
                  🔒 HIPAA Compliant
                </p>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Dialogcode;