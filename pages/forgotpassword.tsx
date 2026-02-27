// /pages/forgotpassword.tsx
"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Heart, Mail, CheckCircle, Loader2, ArrowLeft, Shield, Stethoscope, Phone } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Page loading effect
    useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/auth/forgotpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            toast.success(data.message || "Reset link sent! Check your email.");
            setSent(true);
        } else {
            toast.error(data.error || "Something went wrong.");
        }
    };

    // Page loading state
    if (pageLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
                    <Heart className="absolute inset-0 m-auto text-blue-400 w-16 h-16 animate-pulse" />
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
                    <p className="text-blue-100 text-xl font-medium mb-2">Welcome to</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Heart className="w-8 h-8 text-blue-400" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</h1>
                    </div>
                    <p className="text-blue-200/70">Loading password reset...</p>
                </div>
            </div>
        );
    }

    // Success state after email sent
    if (sent) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white px-4">
                <div className="relative w-32 h-32 mb-8">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <CheckCircle className="w-20 h-20 text-emerald-400" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                    </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8 max-w-md w-full">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                            Reset Link Sent!
                        </h2>
                        <p className="text-blue-200 text-lg mb-6">
                            We've sent a password reset link to <span className="text-emerald-300 font-medium">{email}</span>.
                        </p>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-white mb-2">Next Steps:</h4>
                                    <ul className="space-y-2 text-blue-200">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span>Check your email inbox</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span>Click the secure reset link</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span>Create your new password</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-blue-400" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-blue-200/60 text-sm">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    try again
                                </button>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login" className="w-full">
                                    <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-500/10 w-full py-6">
                                        Return to Login
                                    </Button>
                                </Link>
                                <Link href="/" className="w-full">
                                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white w-full py-6">
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Security Note */}
                <div className="mt-6 flex items-center gap-2 text-xs text-blue-200/40">
                    <Shield className="w-3 h-3" />
                    <span>This link will expire in 1 hour for security</span>
                </div>
            </div>
        );
    }

    // Main form
    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="w-full max-w-md px-4 sm:px-6 pt-20 lg:pt-32 pb-8">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                        <Heart className="w-12 h-12 text-blue-400" />
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reset Password</h1>
                        </div>
                        <p className="text-blue-200/70">Enter your email to reset your password</p>
                    </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Account Recovery</h3>
                        </div>

                        <p className="text-blue-200 text-sm mb-6">
                            We'll send you a secure link to reset your password. Make sure to use the email associated with your patient account.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-blue-200 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-400 focus:ring-blue-400/20 py-4 pl-12 pr-4 rounded-xl placeholder:text-blue-200/40"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sending Reset Link...
                                </>
                            ) : "Send Reset Link"}
                        </Button>

                        <div className="text-center text-blue-200/70">
                            Remember your password?{" "}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </Card>

                <div className="mt-10 pt-8 border-t border-white/10">
                    <div className="flex items-center justify-center gap-4 text-sm text-blue-200/60">
                        <span className="flex items-center gap-1">
                            <Shield className="w-4 h-4" /> HIPAA
                        </span>
                        <span className="w-1 h-1 bg-blue-300/30 rounded-full"></span>
                        <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" /> 24/7 Support
                        </span>
                    </div>
                    <p className="text-blue-200/40 text-xs text-center mt-4">
                        Need help? Contact our support team at support@maloofhealth.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;