'use client'
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "“NiveshAI gave me the confidence to start investing. The real-time insights make complex market data feel simple and actionable.”",
    name: "Aarav Sharma",
    title: "Young Investor",
    avatarImg: avatar2,
  },
  {
    text: "“The AI-driven recommendations and education hub completely changed how I manage my mutual funds and crypto portfolio.”",
    name: "Priya Mehta",
    title: "Finance Student",
    avatarImg: avatar3,
  },
  {
    text: "“As a working professional, I finally have a single glassmorphic dashboard to track my portfolio and make smarter financial moves.”",
    name: "Rahul Khanna",
    title: "Product Manager @ FinEdge",
    avatarImg: avatar4,
  },
  {
    text: "“NiveshAI makes investing feel effortless—it’s like having an intelligent personal financial advisor in your pocket.”",
    name: "Neha Kapoor",
    title: "Entrepreneur",
    avatarImg: avatar1,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#06050B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)] mb-3">
          USER STORIES
        </span>

        <h2 className="font-grotesk text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] text-center">
          Trusted by Smart Investors
        </h2>
        
        <p className="font-inter text-base sm:text-lg text-[var(--text-muted)] max-w-md mx-auto text-center mt-3 leading-relaxed">
          Discover how NiveshAI empowers users to invest confidently and grow smarter with AI-driven insights.
        </p>

        {/* Marquee container with edge mask */}
        <div className="relative w-full mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            initial={{ translateX: `-50%` }}
            animate={{ translateX: `0%` }}
            transition={{
              ease: "linear",
              repeat: Infinity,
              duration: 35,
            }}
            className="flex gap-6 pr-6 flex-none will-change-transform"
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${idx}`}
                className="glass-card p-7 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-glow)] max-w-sm flex-none flex flex-col justify-between"
              >
                <div>
                  {/* Green Star Ratings */}
                  <div className="flex gap-1 text-[#1EFD68] text-sm mb-4">
                    ★★★★★
                  </div>
                  <p className="font-inter text-sm sm:text-base text-[var(--text-primary)] leading-relaxed italic">
                    {testimonial.text}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                  <Image
                    src={testimonial.avatarImg}
                    alt={`Avatar for ${testimonial.name}`}
                    className="h-10 w-10 rounded-full border border-[var(--border-glow)] object-cover"
                  />
                  <div>
                    <div className="font-grotesk font-semibold text-sm text-[var(--text-primary)]">{testimonial.name}</div>
                    <div className="font-inter text-xs text-[var(--text-muted)]">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

