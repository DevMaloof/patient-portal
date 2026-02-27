// /app/contact/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  ExternalLink,
  Calendar,
  Users,
  Ambulance,
  Stethoscope,
  Shield,
  Activity,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Dialogcode from "@/components/dialog";
import Infopanel from "@/components/infopanel";
import LogoTextWhite from "@/components/logotextwhite";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
            <Heart className="absolute inset-0 m-auto text-blue-400 w-10 h-10 animate-pulse" />
          </div>
          <p className="text-blue-100 font-medium backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">Loading Contact Information...</p>
        </div>
      </div>
    );
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-400" />,
      title: "Visit Our Medical Center",
      details: "700 West Elm Street\nDallas, TX 75201\nUnited States\nMain Entrance: Floor 1",
      accent: "from-blue-500/20 to-cyan-500/10",
      buttonText: "Get Directions",
      gradient: "from-blue-500 to-cyan-500",
      action: () => window.open("https://maps.google.com/?q=700+West+Elm+Street+Dallas+TX", "_blank")
    },
    {
      icon: <Phone className="w-6 h-6 text-emerald-400" />,
      title: "Contact Us",
      details: "Main Line: (214) 555-0423\nAppointments: (214) 555-0424\nBilling: (214) 555-0426\nPharmacy: (214) 555-0427",
      accent: "from-emerald-500/20 to-teal-500/10",
      buttonText: "Call Main Line",
      gradient: "from-emerald-500 to-teal-500",
      action: () => window.location.href = "tel:+12145550423"
    },
    {
      icon: <Mail className="w-6 h-6 text-purple-400" />,
      title: "Email Us",
      details: "General: care@maloofhealth.com\nAppointments: appointments@maloofhealth.com\nBilling: billing@maloofhealth.com\nHIPAA: privacy@maloofhealth.com",
      accent: "from-purple-500/20 to-pink-500/10",
      buttonText: "Send Email",
      gradient: "from-purple-500 to-pink-500",
      action: () => window.location.href = "mailto:care@maloofhealth.com"
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "Hours of Operation",
      details: "Mon-Fri: 8:00AM–8:00PM\nSaturday: 9:00AM–5:00PM\nSunday: 10:00AM–4:00PM\nEmergency: 24/7",
      accent: "from-amber-500/20 to-orange-500/10",
      buttonText: "Emergency: 24/7",
      gradient: "from-amber-500 to-orange-500",
      action: null
    }
  ];

  const emergencyContacts = [
    {
      title: "24/7 Emergency",
      number: "(214) 555-0911",
      icon: <Ambulance className="w-6 h-6" />,
      gradient: "from-rose-500 to-red-500"
    },
    {
      title: "Poison Control",
      number: "1-800-222-1222",
      icon: <AlertCircle className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Nurse Hotline",
      number: "(214) 555-0912",
      icon: <Stethoscope className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const socialMedia = [
    {
      platform: "LinkedIn",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
      handle: "Maloof Health Systems",
      color: "hover:bg-blue-500/20",
      url: "https://linkedin.com/company/maloof-health"
    },
    {
      platform: "Twitter/X",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
      handle: "@MaloofHealth",
      color: "hover:bg-sky-500/20",
      url: "https://twitter.com/maloofhealth"
    },
    {
      platform: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      handle: "MaloofHealth",
      color: "hover:bg-blue-500/20",
      url: "https://facebook.com/maloofhealth"
    },
    {
      platform: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      handle: "@maloof_health",
      color: "hover:bg-pink-500/20",
      url: "https://instagram.com/maloof_health"
    }
  ];

  const departments = [
    {
      name: "Cardiology",
      phone: "(214) 555-0430",
      email: "cardiology@maloofhealth.com",
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: "Neurology",
      phone: "(214) 555-0431",
      email: "neurology@maloofhealth.com",
      icon: <Activity className="w-5 h-5" />
    },
    {
      name: "Pediatrics",
      phone: "(214) 555-0432",
      email: "pediatrics@maloofhealth.com",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "Primary Care",
      phone: "(214) 555-0433",
      email: "primary@maloofhealth.com",
      icon: <Stethoscope className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full  bg-white/25 backdrop-blur-2xl z-50 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <LogoTextWhite />
            <Dialogcode />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/medical-center-exterior.webp"
            fill
            className="object-cover brightness-75"
            alt="Maloof Health Medical Center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Contact</span> Maloof Health
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 max-w-3xl mx-auto">
              Your health is our priority — reach out anytime, we're here 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Banner */}
      <div className="py-8 px-4 bg-gradient-to-r from-rose-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-4 text-white">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center shadow-lg`}>
                  {contact.icon}
                </div>
                <div>
                  <p className="text-sm opacity-90">{contact.title}</p>
                  <p className="text-xl font-bold">{contact.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Multiple ways to connect with our healthcare team — we're always here to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => (
              <Card
                key={idx}
                className={`bg-white/70 backdrop-blur-xl border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{info.title}</h3>
                  <div className="text-gray-600 whitespace-pre-line mb-6 leading-relaxed">
                    {info.details}
                  </div>
                  {info.action && (
                    <Button
                      onClick={info.action}
                      className={`w-full bg-gradient-to-r ${info.gradient} hover:opacity-90 text-white shadow-lg`}
                    >
                      {info.buttonText}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Department Directory */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Department Directory</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept, idx) => (
                <Card key={idx} className="bg-white/50 backdrop-blur-sm border-white/20 p-4 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                      {dept.icon}
                    </div>
                    <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{dept.phone}</p>
                  <p className="text-xs text-gray-500">{dept.email}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Our Location</h3>
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
                onClick={() => window.open("https://maps.google.com/?q=700+West+Elm+Street+Dallas+TX", "_blank")}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Maps
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.466861115231!2d-96.80871042504955!3d32.7798782736625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e991648d85d11%3A0x8d3f52d0353e3971!2s700%20Elm%20St%2C%20Dallas%2C%20TX%2075202%2C%20USA!5e0!3m2!1sen!2s!4v1754234876996!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>

          {/* Social Media & Facility Info */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Social Media */}
            <div className="lg:col-span-1">
              <Card className="bg-white/70 backdrop-blur-xl border-white/20 p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
                <p className="text-gray-600 mb-8">
                  Follow us for health tips, medical updates, and community wellness events.
                </p>
                <div className="space-y-4 mb-8">
                  {socialMedia.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-between p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 transition-all duration-300 ${social.color} hover:border-blue-400/50 group`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-blue-500">
                          {social.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-800">{social.platform}</p>
                          <p className="text-gray-500 text-sm">{social.handle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 text-sm font-medium">Follow</span>
                        <ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>

                {/* Health Tips Preview */}
                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-semibold text-gray-800 mb-4">Health & Wellness Updates</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      <span>Weekly health tips from specialists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      <span>Community wellness events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span>New treatment updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                      <span>Patient success stories</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Facility Images Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 backdrop-blur-xl border-white/20 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Medical Facility</h3>
                <p className="text-gray-600 mb-8">
                  A glimpse of our state-of-the-art facility, compassionate care spaces, and advanced medical equipment.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="relative h-48 rounded-xl overflow-hidden border border-white/20 group">
                    <Image
                      src="/waiting-area.webp"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Patient Waiting Area"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden border border-white/20 group">
                    <Image
                      src="/examination-room.webp"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Examination Room"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden border border-white/20 group">
                    <Image
                      src="/mri-machine.webp"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="MRI Machine"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden border border-white/20 group">
                    <Image
                      src="/pharmacy.webp"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="In-house Pharmacy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Visit Our Medical Center</h4>
                  <p className="text-gray-600">
                    Experience healthcare reimagined. From our welcoming waiting areas to our advanced treatment rooms,
                    every space is designed with your comfort and care in mind.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-3">24/7 Emergency</h4>
                <p className="text-white text-2xl font-bold">(214) 555-0911</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-3">Secure Portal</h4>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Patient Login
                </Button>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-3">Find a Doctor</h4>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-950 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in health and wellness
              </p>
            </div>
            <Infopanel />
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Maloof Health Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;