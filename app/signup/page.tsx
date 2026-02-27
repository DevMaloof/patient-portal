// /app/signup/page.tsx
"use client";
export const runtime = "nodejs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/components/googlelogo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Heart,
  Mail,
  Loader2,
  CheckCircle,
  Stethoscope,
  Shield,
  Activity,
  Users,
  FileText,
  Clock,
  Lock
} from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp03Page = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔐 password strength
  const [strength, setStrength] = useState<{ level: string; color: string }>({
    level: "",
    color: "",
  });

  // ✅ Handle query params safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const expired = params.get("expired");
      const invalid = params.get("verified");

      if (expired === "1") {
        toast.error("⏳ Verification link has expired. Please sign up again.");
        setTimeout(() => router.replace("/signup"), 2000);
      } else if (invalid === "0") {
        toast.error("❌ Invalid verification link. Please sign up again.");
        setTimeout(() => router.replace("/signup"), 2000);
      }

      if (expired || invalid) {
        params.delete("expired");
        params.delete("verified");
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [router]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoader(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // ✅ live strength check
  useEffect(() => {
    const pwd = form.watch("password");
    if (!pwd) {
      setStrength({ level: "", color: "" });
      return;
    }
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

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
  }, [form.watch("password")]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Signup failed.");
        setLoading(false);
        return;
      }

      toast.success("✅ Please check your email to verify your account");
      setEmailSent(true);
      setLoading(false);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // Initial page load
  if (loader) {
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
            <h1 className="text-4xl font-bold text-white">Maloof Health</h1>
          </div>
          <p className="text-blue-200/70">Preparing your secure registration...</p>
        </div>
      </div>
    );
  }

  // While sending email
  if (loading && !emailSent) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
          <Mail className="absolute inset-0 m-auto text-blue-400 w-16 h-16" />
        </div>
        <div className="text-center max-w-md backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Sending Verification Email</h2>
          <p className="text-blue-200 mb-6">
            We're creating your secure patient account and sending a verification link.
          </p>
          <div className="flex items-center justify-center gap-3 text-blue-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Please wait a moment...</span>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-blue-200/60 text-sm">
              You'll receive an email from <span className="text-blue-300">verify@maloofhealth.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ After email is sent
  if (emailSent) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="relative w-32 h-32 mb-8">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
            <CheckCircle className="w-20 h-20 text-emerald-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="text-center max-w-md px-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Verify Your Email
          </h2>
          <p className="text-blue-200 text-lg mb-6">
            We've sent a verification link to your email address. Please check your inbox.
          </p>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white mb-2">Next Steps:</h4>
                <ul className="space-y-2 text-blue-200">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Click the verification link in your email</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Complete your patient profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Access your secure patient portal</span>
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
            <p className="text-blue-200/70 text-sm">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                try again
              </button>
            </p>
            <Link href="/">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-500/10 w-full">
                Return to Homepage
              </Button>
            </Link>
          </div>
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
                <p className="text-blue-200/70">Create your secure patient account</p>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button
              className="w-full gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 transition-all duration-300 mb-6 py-6 text-white"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <GoogleLogo />
              Continue with Google
            </Button>

            <div className="w-full flex items-center justify-center mb-8 overflow-hidden">
              <Separator className="flex-1 bg-white/10" />
              <span className="text-sm px-4 text-blue-200/70">OR</span>
              <Separator className="flex-1 bg-white/10" />
            </div>

            {/* Email Sign Up Form */}
            <Form {...form}>
              <form
                className="w-full space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 py-6 placeholder:text-blue-200/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 py-6 placeholder:text-blue-200/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full text-white bg-white/10 backdrop-blur-sm border-white/20 focus:border-blue-400 focus:ring-blue-400/20 py-6 pr-12 placeholder:text-blue-200/50"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-400"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      {/* Strength bar */}
                      {strength.level && (
                        <div className="mt-3">
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
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full text-white bg-white/10 backdrop-blur-sm border-white/20 focus:border-blue-400 focus:ring-blue-400/20 py-6 pr-12 placeholder:text-blue-200/50"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-400"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  disabled={!form.formState.isValid || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Patient Account"
                  )}
                </Button>
              </form>
            </Form>

            <p className="mt-8 text-center text-blue-200/70">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium underline">
                Sign in here
              </Link>
            </p>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 text-sm text-blue-200/60">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" /> HIPAA
                </span>
                <span className="w-1 h-1 bg-blue-300/30 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Lock className="w-4 h-4" /> Encrypted
                </span>
              </div>
              <p className="text-blue-200/50 text-xs text-center mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Video/Image */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/50 to-transparent" />
          <video
            src="/medical-signup.webm"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Join Our Health Community</h3>
                  <p className="text-blue-100">Experience healthcare reimagined</p>
                </div>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>24/7 access to your health records</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Secure messaging with providers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Easy appointment scheduling</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Prescription refill requests</span>
                </li>
              </ul>

              {/* Features Grid */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <Activity className="w-4 h-4 text-blue-300 mx-auto mb-1" />
                  <span className="text-xs text-blue-200">Track Health</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <FileText className="w-4 h-4 text-blue-300 mx-auto mb-1" />
                  <span className="text-xs text-blue-200">Medical Records</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <Clock className="w-4 h-4 text-blue-300 mx-auto mb-1" />
                  <span className="text-xs text-blue-200">24/7 Access</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <Shield className="w-4 h-4 text-blue-300 mx-auto mb-1" />
                  <span className="text-xs text-blue-200">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp03Page;