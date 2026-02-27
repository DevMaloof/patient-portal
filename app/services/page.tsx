// /app/services/page.tsx - ENHANCED CONTENT VERSION
"use client";
import Image from "next/image";
import Reserve from "@/components/reserve";
import Infopanel from "@/components/infopanel";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import LogoText from "@/components/logotextwhite";
import Dialogcode from "@/components/dialog";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Heart,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle,
  Stethoscope,
  Activity,
  Brain,
  Eye,
  Bone,
  Baby,
  Pill,
  Microscope,
  Ambulance,
  Shield,
  Calendar,
  Phone,
  Star,
  FileText,
  Syringe,
  Droplet,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Fix: Remove 'Lungs' if it doesn't exist, use Activity as fallback
// Or you can use a custom SVG if needed

gsap.registerPlugin(ScrollTrigger);

// Define proper types
type SpecialtyId = number | "all";

interface Service {
  name: string;
  description: string;
  duration: string;
  price: string;
  icon: React.ReactNode;
  available: boolean;
}

interface MedicalService {
  id: number;
  category: string;
  icon: React.ReactNode;
  gradient: string;
  bgGradient: string;
  services: Service[];
}

interface Specialty {
  id: SpecialtyId;
  name: string;
  icon: React.ReactNode;
}

const Services = () => {
  const [loading, setLoading] = useState(true);
  // Fix: Properly type the state
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId>("all");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".service-slide-text",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "bounce.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".services-grid-section",
            start: "top 80%",
          },
        }
      );
    }
  }, [loading]);

  // Comprehensive Medical Services with all specialties in one page
  const medicalServices: MedicalService[] = [
    {
      id: 1,
      category: "Primary Care",
      icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/10",
      services: [
        {
          name: "Annual Physical Exams",
          description: "Comprehensive health assessments and preventive screenings",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <CheckCircle className="w-5 h-5" />,
          available: true
        },
        {
          name: "Chronic Disease Management",
          description: "Ongoing care for diabetes, hypertension, and other conditions",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Acute Illness Treatment",
          description: "Same-day appointments for cold, flu, infections, and minor injuries",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        },
        {
          name: "Vaccinations & Immunizations",
          description: "Flu shots, travel vaccines, and routine immunizations",
          duration: "15 min",
          price: "Insurance Covered",
          icon: <Syringe className="w-5 h-5" />,
          available: true
        },
        {
          name: "Women's Health",
          description: "Well-woman exams, family planning, and reproductive health",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Heart className="w-5 h-5" />,
          available: true
        },
        {
          name: "Men's Health",
          description: "Prostate screenings, testosterone management, and wellness",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Users className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 2,
      category: "Cardiology",
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-500/20 to-pink-500/10",
      services: [
        {
          name: "Cardiac Consultations",
          description: "Expert evaluation of heart health concerns and risk factors",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Heart className="w-5 h-5" />,
          available: true
        },
        {
          name: "Echocardiograms",
          description: "Ultrasound imaging to assess heart structure and function",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Stress Testing",
          description: "Exercise and pharmacological stress tests for coronary assessment",
          duration: "90 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Holter Monitoring",
          description: "24-48 hour continuous heart rhythm monitoring",
          duration: "24 hours",
          price: "Insurance Covered",
          icon: <Clock className="w-5 h-5" />,
          available: true
        },
        {
          name: "Hypertension Management",
          description: "Comprehensive treatment plans for high blood pressure",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Lipid Management",
          description: "Cholesterol control and cardiovascular risk reduction",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Droplet className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 3,
      category: "Neurology",
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/10",
      services: [
        {
          name: "Neurological Consultations",
          description: "Expert evaluation of brain, spine, and nervous system disorders",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Brain className="w-5 h-5" />,
          available: true
        },
        {
          name: "EEG (Electroencephalogram)",
          description: "Brain wave testing for epilepsy and seizure disorders",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "EMG/NCV Studies",
          description: "Nerve conduction studies for peripheral neuropathy",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Headache & Migraine Management",
          description: "Comprehensive treatment plans for chronic headaches",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        },
        {
          name: "Movement Disorders",
          description: "Treatment for Parkinson's, tremors, and related conditions",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Memory & Cognitive Assessment",
          description: "Evaluation for dementia, Alzheimer's, and cognitive decline",
          duration: "90 min",
          price: "Insurance Covered",
          icon: <Brain className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 4,
      category: "Orthopedics",
      icon: <Bone className="w-8 h-8 text-emerald-400" />,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/20 to-teal-500/10",
      services: [
        {
          name: "Orthopedic Consultations",
          description: "Expert evaluation of bone, joint, and muscle conditions",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Bone className="w-5 h-5" />,
          available: true
        },
        {
          name: "Sports Medicine",
          description: "Treatment of athletic injuries and performance optimization",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Joint Injections",
          description: "Corticosteroid and viscosupplementation injections",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Syringe className="w-5 h-5" />,
          available: true
        },
        {
          name: "Physical Therapy",
          description: "Rehabilitation and strengthening programs",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Fracture Care",
          description: "Treatment of broken bones and casting services",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Bone className="w-5 h-5" />,
          available: true
        },
        {
          name: "Arthritis Management",
          description: "Comprehensive care for osteoarthritis and rheumatoid arthritis",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 5,
      category: "Pediatrics",
      icon: <Baby className="w-8 h-8 text-amber-400" />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/20 to-orange-500/10",
      services: [
        {
          name: "Well-Child Visits",
          description: "Regular checkups and developmental screenings",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Baby className="w-5 h-5" />,
          available: true
        },
        {
          name: "Childhood Vaccinations",
          description: "All recommended immunizations for children",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Syringe className="w-5 h-5" />,
          available: true
        },
        {
          name: "Sick Child Appointments",
          description: "Same-day visits for acute illnesses",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        },
        {
          name: "Developmental Assessments",
          description: "Monitoring growth and developmental milestones",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Adolescent Medicine",
          description: "Teen health, sports physicals, and counseling",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Users className="w-5 h-5" />,
          available: true
        },
        {
          name: "Pediatric Allergy Testing",
          description: "Identification and management of childhood allergies",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 6,
      category: "Ophthalmology",
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/10",
      services: [
        {
          name: "Comprehensive Eye Exams",
          description: "Complete vision and eye health assessments",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Eye className="w-5 h-5" />,
          available: true
        },
        {
          name: "Cataract Evaluation",
          description: "Assessment and surgical planning for cataracts",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Eye className="w-5 h-5" />,
          available: true
        },
        {
          name: "Glaucoma Screening",
          description: "Pressure testing and optic nerve evaluation",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Diabetic Eye Exams",
          description: "Retinal screenings for diabetic patients",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Contact Lens Fitting",
          description: "Professional fitting and training for contact lenses",
          duration: "60 min",
          price: "Varies",
          icon: <Eye className="w-5 h-5" />,
          available: true
        },
        {
          name: "Pediatric Eye Care",
          description: "Vision screening and treatment for children",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Baby className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 7,
      category: "Pulmonology",
      icon: <Activity className="w-8 h-8 text-emerald-400" />, // Using Activity instead of Lungs
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/20 to-teal-500/10",
      services: [
        {
          name: "Pulmonary Function Tests",
          description: "Comprehensive lung function assessment",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Asthma Management",
          description: "Treatment plans and education for asthma control",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "COPD Care",
          description: "Management of chronic obstructive pulmonary disease",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Sleep Studies",
          description: "Evaluation and treatment of sleep disorders",
          duration: "Overnight",
          price: "Insurance Covered",
          icon: <Clock className="w-5 h-5" />,
          available: true
        },
        {
          name: "Bronchoscopy",
          description: "Diagnostic procedure for lung conditions",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <Microscope className="w-5 h-5" />,
          available: true
        },
        {
          name: "Smoking Cessation",
          description: "Programs and support to quit smoking",
          duration: "60 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        }
      ]
    },
    {
      id: 8,
      category: "Dermatology",
      icon: <Activity className="w-8 h-8 text-purple-400" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/10",
      services: [
        {
          name: "Skin Cancer Screenings",
          description: "Full-body mole checks and skin cancer detection",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Acne Treatment",
          description: "Comprehensive care for acne and scarring",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Eczema & Psoriasis Care",
          description: "Management of chronic skin conditions",
          duration: "45 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Mole Removal",
          description: "Excision of suspicious or problematic moles",
          duration: "30 min",
          price: "Insurance Covered",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Cosmetic Dermatology",
          description: "Botox, fillers, and aesthetic treatments",
          duration: "60 min",
          price: "Varies",
          icon: <Activity className="w-5 h-5" />,
          available: true
        },
        {
          name: "Allergy Patch Testing",
          description: "Identification of contact allergens",
          duration: "90 min",
          price: "Insurance Covered",
          icon: <AlertCircle className="w-5 h-5" />,
          available: true
        }
      ]
    }
  ];

  const specialties: Specialty[] = [
    { id: "all", name: "All Services", icon: <Stethoscope className="w-4 h-4" /> },
    { id: 1, name: "Primary Care", icon: <Stethoscope className="w-4 h-4" /> },
    { id: 2, name: "Cardiology", icon: <Heart className="w-4 h-4" /> },
    { id: 3, name: "Neurology", icon: <Brain className="w-4 h-4" /> },
    { id: 4, name: "Orthopedics", icon: <Bone className="w-4 h-4" /> },
    { id: 5, name: "Pediatrics", icon: <Baby className="w-4 h-4" /> },
    { id: 6, name: "Ophthalmology", icon: <Eye className="w-4 h-4" /> },
    { id: 7, name: "Pulmonology", icon: <Activity className="w-4 h-4" /> },
    { id: 8, name: "Dermatology", icon: <Activity className="w-4 h-4" /> }
  ];

  // Fix: Properly filter services based on selectedSpecialty type
  const filteredServices = selectedSpecialty === "all"
    ? medicalServices
    : medicalServices.filter(s => s.id === selectedSpecialty);

  const healthcareStats = [
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      value: "50+",
      label: "Specialists",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-400" />,
      value: "24/7",
      label: "Emergency Care",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      value: "98%",
      label: "Patient Satisfaction",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Calendar className="w-8 h-8 text-amber-400" />,
      value: "15k+",
      label: "Annual Patients",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
            <Heart className="absolute inset-0 m-auto text-blue-400 w-10 h-10 animate-pulse" />
          </div>
          <p className="text-blue-100 font-medium backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">Loading Medical Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full  bg-white/25 backdrop-blur-2xl z-50 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <LogoText />
            <Dialogcode />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/medical-team-hero.webp"
            fill
            className="object-cover brightness-75"
            alt="Medical Services"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="service-slide-text text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Medical Services</span>
              </h1>
              <p className="service-slide-text text-xl md:text-2xl text-blue-100 mb-8 font-light">
                Comprehensive healthcare under one roof — from primary care to specialized treatment
              </p>
              <Button
                size="lg"
                className="service-slide-text bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-blue-500/25"
                onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse All Services
                <ChevronRight className="ml-2" />
              </Button>
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

      {/* Our Healthcare Philosophy Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Healthcare <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Philosophy</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At Maloof Health, we believe exceptional healthcare begins with listening —
                to your concerns, your goals, and your story. Our comprehensive approach combines
                medical expertise with genuine compassion.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Every treatment plan is personalized, every diagnosis is thorough, and every
                interaction is guided by respect. From preventive care to complex procedures,
                we're committed to your wellbeing at every stage of life.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Patient-Centered Care</h4>
                    <p className="text-gray-600">You're at the center of every decision we make</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Evidence-Based Medicine</h4>
                    <p className="text-gray-600">Treatments backed by the latest medical research</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Continuity of Care</h4>
                    <p className="text-gray-600">Seamless coordination between all your providers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/medical-team-meeting.webp"
                fill
                className="object-cover"
                alt="Medical team consultation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-2">Our Commitment</h3>
                  <p className="text-blue-100">
                    "We treat every patient like family — with respect, dignity, and the highest standard of medical care." – <span className="text-blue-300">Dr. Sarah Mitchell, Chief Medical Officer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="py-8 px-4 bg-white border-y border-white/20 sticky top-16 z-40 backdrop-blur-xl bg-white/70">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${selectedSpecialty === specialty.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 hover:bg-blue-50 border border-white/20"
                  }`}
              >
                {specialty.icon}
                <span className="text-sm font-medium">{specialty.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Services Grid - Comprehensive List */}
      <div id="services-grid" className="py-20 px-4 services-grid-section">
        <div className="max-w-7xl mx-auto">
          {filteredServices.map((category) => (
            <div key={category.id} className="mb-20 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {category.category}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Comprehensive {category.category.toLowerCase()} services for patients of all ages
                  </p>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, idx) => (
                  <Card
                    key={idx}
                    className="service-card bg-white/70 backdrop-blur-xl border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative z-10 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          {service.icon}
                        </div>
                        {service.available && (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-600 text-xs font-medium rounded-full border border-emerald-500/30">
                            Available
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Duration: {service.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                          <span>{service.price}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Category Footer - Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Direct Line: (214) 555-04{30 + category.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Mon-Fri: 8AM-6PM | Sat: 9AM-2PM</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200"
                  >
                    View All {category.category} Services
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Maloof Health
            </h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Experience the difference that comprehensive, compassionate care makes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Stethoscope className="w-8 h-8" />, title: "Board-Certified", desc: "All specialists are board-certified" },
              { icon: <Clock className="w-8 h-8" />, title: "Same-Day Appointments", desc: "Available for urgent needs" },
              { icon: <Shield className="w-8 h-8" />, title: "HIPAA Compliant", desc: "Your privacy is protected" },
              { icon: <Users className="w-8 h-8" />, title: "Family Medicine", desc: "Care for all ages" }
            ].map((item, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur-xl border-white/20 p-6 text-center hover:bg-white/20 transition-all">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Resources Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Insurance Information */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Insurance Accepted</h3>
              <p className="text-gray-600 mb-4">
                We work with most major insurance providers to make healthcare accessible.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Blue Cross Blue Shield</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>UnitedHealthcare</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Cigna</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Aetna</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Medicare & Medicaid</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                Verify Your Coverage
              </Button>
            </div>

            {/* Patient Portal */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Patient Portal</h3>
              <p className="text-gray-600 mb-4">
                Access your medical records, lab results, and communicate with your provider.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>View test results</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Message your doctor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Request prescription refills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Manage appointments</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Login to Portal
              </Button>
            </div>

            {/* New Patients */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">New Patients</h3>
              <p className="text-gray-600 mb-4">
                Welcome to Maloof Health! Here's what you need to know before your first visit.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Download new patient forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Insurance card required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Arrive 15 minutes early</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Bring medication list</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                New Patient Information
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Appointment CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Schedule an Appointment?</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Our team is here to help you find the right specialist and appointment time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            
            <Button size="lg" variant="ghost" className="bg-white/20 text-white hover:bg-white hover:text-blue-400 px-8 py-6 text-lg">
              <Phone className="mr-2" />
              Call (214) 555-0423
            </Button>
          </div>
        </div>
      </div>

      {/* Components */}
      <Reserve />

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
            <p className="text-sm mt-2">700 West Elm Street, Dallas, TX 75201 | (214) 555-0423 | 24/7 Emergency: (214) 555-0911</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;