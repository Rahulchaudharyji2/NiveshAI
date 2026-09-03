"use client";

import { motion } from "framer-motion";
import starsBg from "@/assets/stars.png";
import useUser, { loginHref } from "@/lib/authClient";

export default function Hero() {
  const { isSignedIn } = useUser();

  const stats = [
    { value: "₹500+ Cr", label: "Assets Analyzed" },
    { value: "25,000+", label: "Active Investors" },
    { value: "99.8%", label: "AI Forecast Accuracy" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white bg-[#06050B] pt-32 pb-24 flex flex-col items-center">
      {/* Animated Stars Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        animate={{
          backgroundPositionX: [0, 800],
          backgroundPositionY: [0, 200],
        }}
        transition={{
          backgroundPositionX: { duration: 90, ease: "linear", repeat: Infinity },
          backgroundPositionY: { duration: 70, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        }}
        style={{
          backgroundImage: `url(${starsBg.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Atmospheric Blur Radial Blobs (Purple -> Magenta & Emerald) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#2D1B45] via-[#834AA4] to-[#D857E0] blur-[130px] opacity-35 pointer-events-none rounded-full"></div>
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-[#1EFD68] blur-[150px] opacity-15 pointer-events-none rounded-full"></div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-6">
        
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)] backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#1EFD68] shadow-[0_0_8px_#1EFD68]"></span>
          <span className="font-grotesk text-xs uppercase tracking-wider text-[var(--green-primary)] font-semibold">
            Next-Gen AI Fintech Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-grotesk text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-[var(--text-primary)]"
        >
          Transforming complex finance into{" "}
          <span className="block mt-1 text-gradient-green-blue">
            Simple, Smart decisions
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-9 leading-relaxed"
        >
          Real-time AI insights, smart portfolio analytics, and personalized financial learning—all in one seamless glassmorphic dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <a
            href={isSignedIn ? "/Portfolio" : `${loginHref}?screen_hint=signup`}
            className="btn-primary-green text-base px-8 py-3.5"
          >
            Get Started Free →
          </a>
          <a
            href="#features"
            className="btn-secondary-ghost text-base px-8 py-3.5"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Glass Dashboard Screenshot Preview with Glow Border */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-4xl p-2 rounded-2xl glass-card border border-[var(--border-subtle)] shadow-[0_0_50px_rgba(30,253,104,0.12)] group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--border-glow)] via-transparent to-transparent opacity-20 pointer-events-none rounded-2xl"></div>
          <img
            src="/ss.png"
            alt="NiveshAI Dashboard Preview"
            className="w-full h-auto rounded-xl object-cover border border-white/10"
          />
        </motion.div>

        {/* Stats Band */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-3xl glass-card py-6 px-8 border border-[var(--border-subtle)]"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-grotesk font-bold text-2xl sm:text-3xl text-gradient-green-blue font-tabular">
                {stat.value}
              </span>
              <span className="font-inter text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

