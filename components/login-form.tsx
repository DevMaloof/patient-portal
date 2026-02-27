// /components/login-form.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLogo from "./googlelogo";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Heart, Shield } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Check for OAuth error in URL on client side
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get("error");

      if (errorParam === "OAuthAccountNotLinked") {
        toast.error(
          "Account already exists with a different sign-in method. Try using email/password or another provider."
        );

        // Clean up the URL
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  // ✅ Redirect after session becomes authenticated
  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password.");
    }
    // else: wait for useEffect to redirect
  };

  const handleGoogleSignIn = async () => {
    toast.loading("Redirecting to Google...");
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-blue-200">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 py-6 placeholder:text-blue-200/50"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-blue-200">Password</Label>
            <Link
              href="/forgotpassword"
              className="ml-auto text-sm underline-offset-4 hover:underline text-blue-400 hover:text-blue-300"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full text-white bg-white/10 backdrop-blur-sm border-white/20 focus:border-blue-400 focus:ring-blue-400/20 py-6 pr-12 placeholder:text-blue-200/50"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : "Sign In to Patient Portal"}
        </Button>

        <div className="w-full flex items-center justify-center overflow-hidden my-2">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-sm px-4 text-blue-200/70">Or continue with</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 transition-all duration-300 py-6 text-white"
          disabled={loading}
        >
          <GoogleLogo />
          Continue with Google
        </Button>
      </div>

      <div className="text-center text-blue-200/70 mt-4">
        Don't have an account?{" "}
        <Link href={"/signup"} className="text-blue-400 hover:text-blue-300 font-medium underline">
          Create Patient Account
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-xs text-blue-200/60">
            <Shield className="w-3 h-3" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-200/60">
            <Heart className="w-3 h-3" />
            <span>Secure Portal</span>
          </div>
        </div>
        <p className="text-blue-200/50 text-xs text-center">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
}