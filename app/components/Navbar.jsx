"use client";

import Link from "next/link";
import { useState } from "react";
import useUser, { loginHref, logoutHref } from "@/lib/authClient";

export default function Navbar() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { user, isSignedIn, isLoading } = useUser();

  const toggleNavigation = () => setOpenNavigation(!openNavigation);
  const handleNavClick = () => setOpenNavigation(false);

  const links = [
    { name: "Features", href: "/#features" },
    { name: "Stock", href: "/StockDashboard" },
    { name: "MutualFund", href: "/MFDashboard" },
    { name: "Crypto", href: "/CryptoDashboard" },
    { name: "EducationHub", href: "/Courses" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-[var(--border-subtle)] backdrop-blur-xl transition-all duration-300 ${openNavigation ? "bg-[#06050B]/95" : "bg-[#06050B]/75"
        }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--surface-glass-hover)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--border-glow)] transition-all">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1EFD68] shadow-[0_0_12px_#1EFD68] animate-pulse"></span>
          </div>
          <span className="font-grotesk font-bold text-lg md:text-xl text-[var(--text-primary)] tracking-tight">
            Nevesh<span className="text-gradient-green-blue">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1 py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1EFD68] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
          {isSignedIn && !isLoading && (
            <Link
              href="/Portfolio"
              className="relative text-sm font-semibold text-[#1EFD68] hover:text-[#19C559] transition-colors px-1 py-1 group"
            >
              My Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1EFD68] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoading ? (
            <div className="animate-pulse bg-white/10 h-9 w-24 rounded-full"></div>
          ) : isSignedIn && user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.picture || "/vercel.svg"}
                alt={user.name || "user"}
                className="w-8 h-8 rounded-full border border-[var(--border-subtle)] object-cover"
              />
              <span className="text-sm font-medium text-[var(--text-muted)]">{user.name || user.email}</span>
              <a
                href={logoutHref}
                className="btn-secondary-ghost !py-1.5 !px-4 !text-xs"
              >
                Sign out
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href={loginHref}
                className="btn-secondary-ghost !py-1.5 !px-4 !text-xs"
              >
                Sign in
              </a>
              <a
                href={`${loginHref}?screen_hint=signup`}
                className="btn-primary-green !py-1.5 !px-4 !text-xs"
              >
                Get Started
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
          onClick={toggleNavigation}
          aria-label="Toggle navigation"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${openNavigation ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${openNavigation ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${openNavigation ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {openNavigation && (
        <nav className="lg:hidden fixed top-[65px] left-0 right-0 bg-[#06050B]/95 border-t border-[var(--border-subtle)] backdrop-blur-xl flex flex-col items-center py-6 space-y-5 z-40">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="text-[var(--text-muted)] hover:text-white transition-colors text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
          {isLoading ? (
            <div className="animate-pulse bg-white/10 h-8 w-32 rounded-full"></div>
          ) : isSignedIn ? (
            <Link
              href="/Portfolio"
              onClick={handleNavClick}
              className="text-[#1EFD68] hover:text-[#19C559] text-base font-semibold"
            >
              My Portfolio
            </Link>
          ) : (
            <div className="flex flex-col gap-3 items-center pt-2">
              <a
                href={loginHref}
                className="btn-secondary-ghost !py-2 !px-6 text-sm"
              >
                Sign in
              </a>
              <a
                href={`${loginHref}?screen_hint=signup`}
                className="btn-primary-green !py-2 !px-6 text-sm"
              >
                Get Started
              </a>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

