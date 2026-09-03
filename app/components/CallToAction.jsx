"use client";
import useUser, { loginHref } from "@/lib/authClient";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

const useRelativeMousePosition = (to) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return [mouseX, mouseY];
};

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const borderedDivRef = useRef(null);
  const { isSignedIn } = useUser();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
  const imageMask = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#06050B] text-white relative overflow-hidden"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#2D1B45] via-[#834AA4] to-[#1EFD68] blur-[150px] opacity-25 pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={borderedDivRef}
          className="relative glass-card border border-[var(--border-subtle)] py-20 px-8 rounded-3xl overflow-hidden group max-w-5xl mx-auto"
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 bg-[#0D0A16]/80 bg-blend-overlay opacity-60 group-hover:opacity-30 transition duration-700 pointer-events-none"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div>

          {/* Interactive Mouse Hover layer */}
          <motion.div
            className="absolute inset-0 bg-[#2D1B45]/40 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
            style={{
              maskImage: imageMask,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>

          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              START INVESTING SMARTER TODAY
            </span>
            
            <h2 className="font-grotesk text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto text-[var(--text-primary)] leading-tight">
              Empower Your Financial Future with <span className="text-gradient-green-blue">NiveshAI</span>
            </h2>
            
            <p className="font-inter text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-10 mt-5 mx-auto leading-relaxed">
              Unleash your financial potential with your personal AI-powered investment companion.
            </p>

            <div>
              {isSignedIn ? (
                <Link
                  href="/Portfolio"
                  className="btn-primary-green text-base px-9 py-4 inline-flex items-center gap-3"
                >
                  Go to Portfolio
                  <span className="text-xl">→</span>
                </Link>
              ) : (
                <a
                  href={`${loginHref}?screen_hint=signup`}
                  className="btn-primary-green text-base px-9 py-4 inline-flex items-center gap-3"
                >
                  Get Started Free
                  <span className="text-xl">→</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

