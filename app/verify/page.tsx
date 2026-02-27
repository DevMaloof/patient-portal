// /app/verify/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Heart, Activity, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

// Move the main content to a separate component that uses useSearchParams
function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams?.get("token") ?? "";

    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch(`/api/verify?token=${encodeURIComponent(token)}`, {
                    redirect: "follow", // ✅ follow server redirects
                });

                // ✅ If API returns a redirect, handle it properly
                if (res.redirected) {
                    setStatus("success");
                    toast.success("✅ Email verified successfully!");
                    router.push(res.url);
                    return;
                }

                // ✅ Normal success case
                if (res.ok) {
                    setStatus("success");
                    toast.success("✅ Email verified successfully!");
                    setTimeout(() => router.push("/dashboard"), 2500);
                    return;
                }

                // ❌ If neither ok nor redirected, it's a fail
                const data = await res.json().catch(() => ({}));
                console.error("❌ Verification failed:", data);
                setStatus("error");
            } catch (err) {
                console.error("Verification request error:", err);
                setStatus("error");
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
            {status === "verifying" && (
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-12 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
                            <Heart className="absolute inset-0 m-auto text-blue-400 w-12 h-12 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white">Verifying Your Email</h1>
                            <p className="text-blue-200/70">Please wait while we verify your account...</p>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                </Card>
            )}

            {status === "success" && (
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-12 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-16 h-16 text-emerald-400" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                Verified Successfully!
                            </h1>
                            <p className="text-blue-200/70">
                                Your email has been verified. You can now access your patient portal.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-200/60">
                            <Shield className="w-4 h-4" />
                            <span>Your account is now secure and verified</span>
                        </div>
                        <Button
                            onClick={() => router.push("/dashboard")}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg"
                        >
                            Go to Patient Dashboard
                        </Button>
                    </div>
                </Card>
            )}

            {status === "error" && (
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-12 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full flex items-center justify-center">
                            <XCircle className="w-16 h-16 text-red-400" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                                Verification Failed
                            </h1>
                            <p className="text-blue-200/70">
                                The verification link may have expired or is invalid.
                            </p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 w-full">
                            <p className="text-amber-300 text-sm">
                                Please try signing up again or contact our support team for assistance.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Button
                                onClick={() => router.push("/signup")}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4"
                            >
                                Sign Up Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/contact")}
                                className="w-full border-blue-400/30 text-blue-300 hover:bg-blue-500/10 py-4"
                            >
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

// Main page component with Suspense boundary
export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-12 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
                            <Activity className="absolute inset-0 m-auto text-blue-400 w-10 h-10 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-xl font-medium text-white">Loading verification...</h1>
                            <p className="text-sm text-blue-200/70">Please wait a moment.</p>
                        </div>
                    </div>
                </Card>
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}