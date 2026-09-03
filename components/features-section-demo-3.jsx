"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { motion } from "framer-motion";

export default function FeaturesSectionDemo() {
  const features = [
    {
      eyebrow: "REAL-TIME DATA",
      title: "Real-Time Portfolio Tracking",
      description:
        "Monitor your mutual funds, crypto, and stocks seamlessly with live market feeds and AI-driven insights—all in one place.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4",
    },
    {
      eyebrow: "AI-POWERED",
      title: "AI Investment Insights",
      description:
        "Receive personalized, smart recommendations powered by deep learning models. Analyze trends, risks, and portfolio growth effortlessly.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 lg:col-span-2",
    },
    {
      eyebrow: "FINANCIAL LITERACY",
      title: "Learn with NiveshAI",
      description:
        "Access interactive AI Q&A, video courses, and breakdown guides to master stocks, crypto, and mutual funds.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3",
    },
    {
      eyebrow: "GLOBAL MARKETS",
      title: "Global Financial Connectivity",
      description:
        "Connect to worldwide indices and asset markets with zero latency, real-time FX conversions, and secure tracking.",
      skeleton: <SkeletonFour />,
      className:
        "col-span-1 lg:col-span-3",
    },
  ];

  return (
    <section id="features" className="relative w-full bg-[#06050B] py-20 lg:py-32 overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#2D1B45] blur-[160px] opacity-30 pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#1EFD68] blur-[180px] opacity-10 pointer-events-none rounded-full"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)]">
            DESIGNED FOR MODERN INVESTORS
          </span>
          <h2 className="font-grotesk text-3xl sm:text-5xl font-bold leading-tight mt-4 text-[var(--text-primary)]">
            Designed to Empower Every Investor
          </h2>
          <p className="font-inter text-base sm:text-lg text-[var(--text-muted)] mt-4">
            NiveshAI combines real-time analytics, AI intelligence, and interactive learning to help you make confident decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <div className="mb-2">
                <span className="font-grotesk text-[11px] font-bold uppercase tracking-widest text-[var(--green-primary)]">
                  {feature.eyebrow}
                </span>
              </div>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="w-full mt-4">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div className={cn(`glass-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <h3 className="font-grotesk font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p className="font-inter text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
      {children}
    </p>
  );
};

// --- Custom Skeletons without stock photos ---

export const SkeletonOne = () => {
  return (
    <div className="relative flex items-center justify-center py-4 h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-white/10 bg-[#0D0A16]">
      <img
        src="/ss.png"
        alt="Portfolio tracking"
        className="w-full h-full object-cover rounded-lg border border-white/5 opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06050B] via-[#06050B]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#06050B]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  // Custom mini AI analytics widgets instead of stock images
  return (
    <div className="relative flex flex-col gap-3 py-3 h-64 sm:h-72 overflow-hidden justify-center">
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Asset Allocation Widget */}
        <div className="p-3.5 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-subtle)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Portfolio Growth</span>
            <span className="text-[#1EFD68] font-bold font-tabular">+24.8%</span>
          </div>
          <div className="h-12 w-full mt-2 flex items-end gap-1">
            {[40, 55, 35, 70, 65, 85, 95].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-[var(--purple-accent)] to-[#1EFD68] rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"
              ></div>
            ))}
          </div>
        </div>

        {/* Card 2: Risk Rating Widget */}
        <div className="p-3.5 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-subtle)] flex flex-col justify-between">
          <div className="text-xs text-[var(--text-muted)]">Sharpe Ratio</div>
          <div className="font-grotesk text-xl font-bold text-[#2CA4FA] font-tabular mt-1">2.45</div>
          <div className="text-[10px] text-[var(--text-faint)] mt-1">Optimal Risk/Reward</div>
        </div>
      </div>

      {/* Card 3: AI Recommendation Pill */}
      <div className="p-3.5 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-glow)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1EFD68]/10 border border-[#1EFD68]/30 flex items-center justify-center text-[#1EFD68] text-xs">
            🤖
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">AI Rebalance Alert</div>
            <div className="text-[10px] text-[var(--text-muted)]">Increase SIP allocation in Large Cap</div>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-[#1EFD68] bg-[#1EFD68]/10 px-2.5 py-1 rounded-full border border-[#1EFD68]/20">
          Apply
        </span>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="flex justify-center items-center h-64 sm:h-72 mt-2">
      <div className="w-full max-w-sm glass-card border border-[var(--border-subtle)] p-4 flex flex-col justify-between rounded-xl">
        <div className="space-y-2.5 text-xs">
          {/* User question bubble */}
          <div className="self-start bg-[var(--surface-glass-hover)] text-[var(--text-primary)] px-3 py-2 rounded-lg rounded-bl-none max-w-[85%] border border-white/5">
            What is a SIP and how does compound interest help?
          </div>
          {/* AI Response bubble with green accent border */}
          <div className="self-end bg-[rgba(30,253,104,0.06)] text-[var(--text-primary)] px-3 py-2 rounded-lg rounded-br-none max-w-[85%] border-l-2 border-[#1EFD68]">
            <span className="font-semibold text-[#1EFD68] block mb-0.5">NiveshAI</span>
            A Systematic Investment Plan (SIP) allows investing fixed amounts regularly. Compounding yields exponential long-term growth!
          </div>
        </div>

        {/* Input mock */}
        <div className="flex items-center gap-2 mt-4 pt-2 border-t border-white/10">
          <input
            type="text"
            readOnly
            value="Ask any financial term..."
            className="w-full px-3 py-1.5 rounded-lg bg-white/5 text-xs text-[var(--text-muted)] border border-white/10 focus:outline-none"
          />
          <button className="btn-primary-green !py-1.5 !px-3 !text-xs">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative flex items-center justify-center h-64 sm:h-72 overflow-visible">
      <div className="absolute w-[240px] h-[240px] bg-[#834AA4] blur-[80px] opacity-25 pointer-events-none rounded-full"></div>
      <div className="w-[260px] h-[260px] flex justify-center items-center">
        <Globe />
      </div>
    </div>
  );
};

export const Globe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rect = canvasRef.current.getBoundingClientRect();
    const width = Math.max(260, Math.floor(rect.width * dpr));
    const height = Math.max(260, Math.floor(rect.height * dpr));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width,
      height,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.1, 0.25],
      markerColor: [0.12, 0.99, 0.41],
      glowColor: [0.5, 0.3, 0.7],
      markers: [
        { location: [37.7749, -122.4194], size: 0.06 },
        { location: [28.6139, 77.209], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.05 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.006;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      className="rounded-full"
    />
  );
};

