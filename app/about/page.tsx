// /app/about/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Star,
  Stethoscope,
  Shield,
  Microscope,
  Brain,
  GraduationCap,
  TrendingUp
} from "lucide-react";
import Dialogcode from "@/components/dialog";
import LogoTextWhite from "@/components/logotextwhite";

const About = () => {
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
          <p className="text-blue-100 font-medium backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">Loading Our Story...</p>
        </div>
      </div>
    );
  }

  const aboutSections = [
    {
      title: "Welcome to Maloof Health",
      content: "At Maloof Health Systems, we believe that exceptional healthcare begins with compassion and is powered by innovation. Located in the heart of Dallas, Texas, our medical center is more than just a healthcare facility — it's a place where healing happens, lives are changed, and every patient is treated like family. Whether you're visiting for a routine check-up or specialized treatment, our doors are always open with warmth, expertise, and unwavering commitment to your wellbeing.",
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      accentColor: "from-blue-500/20 to-cyan-500/10",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Our Philosophy",
      content: "Healthcare should do more than just treat symptoms — it should nurture the whole person. That's why every aspect of our practice is designed with you in mind. From our board-certified physicians to our state-of-the-art diagnostic technology, from our comprehensive treatment plans to our supportive follow-up care, each element is crafted to provide you with a healthcare experience that's both clinically excellent and deeply compassionate.",
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      accentColor: "from-rose-500/20 to-pink-500/10",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      title: "Excellence in Medicine",
      content: "Our team of specialists brings decades of combined experience and continuous learning to your care. With expertise spanning cardiology, neurology, primary care, and more, we blend traditional medical wisdom with cutting-edge innovation. Every diagnosis, every treatment plan, every interaction is delivered with the precision of modern medicine and the warmth of old-fashioned care.",
      icon: <Stethoscope className="w-8 h-8 text-emerald-400" />,
      accentColor: "from-emerald-500/20 to-teal-500/10",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Why 'Maloof'?",
      content: "The name 'Maloof' represents our founding family's legacy of compassion and community service. It's a reminder that healthcare is fundamentally about human connection — about treating each patient with the same care and dignity we would want for our own loved ones. When you choose Maloof Health, you're not just a patient; you're part of our extended family.",
      icon: <Users className="w-8 h-8 text-purple-400" />,
      accentColor: "from-purple-500/20 to-indigo-500/10",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const healthcareStats = [
    {
      label: "Years of Service",
      value: "29+",
      icon: <Clock className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      label: "Patients Served Annually",
      value: "15,000+",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      label: "Medical Specialists",
      value: "50+",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      label: "Patient Satisfaction",
      value: "98%",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const values = [
    {
      title: "Compassion First",
      description: "Every patient interaction is guided by empathy, respect, and genuine care for your wellbeing.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      title: "Clinical Excellence",
      description: "Board-certified physicians and advanced medical technology ensure the highest standard of care.",
      icon: <Microscope className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Innovation Driven",
      description: "Continuous investment in cutting-edge treatments and diagnostic capabilities.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Patient-Centered",
      description: "Your health goals and preferences guide every decision we make together.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const leadership = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      image: "/doctor-1.webp",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Dr. James Chen",
      role: "Head of Neurology",
      specialty: "Neuroscience",
      image: "/doctor-2.webp",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Director of Primary Care",
      specialty: "Family Medicine",
      image: "/doctor-3.webp",
      gradient: "from-purple-500 to-pink-500"
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
      <div className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/medical-team-hero.webp"
            fill
            className="object-cover brightness-75"
            alt="Maloof Health Medical Team"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                  About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl leading-relaxed">
                  "Where compassionate care meets medical excellence — your health is our life's work."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-12">
                <Link href="/services">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg shadow-xl hover:shadow-blue-500/25">
                    Our Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="bg-white/30 text-white px-8 py-6 text-lg backdrop-blur-sm">
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {healthcareStats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Our Story & Mission
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover what makes Maloof Health more than just a medical center — it's a Dallas healthcare tradition
            </p>
          </div>

          <div className="space-y-12">
            {aboutSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="bg-white/70 backdrop-blur-xl border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Dedicated professionals committed to your health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <Card key={idx} className="bg-white/70 backdrop-blur-xl border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{leader.role}</p>
                  <p className="text-sm text-gray-500">Specialty: {leader.specialty}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Accreditations */}
      <div className="py-12 px-4 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-white text-center">
              <Shield className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">Joint Commission Accredited</p>
            </div>
            <div className="text-white text-center">
              <Award className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">HIPAA Compliant</p>
            </div>
            <div className="text-white text-center">
              <GraduationCap className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">Teaching Hospital Affiliate</p>
            </div>
            <div className="text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">Top 10% Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Invitation */}
      <div className="py-20 px-4 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Visit Our Medical Center
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Located in the heart of Dallas, we welcome you to experience healthcare that puts you first.
            Whether you're visiting for a consultation, treatment, or just to learn more about our services,
            our doors are always open.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg shadow-xl">
              Get Directions
            </Button>
          </Link>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h3 className="text-3xl font-bold text-white mb-8">
            Thank You for Trusting Us
          </h3>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <Heart className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <p className="text-blue-100 text-xl leading-relaxed italic">
              "To our patients — thank you for allowing us to be part of your health journey.
              Every life we touch, every recovery we witness, every smile we see — you are the
              reason we do what we do. Your trust inspires us to be better every day."
            </p>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-blue-300 font-semibold">— The Maloof Health Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;