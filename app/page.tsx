// /app/page.tsx - HEALTHCARE TRANSFORMED VERSION
"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  X,
  Heart,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Star,
  Stethoscope,
  Award,
  Activity,
  Sparkles,
  Shield,
  Calendar,
  Ambulance,
  Brain,
  Microscope,
  Phone,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Reserve from "@/components/reserve";
import Infopanel from "@/components/infopanel";
import Dialogcode from "@/components/dialog";
import LogoText from "@/components/logotextwhite";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const slides = [
    {
      img: "/hospital-exterior.webp",
      title: "Welcome to Maloof Health",
      desc: "Where Compassion Meets Advanced Medical Excellence",
      highlight: "Est. 1995 | Accredited"
    },
    {
      img: "/medical-team.webp",
      title: "World-Class Specialists",
      desc: "Board-Certified Physicians Dedicated to Your Wellbeing",
      highlight: "50+ Specialists"
    },
    {
      img: "/facility.webp",
      title: "State-of-the-Art Facility",
      desc: "Cutting-Edge Technology for Precise Diagnosis & Treatment",
      highlight: "Modern Care"
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency services",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Users,
      title: "Expert Medical Team",
      description: "50+ Board-Certified Specialists",
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: MapPin,
      title: "Convenient Locations",
      description: "3 Centers Across the City",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Star,
      title: "Patient Excellence",
      description: "4.9/5 Patient Satisfaction",
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
  ];

  const medicalServices = [
    {
      title: "Primary Care",
      description: "Comprehensive healthcare for your entire family, from routine check-ups to chronic disease management.",
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      image: "/primary-care.webp",
      stats: "24/7 Availability"
    },
    {
      title: "Cardiology",
      description: "Advanced cardiac care with state-of-the-art diagnostic technology and preventive programs.",
      icon: <Activity className="w-8 h-8 text-blue-400" />,
      image: "/cardiology.webp",
      stats: "98% Success Rate"
    },
    {
      title: "Neurology",
      description: "Expert diagnosis and treatment of neurological disorders with cutting-edge neuroscience.",
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      image: "/neurology.webp",
      stats: "15+ Specialists"
    },
    {
      title: "Emergency Care",
      description: "Immediate medical attention with advanced life support systems and trauma care.",
      icon: <Ambulance className="w-8 h-8 text-amber-400" />,
      image: "/emergency.webp",
      stats: "< 10min Wait"
    },
  ];

  const whyChooseUs = [
    {
      title: "Patient-First Approach",
      description: "Your health journey is personalized with compassionate care at every step.",
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
    },
    {
      title: "Advanced Technology",
      description: "Latest medical equipment and digital health solutions for accurate diagnoses.",
      icon: <Microscope className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Insurance Accepted",
      description: "We work with all major insurance providers to make healthcare accessible.",
      icon: <Award className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Telehealth Services",
      description: "Virtual consultations from the comfort of your home.",
      icon: <Calendar className="w-8 h-8 text-amber-400" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "The care I received at Maloof Health was exceptional. The doctors truly listen and take time to explain everything.",
      rating: 5,
      image: "/testimonial-1.webp"
    },
    {
      name: "Robert Chen",
      role: "Family Medicine Patient",
      content: "State-of-the-art facility with a warm, welcoming atmosphere. Finally found a healthcare provider I trust completely.",
      rating: 5,
      image: "/testimonial-2.webp"
    },
    {
      name: "Maria Garcia",
      role: "Cardiology Patient",
      content: "The cardiology team saved my life. Their expertise and compassion made all the difference in my recovery.",
      rating: 5,
      image: "/testimonial-3.webp"
    },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [scrollEnabled]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
          },
        }
      );
    }
  }, [loading]);

  const handleExplore = () => {
    setScrollEnabled(true);
    setTimeout(() => {
      document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message === "Already subscribed!") {
          toast.success("You're already part of our health community! 🏥");
        } else {
          toast.success("Welcome to Maloof Health! Check your email for wellness tips. 📧");
        }
        setEmail("");
        setEmailError("");
        setTimeout(() => {
          setVisible(false);
          setHasBeenClosed(true);
        }, 1500);
      } else {
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setVisible(false);
          setHasBeenClosed(true);
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin backdrop-blur-sm"></div>
          <Heart className="absolute inset-0 m-auto text-white w-16 h-16 animate-pulse" />
        </div>
        <div className="text-center backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
          <p className="text-blue-100 text-xl font-medium mb-2">Welcome to</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Maloof Health</h1>
          </div>
          <p className="text-blue-200/70">Preparing your healthcare experience...</p>
        </div>
      </div>
    );
  }

  return (
    // ✅ Fixed: Explicit background that doesn't rely on browser theme
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">

      {/* Navigation with glassmorphism - fixed colors */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-xl z-50 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <LogoText />
            <Dialogcode />
          </div>
        </div>
      </nav>

      {/* Hero Carousel - dark overlay for text readability */}
      <div ref={heroRef} className="h-screen w-full relative">
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="h-full"
        >
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-screen w-full">
                  <Image
                    src={slide.img}
                    fill
                    className="object-cover brightness-50"
                    alt={slide.title}
                    priority
                  />
                  {/* Dark overlay instead of gradient */}
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                      <div className="max-w-2xl">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/30 shadow-xl">
                          {slide.highlight}
                        </span>
                        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="hero-title text-xl md:text-2xl text-white/90 mb-8 font-light">
                          {slide.desc}
                        </p>
                        <Button
                          size="lg"
                          className="hero-title bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                          onClick={handleExplore}
                        >
                          Explore Our Services
                          <ChevronRight className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border-white/30 shadow-xl" />
          <CarouselNext className="absolute right-4 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border-white/30 shadow-xl" />
        </Carousel>
      </div>

      {/* Features Section - dark theme consistent */}
      <div id="services-section" className="py-20 px-4 relative overflow-hidden bg-slate-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Why Choose Maloof Health
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience healthcare redefined with our commitment to excellence in every aspect of your care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 features-section">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card group">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center h-full relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-slate-700/50 mb-6`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Services Section - already dark, keep as is */}
      <div className="py-20 px-4 relative overflow-hidden bg-slate-800">
        <div className="max-w-7xl mx-auto relative z-10 services-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Medical Services</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Comprehensive healthcare services delivered with compassion and cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {medicalServices.map((service, idx) => (
              <div key={idx} className="service-card">
                <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:bg-slate-700 transition-all duration-300 overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-slate-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/20">
                          {service.stats}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-slate-800 px-0"
                      >
                        Learn more <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - dark theme */}
      <div className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Committed to Your
                </span>
                <br />
                <span className="text-white">Health & Wellbeing</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                At Maloof Health, we believe in providing not just medical care, but a holistic healthcare experience that puts you at the center of everything we do.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative bg-slate-800/80 backdrop-blur-xl border-slate-700 shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Patient Stories</h3>
                    <p className="text-gray-400">Real experiences from our community</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {testimonials.map((testimonial, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm mb-2">{testimonial.content}</p>
                        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                        <p className="text-xs text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - dark theme */}
      <div className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <Card className="p-8 md:p-12 bg-slate-800/50 backdrop-blur-xl border-slate-700 shadow-2xl rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Stay Healthy, Stay Informed
                </h3>
                <p className="text-gray-300 mb-6">
                  Subscribe to our health newsletter for wellness tips, medical updates, and exclusive health resources from our specialists.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full h-12 rounded-xl bg-slate-900/50 backdrop-blur-sm border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 ${emailError ? "border-rose-500" : ""}`}
                    />
                    {emailError && (
                      <p className="text-rose-400 text-sm mt-2 ml-2">{emailError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subscribing...
                      </div>
                    ) : (
                      "Subscribe to Health Updates"
                    )}
                  </Button>
                </form>
              </div>
              <div className="relative h-64 md:h-full rounded-2xl overflow-hidden border border-slate-600 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 z-10" />
                <div className="relative w-full h-full bg-slate-900/50 flex items-center justify-center">
                  <div className="text-center p-6 absolute z-20">
                    <Heart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Wellness Weekly</h4>
                    <p className="text-gray-300 text-sm">
                      Get expert health tips, updates, and special offers delivered to your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Reserve />

      {/* Footer - already dark, keep as is */}
      <footer className="bg-slate-950 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maloof Health</span>
              </div>
              <p className="text-gray-500">
                Your trusted partner in health and wellness since 1995
              </p>
            </div>
            <Infopanel />
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Maloof Health Systems. All rights reserved.</p>
            <p className="text-sm mt-2 flex items-center justify-center gap-4">
              <span>700 West Elm Street, Dallas, TX 75201</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>(214) 555-0423</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>24/7 Emergency: (214) 555-0911</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}