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
      {/* Profile Button - Healthcare Style */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/20 flex items-center space-x-3 p-2 rounded-lg text-gray-800 font-medium backdrop-blur-sm"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-400/50 group-hover:ring-blue-400 transition-all">
          <Image
            src={user?.image || "/UserImage.png"}
            alt="Profile"
            fill
            className="object-cover"
          />
          {/* Online status indicator */}
          {isAuthenticated && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white"></div>
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-bold text-blue-400">
            {user?.name?.split(" ")[0] || "Guest"}
          </p>
          <p className="text-xs font-medium text-blue-400">
            {isAuthenticated ? "Patient Portal" : "Sign In"}
          </p>
        </div>
      </button>

      {/* Dialog - Healthcare Style with Glassmorphism */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Patient Portal</h2>
                <p className="text-blue-200">
                  {isAuthenticated ? "Manage your health profile" : "Access your health records"}
                </p>
              </div>
            </div>

            {/* Profile Image with Healthcare styling */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4 group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all">
                  <Image
                    src={user?.image || "/UserImage.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                {isAuthenticated && (
                  <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300">
                    <User className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isUploading}
                    />
                  </label>
                )}
                {/* Health indicator */}
                {isAuthenticated && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
                    ✓
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-white">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-blue-200">{user?.email || ""}</p>
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs border border-emerald-500/30">
                    <Heart className="w-3 h-3" />
                    Active Patient
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons - Healthcare Style */}
            <div className="space-y-3">
              {isAuthenticated ? (
                <>
                  <Button
                    className="w-full justify-start bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span>Health Dashboard</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span>My Appointments</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard");
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span>Medical Records</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <LogOut className="w-4 h-4 text-white" />
                    </div>
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/login");
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                      <LogIn className="w-4 h-4 text-white" />
                    </div>
                    <span>Sign In to Patient Portal</span>
                  </Button>

                  <Button
                    className="w-full justify-start bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/signup");
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span>Create Patient Account</span>
                  </Button>
                </>
              )}

              <Button
                className="w-full justify-start bg-white/5 backdrop-blur-sm hover:bg-white/10 text-blue-200 hover:text-white border border-white/10 transition-all duration-300 mt-4"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="w-4 h-4 mr-3" />
                Close
              </Button>
            </div>

            {/* Trust badge */}
            {isAuthenticated && (
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-blue-200">
                  🔒 HIPAA Compliant • Secure Portal
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