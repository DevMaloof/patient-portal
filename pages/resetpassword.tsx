// /pages/resetpassword.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
    Eye,
    EyeOff,
    Heart,
    Lock,
    CheckCircle,
    Loader2,
    Shield,
    AlertCircle,
    Stethoscope
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const ResetPassword = () => {
    const router = useRouter();

    // ✅ Safe token extraction from query string
    const [token, setToken] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setToken(params.get("token") ?? "");
            // Set page loading false after a delay
            setTimeout(() => setPageLoading(false), 1500);
        }
    }, []);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingToken, setCheckingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    // 👁️ Toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // 🔐 Password strength
    const [strength, setStrength] = useState<{ level: string; color: string }>({
        level: "",
        color: "",
    });

    // ✅ FIXED: Verify token validity with proper error handling
    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setTokenValid(false);
                setCheckingToken(false);
                toast.error("No reset token found");
                return;
            }

            try {
                const res = await fetch(`/api/auth/verify-reset-token?token=${encodeURIComponent(token)}`);
                if (res.ok) {
                    const data = await res.json();
                    setTokenValid(true);
                } else {
                    const errorData = await res.json();
                    setTokenValid(false);
                    toast.error(errorData.error || "Invalid or expired reset link");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setTokenValid(false);
                toast.error("Failed to verify reset link");
            }
            setCheckingToken(false);
        };

        if (token) {
            checkToken();
        }
    }, [token]);

    // ✅ Password strength logic
    useEffect(() => {
        if (!password) {
            setStrength({ level: "", color: "" });
            return;
        }

        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
            case 0:
            case 1:
                setStrength({ level: "Weak", color: "bg-red-500" });
                break;
            case 2:
                setStrength({ level: "Medium", color: "bg-yellow-500" });
                break;
            case 3:
                setStrength({ level: "Strong", color: "bg-green-500" });
                break;
            case 4:
                setStrength({ level: "Very Strong", color: "bg-emerald-600" });
                break;
        }
    }, [password]);

    // ✅ Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill in both password fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.error || "Failed to reset password");
                setLoading(false);
                return;
            }

            toast.success("✅ Password reset successfully! Redirecting to login...");
            setResetSuccess(true);
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            console.error("Reset password error:", err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Page loading state
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

    // ✅ Token checking state
    if (checkingToken) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
                            <Shield className="absolute inset-0 m-auto text-blue-400 w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-white">Validating Reset Link</h2>
                            <p className="text-blue-200/70">Please wait while we verify your security token...</p>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-blue-300">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="font-medium">Verifying...</span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // ✅ Invalid token state
    if (!tokenValid) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white px-4">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8 max-w-md w-full">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-16 h-16 text-red-400" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                                Invalid Reset Link
                            </h2>
                            <p className="text-blue-200">
                                This password reset link is invalid or has expired.
                            </p>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 w-full text-left">
                            <h4 className="font-semibold text-white mb-2">Possible reasons:</h4>
                            <ul className="space-y-2 text-blue-200">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>The link has expired (valid for 1 hour)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>The link has already been used</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Invalid or corrupted link</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4 w-full">
                            <Button
                                onClick={() => router.push('/forgotpassword')}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg"
                            >
                                Request New Reset Link
                            </Button>
                            <Link href="/login" className="block w-full">
                                <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-500/10 py-6">
                                    Return to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // ✅ Success state after reset
    if (resetSuccess) {
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
                            Password Reset Successfully!
                        </h2>
                        <p className="text-blue-200 text-lg mb-6">
                            Your password has been updated. You can now log in with your new password.
                        </p>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8 text-left">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Security Updated</h4>
                                    <ul className="space-y-2 text-blue-200">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            <span>Your password has been changed</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            <span>All active sessions were terminated</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            <span>You'll be redirected to login</span>
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

                        <p className="text-blue-200/60 text-sm mb-4">
                            Redirecting to login page in a few seconds...
                        </p>

                        <Link href="/login">
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg">
                                Go to Login Now
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    // ✅ Main reset form
    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="w-full max-w-md px-4 sm:px-6 pt-20 lg:pt-32 pb-8">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                        <Lock className="w-12 h-12 text-blue-400" />
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Set New Password</h1>
                        </div>
                        <p className="text-blue-200/70">Create a secure password for your patient account</p>
                    </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Password Requirements</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Password field */}
                            <div>
                                <label className="block text-blue-200 mb-2">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 z-10" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-400 focus:ring-blue-400/20 py-4 pl-12 pr-12 rounded-xl placeholder:text-blue-200/40"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-400"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password strength bar */}
                            {strength.level && (
                                <div>
                                    <div className="h-2 rounded bg-white/10">
                                        <div
                                            className={`h-2 rounded ${strength.color} transition-all duration-300`}
                                            style={{
                                                width:
                                                    strength.level === "Weak"
                                                        ? "25%"
                                                        : strength.level === "Medium"
                                                            ? "50%"
                                                            : strength.level === "Strong"
                                                                ? "75%"
                                                                : "100%",
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm mt-2 text-blue-200">
                                        Password Strength:{" "}
                                        <span className={`font-semibold ${strength.level === "Weak" ? "text-red-400" :
                                                strength.level === "Medium" ? "text-yellow-400" :
                                                    strength.level === "Strong" ? "text-green-400" :
                                                        "text-emerald-400"
                                            }`}>
                                            {strength.level}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Confirm password */}
                            <div>
                                <label className="block text-blue-200 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 z-10" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Re-enter new password"
                                        className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-400 focus:ring-blue-400/20 py-4 pl-12 pr-12 rounded-xl placeholder:text-blue-200/40"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-400"
                                    >
                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                            disabled={loading || password.length < 8 || password !== confirmPassword}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Updating Password...
                                </>
                            ) : "Reset Password"}
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
                    <p className="text-blue-200/40 text-sm text-center">
                        Need help? Contact our support team at support@maloofhealth.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;