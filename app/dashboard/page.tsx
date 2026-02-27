// /app/dashboard/page.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Pen,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  User,
  Mail,
  Lock,
  Calendar,
  Users,
  Heart,
  Loader2,
  MapPin,
  Phone,
  LogOut,
  Settings,
  Award,
  Star,
  Stethoscope,
  Activity,
  Shield,
  FileText,
  Pill,
  AlertCircle,
  TrendingUp,
  Download
} from "lucide-react";
import { toast } from "sonner";

// ---------------------
// VALIDATION
// ---------------------
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  password: z.string().min(8),
});

// ---------------------
// SWR FETCHER
// ---------------------
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) return null; // handles 401
  return res.json();
};

// ---------------------
// STATUS BADGE
// ---------------------
const statusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
    case "confirmed":
      return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
    case "cancelled":
      return <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
    case "completed":
      return <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium flex items-center gap-1"><Award className="w-3 h-3" /> Completed</span>;
    default:
      return <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium">Unknown</span>;
  }
};

// ---------------------
// COMPONENT
// ---------------------
export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const { data: user, isLoading: userLoading, error: userError } = useSWR("/api/user", fetcher);
  const { data: dashboardData, isLoading: dashLoading } = useSWR("/api/dashboard-data", fetcher);

  const [editMode, setEditMode] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "********" },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name || "", email: user.email || "", password: "********" });
    }
  }, [user]);

  // Initial page loading timer
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ---------------------
  // FULL PAGE LOADING
  // ---------------------
  if (status === "loading" || userLoading || dashLoading || pageLoading || (!user && !userError)) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
          <Heart className="absolute inset-0 m-auto text-blue-400 w-16 h-16 animate-pulse" />
        </div>
        <div className="text-center backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
          <p className="text-blue-100 text-xl font-medium mb-2">Loading your</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Patient Dashboard</h1>
          </div>
          <p className="text-blue-200/70">Preparing your secure health portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Session Expired</h2>
          <p className="text-blue-200 mb-8">Your session has expired. Please log in again to access your patient portal.</p>
          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 shadow-lg hover:shadow-blue-500/25"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // ---------------------
  // FORM SUBMIT
  // ---------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();

      toast.success("Profile updated successfully!");
      setEditMode(false);
      mutate("/api/user");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
  }

  // ---------------------
  // STATS CALCULATION
  // ---------------------
  const totalAppointments = [
    ...(dashboardData?.lastReservations || []),
    ...(dashboardData?.pending || []),
    ...(dashboardData?.approved || []),
    ...(dashboardData?.rejected || [])
  ].length;

  const confirmedAppointments = dashboardData?.approved?.length || 0;
  const pendingAppointments = dashboardData?.pending?.length || 0;

  // ---------------------
  // APPOINTMENT RENDER HELPER
  // ---------------------
  const renderAppointment = (r: any) => (
    <Card key={r.id} className="bg-white/5 backdrop-blur-sm border-white/10 p-4 hover:border-blue-500/30 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">{r.name || 'Appointment'}</h4>
            <p className="text-blue-200/70 text-sm">
              {new Date(r.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        {statusBadge(r.reservationStatus)}
      </div>
      <div className="flex items-center gap-4 text-sm text-blue-200/60">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{r.guests || 1} patient(s)</span>
        </div>
        <div className="flex items-center gap-1">
          <Stethoscope className="w-4 h-4" />
          <span>{r.doctor || 'General'}</span>
        </div>
      </div>
    </Card>
  );

  // ---------------------
  // JSX UI
  // ---------------------
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* HERO HEADER */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/medical-dashboard-hero.webp"
          alt="Patient Dashboard"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Patient Portal</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto">
            Manage your health journey with Maloof Health
          </p>
        </div>
      </div>

      {/* USER STATS BAR */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{user?.name?.split(' ')[0] || 'Patient'}</h3>
                <p className="text-blue-200/60 text-sm">Welcome Back</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{totalAppointments}</h3>
                <p className="text-blue-200/60 text-sm">Total Appointments</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{confirmedAppointments}</h3>
                <p className="text-blue-200/60 text-sm">Confirmed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{pendingAppointments}</h3>
                <p className="text-blue-200/60 text-sm">Pending</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - PROFILE */}
            <div className="lg:col-span-2 space-y-8">
              {/* PROFILE CARD */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                      <p className="text-blue-200/60">Manage your personal details</p>
                    </div>
                  </div>
                  <Button
                    variant={editMode ? "outline" : "ghost"}
                    className={editMode
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-blue-400/30 text-blue-200"
                    }
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Pen className="w-4 h-4 mr-2" />
                    {editMode ? "Cancel Edit" : "Edit Profile"}
                  </Button>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-blue-200 mb-2 items-center gap-2">
                              <User className="w-4 h-4" />
                              Full Name
                            </label>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!editMode}
                                className="bg-white/5 border-white/10 text-white focus:border-blue-400 py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <label className="block text-blue-200 mb-2 items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address
                            </label>
                            <FormControl>
                              <Input
                                {...field}
                                disabled
                                className="bg-white/5 border-white/10 text-blue-200/50 py-6"
                              />
                            </FormControl>
                            <p className="text-blue-200/40 text-sm mt-1">Email cannot be changed</p>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-blue-200 mb-2 items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Password
                          </label>
                          <FormControl>
                            <Input
                              {...field}
                              disabled
                              className="bg-white/5 border-white/10 text-blue-200/50 py-6"
                            />
                          </FormControl>
                          <p className="text-blue-200/40 text-sm mt-1">
                            To change your password, use the "Forgot Password" feature on the login page
                          </p>
                        </FormItem>
                      )}
                    />

                    {editMode && (
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 flex-1"
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/10 text-blue-200 hover:bg-white/5 py-6"
                          onClick={() => router.push('/login')}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Switch Account
                        </Button>
                      </div>
                    )}
                  </form>
                </Form>

                {/* Health Summary */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">--</div>
                      <p className="text-xs text-blue-200/60">Blood Type</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">--</div>
                      <p className="text-xs text-blue-200/60">Allergies</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">--</div>
                      <p className="text-xs text-blue-200/60">Medications</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* APPOINTMENTS ACCORDION */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Appointment History</h2>
                    <p className="text-blue-200/60">Track all your medical appointments</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="last" className="border-b border-white/10">
                    <AccordionTrigger className="flex items-center gap-3 hover:no-underline py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Info className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-white">Recent Appointments</h3>
                        <p className="text-blue-200/60 text-sm">Your latest visits</p>
                      </div>
                      <span className="text-blue-400 font-medium">
                        {dashboardData?.lastReservations?.length || 0}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {dashboardData?.lastReservations?.length
                          ? dashboardData.lastReservations.map(renderAppointment)
                          : <p className="text-blue-200/60 text-center p-4">No recent appointments.</p>}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pending" className="border-b border-white/10">
                    <AccordionTrigger className="flex items-center gap-3 hover:no-underline py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-white">Pending Appointments</h3>
                        <p className="text-blue-200/60 text-sm">Awaiting confirmation</p>
                      </div>
                      <span className="text-amber-400 font-medium">
                        {dashboardData?.pending?.length || 0}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {dashboardData?.pending?.length
                          ? dashboardData.pending.map(renderAppointment)
                          : <p className="text-blue-200/60 text-center p-4">No pending appointments.</p>}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="approved" className="border-b border-white/10">
                    <AccordionTrigger className="flex items-center gap-3 hover:no-underline py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-white">Confirmed Appointments</h3>
                        <p className="text-blue-200/60 text-sm">Upcoming visits</p>
                      </div>
                      <span className="text-emerald-400 font-medium">
                        {dashboardData?.approved?.length || 0}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {dashboardData?.approved?.length
                          ? dashboardData.approved.map(renderAppointment)
                          : <p className="text-blue-200/60 text-center p-4">No confirmed appointments.</p>}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rejected" className="border-b border-white/10">
                    <AccordionTrigger className="flex items-center gap-3 hover:no-underline py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-white">Cancelled Appointments</h3>
                        <p className="text-blue-200/60 text-sm">Past cancellations</p>
                      </div>
                      <span className="text-red-400 font-medium">
                        {dashboardData?.rejected?.length || 0}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {dashboardData?.rejected?.length
                          ? dashboardData.rejected.map(renderAppointment)
                          : <p className="text-blue-200/60 text-center p-4">No cancelled appointments.</p>}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>

            {/* RIGHT COLUMN - HEALTH TIPS & INFO */}
            <div className="space-y-8">
              {/* HEALTH TIPS */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Health Tips</h2>
                    <p className="text-blue-200/60">Stay healthy and informed</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* TIP 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Preventive Care</h4>
                      <p className="text-blue-200/70 text-sm">
                        Schedule your annual physical exam to catch potential health issues early.
                      </p>
                    </div>
                  </div>

                  {/* TIP 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Pill className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Medication Management</h4>
                      <p className="text-blue-200/70 text-sm">
                        Set reminders for your medications and never miss a dose.
                      </p>
                    </div>
                  </div>

                  {/* TIP 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertCircle className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Know Your Numbers</h4>
                      <p className="text-blue-200/70 text-sm">
                        Track your blood pressure, cholesterol, and glucose levels regularly.
                      </p>
                    </div>
                  </div>

                  {/* TIP 4 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Stay Active</h4>
                      <p className="text-blue-200/70 text-sm">
                        Aim for at least 30 minutes of moderate exercise daily.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* HEALTH SUMMARY CARD */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Health Summary</h2>
                    <p className="text-blue-200/60">Your medical snapshot</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Last Check-up</span>
                    <span className="text-white font-bold">Not recorded</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Upcoming Tests</span>
                    <span className="text-white font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Prescriptions</span>
                    <span className="text-white font-bold">0 active</span>
                  </div>
                  <div className="pt-4 border-t border-blue-500/20">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Award className="w-5 h-5" />
                      <span className="font-medium">Health Score: Good</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-4 bg-blue-900 text-blue-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Medical Records
                    </Button>
                  </div>
                </div>
              </Card>

              {/* EMERGENCY CONTACT */}
              <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Emergency Contact</h3>
                </div>
                <p className="text-blue-200/70 text-sm mb-4">
                  For medical emergencies, please call 911 immediately.
                </p>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                    onClick={() => window.location.href = "tel:911"}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call 911
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full bg-blue-400/30 text-blue-300"
                    onClick={() => router.push('/contact')}
                  >
                    24/7 Nurse Hotline
                  </Button>
                </div>
              </Card>

              {/* QUICK ACTIONS */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    className="bg-blue-400/30 text-blue-300 py-6"
                    onClick={() => router.push('/services')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-emerald-400/30 text-emerald-300 py-6"
                  >
                    <Pill className="w-4 h-4 mr-2" />
                    Refill
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-purple-400/30 text-purple-300 py-6"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Records
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-amber-400/30 text-amber-300 py-6"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Insurance
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}