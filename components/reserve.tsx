// /components/reserve.tsx - Updated with scrollbar for Date & Time
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Plus,
  Minus,
  ChevronDown,
  X,
  Heart,
  Stethoscope,
  Activity,
  Shield,
  User,
  Mail,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Reserve = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("09:00");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const { data: session } = useSession();
  const panelRef = useRef<HTMLDivElement>(null);
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurology", available: true },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Primary Care", available: true },
    { id: 4, name: "Dr. James Wilson", specialty: "Pediatrics", available: false },
    { id: 5, name: "Dr. Lisa Patel", specialty: "Internal Medicine", available: true },
  ];

  const appointmentReasons = [
    "General Checkup",
    "Follow-up Visit",
    "Consultation",
    "Emergency",
    "Vaccination",
    "Lab Results",
    "Prescription Renewal",
    "Other"
  ];

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleAppointment = async () => {
    if (!session?.user) {
      toast.error("Please sign in to schedule an appointment");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (!doctor) {
      toast.error("Please select a doctor");
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsSubmitting(true);

    const appointmentData = {
      name: session.user.name,
      email: session.user.email,
      phone: phone,
      guests: guests,
      date: date.toISOString().split('T')[0],
      time: time,
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Appointment scheduled successfully! 🏥");
        setIsOpen(false);
        setGuests(1);
        setDate(new Date());
        setTime("09:00");
        setPhone("");
        setReason("");
        setDoctor("");
        setActiveStep(1);
      } else {
        toast.error(responseData.error || "Failed to schedule appointment");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const steps = [
    { number: 1, title: "Patients", icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { number: 2, title: "Date & Time", icon: Calendar, gradient: "from-emerald-500 to-teal-500" },
    { number: 3, title: "Details", icon: Heart, gradient: "from-purple-500 to-pink-500" },
  ];

  return (
    <>
      {/* Floating Appointment Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></div>
        <Calendar className="w-5 h-5 relative z-10" />
        <span className="font-semibold relative z-10">Schedule Appointment</span>
        <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Appointment Panel - Dark Theme */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <Card
            ref={panelRef}
            className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Dark Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
              </div>

              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    Schedule Appointment
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">Book your visit with our specialists</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-100 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between mt-6 relative z-10">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex flex-col items-center transition-all duration-300 ${activeStep >= step.number ? "opacity-100 scale-110" : "opacity-50"}`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center mb-2 shadow-lg`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content - Dark Theme */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar bg-slate-900">
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      <Users className="w-4 h-4" />
                      Number of Patients
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={isSubmitting}
                      className="w-12 h-12 rounded-xl border-2 border-blue-500/30 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50 group"
                    >
                      <Minus className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-400">{guests}</div>
                      <div className="text-gray-400 mt-1">
                        {guests === 1 ? "Patient" : "Patients"}
                      </div>
                    </div>

                    <button
                      onClick={() => setGuests(guests + 1)}
                      disabled={isSubmitting}
                      className="w-12 h-12 rounded-xl border-2 border-blue-500/30 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50 group"
                    >
                      <Plus className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    For family appointments or multiple patients
                  </p>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">Select Date & Time</h4>
                    {date && (
                      <span className="text-sm font-normal bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full">
                        {date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>

                  {/* Date Calendar - Fixed Dark Theme */}
                  <div className="rounded-xl bg-slate-800 p-4 border border-white/10">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={isDateDisabled}
                      className="w-full dark [&_.rdp]:text-white [&_.rdp-day]:text-white [&_.rdp-day]:hover:bg-blue-500/30 [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:border-blue-400 [&_.rdp-nav_button]:text-white [&_.rdp-nav_button]:hover:bg-white/10 [&_.rdp-caption_label]:text-white [&_.rdp-head_cell]:text-gray-400"
                      initialFocus
                    />
                  </div>

                  {/* Time Slots - Dark */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-gray-300">Available Times</h5>
                      <span className="text-sm text-blue-400">{time}</span>
                    </div>

                    <div
                      ref={timeSlotsRef}
                      className="h-48 overflow-y-auto pr-2 time-slots-scrollbar"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            disabled={isSubmitting}
                            className={`py-3 px-4 rounded-xl border transition-all duration-200 flex items-center justify-center ${time === slot
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-500 text-white shadow-md scale-105"
                              : "border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 text-gray-300"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <Clock className={`w-4 h-4 mr-2 ${time === slot ? "text-white" : "text-gray-400"}`} />
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <div className="inline-flex items-center text-xs text-blue-400">
                        <span className="animate-bounce">↓</span>
                        <span className="mx-2">Scroll for more times</span>
                        <span className="animate-bounce">↓</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-white">Appointment Details</h4>

                  {session?.user ? (
                    <div className="space-y-4">
                      {/* Patient Info Card - Dark */}
                      <div className="p-4 bg-slate-800 rounded-xl border border-white/10">
                        <p className="text-sm text-blue-400 mb-1">Patient Information</p>
                        <p className="font-semibold text-white">{session.user.name}</p>
                        <p className="text-sm text-gray-400">{session.user.email}</p>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-400 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your contact number"
                          className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-gray-500 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">We'll text you confirmation details</p>
                      </div>

                      {/* Select Doctor */}
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-400" />
                          Select Doctor
                        </label>
                        <select
                          value={doctor}
                          onChange={(e) => setDoctor(e.target.value)}
                          className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option value="" className="bg-slate-900">Choose a specialist</option>
                          {doctors.map((doc) => (
                            <option
                              key={doc.id}
                              value={doc.name}
                              disabled={!doc.available}
                              className="bg-slate-900"
                            >
                              {doc.name} - {doc.specialty} {!doc.available && "(Unavailable)"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Reason for Visit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-400 inline mr-2" />
                          Reason for Visit
                        </label>
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option value="" className="bg-slate-900">Select reason</option>
                          {appointmentReasons.map((r) => (
                            <option key={r} value={r} className="bg-slate-900">{r}</option>
                          ))}
                        </select>
                      </div>

                      {/* Appointment Summary - Dark */}
                      <div className="mt-4 p-4 bg-slate-800 rounded-xl border border-white/10">
                        <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          Appointment Summary
                        </h5>
                        <div className="space-y-2 text-sm">
                          <p className="flex justify-between">
                            <span className="text-gray-400">Date:</span>
                            <span className="font-medium text-white">{date?.toLocaleDateString()}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Time:</span>
                            <span className="font-medium text-white">{time}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Patients:</span>
                            <span className="font-medium text-white">{guests}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-slate-800 rounded-xl border border-white/10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-300 mb-4">Please sign in to schedule an appointment</p>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg">
                          Sign In to Patient Portal
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation - Fixed Back Button */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                {activeStep > 1 ? (
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={isSubmitting}
                    className="border-white/20 bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-6"
                  >
                    ← Back
                  </Button>
                ) : (
                  <div />
                )}

                {activeStep < 3 ? (
                  <Button
                    onClick={() => setActiveStep(activeStep + 1)}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg"
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    onClick={handleAppointment}
                    disabled={isSubmitting || !session?.user || !doctor}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scheduling...
                      </div>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </Button>
                )}
              </div>

              {/* HIPAA Notice - Dark */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>HIPAA compliant • Secure booking</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Reserve;