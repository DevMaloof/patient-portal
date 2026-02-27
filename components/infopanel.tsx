// /components/infopanel.tsx - Fixed X button and scrollbar
"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  Heart,
  Info,
  Mail,
  Phone,
  MapPin,
  Clock,
  X,
  Stethoscope,
  Ambulance,
  Calendar,
  Shield,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Infopanel = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home", icon: Home, gradient: "from-blue-500 to-cyan-500" },
    { href: "/services", label: "Medical Services", icon: Stethoscope, gradient: "from-emerald-500 to-teal-500" },
    { href: "/about", label: "About Us", icon: Info, gradient: "from-purple-500 to-pink-500" },
    { href: "/contact", label: "Contact", icon: Mail, gradient: "from-amber-500 to-orange-500" },
  ];

  const contactInfo = [
    { icon: Phone, text: "(214) 555-0423", subtext: "Main Line" },
    { icon: Ambulance, text: "(214) 555-0911", subtext: "24/7 Emergency" },
    { icon: Mail, text: "care@maloofhealth.com", subtext: "Email Us" },
    { icon: MapPin, text: "700 West Elm Street", subtext: "Dallas, TX 75201" },
    { icon: Clock, text: "24/7 Emergency", subtext: "Mon-Fri: 8AM-8PM" },
  ];

  const quickActions = [
    { label: "Book Appointment", icon: Calendar, gradient: "from-blue-500 to-cyan-500" },
    { label: "Find a Doctor", icon: Stethoscope, gradient: "from-emerald-500 to-teal-500" },
    { label: "Patient Portal", icon: Heart, gradient: "from-purple-500 to-pink-500" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 group"
        >
          <Menu className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span>Healthcare Services</span>
          <Activity className="w-4 h-4 ml-2 text-blue-400 group-hover:animate-pulse" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-0 border-l border-white/10 no-close-button custom-scrollbar"
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        <div className="h-full flex flex-col">
          {/* Navigation */}
          <div className="flex-1 p-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setOpen(false);
                    // Add navigation logic
                  }}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <action.icon className="w-5 h-5 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-blue-100">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Main Navigation */}
            <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">Main Menu</h3>
            <nav className="space-y-2 mb-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                  onClick={() => setOpen(false)}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-white">{item.label}</span>
                  <div className="ml-auto w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <span className="text-xs text-white">→</span>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Contact Information */}
            <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">Contact & Location</h3>
            <div className="space-y-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-white">{info.text}</span>
                    {info.subtext && (
                      <p className="text-xs text-blue-200">{info.subtext}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Appointment Button */}
            <div className="mt-8">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group relative overflow-hidden"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Schedule Appointment
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-blue-200">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> HIPAA
              </span>
              <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" /> Compassion
              </span>
              <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" /> Excellence
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <p className="text-center text-blue-200 text-sm">
              &copy; {new Date().getFullYear()} Maloof Health Systems
            </p>
            <p className="text-center text-blue-300/50 text-xs mt-1">
              Committed to your wellbeing
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Infopanel;