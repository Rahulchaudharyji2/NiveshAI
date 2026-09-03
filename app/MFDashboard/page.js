"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

// Debounce utility
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const fetchSchemes = async (search = "") => {
  const url = search
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/mutual/schemes?search=${encodeURIComponent(search)}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/mutual/schemes`;
  const res = await fetch(url);
  if (!res.ok) return {};
  return await res.json();
};

function getRandomMFs(schemesObj, count = 6) {
  const entries = Object.entries(schemesObj);
  if (entries.length <= count) return entries;
  const shuffled = entries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function MFDashboardPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState({});
  const [displayedMfs, setDisplayedMfs] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetchSchemes(debouncedSearch).then((data) => {
      setSchemes(data);
      if (debouncedSearch) {
        const mfArr = Object.entries(data).slice(0, 8);
        setDisplayedMfs(mfArr);
        setNoResults(mfArr.length === 0);
      } else {
        const mfArr = getRandomMFs(data, 6);
        setDisplayedMfs(mfArr);
        setNoResults(mfArr.length === 0);
      }
      setLoading(false);
    });
  }, [debouncedSearch]);

  const onSearchChange = (e) => setSearch(e.target.value);
  const onClearSearch = () => {
    setSearch("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <>
    <Navbar />
    <section className="min-h-screen pt-28 pb-20 px-6 bg-[#06050B] text-[var(--text-primary)] flex flex-col relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#2D1B45] via-[#834AA4] to-[#1EFD68] blur-[150px] opacity-20 pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3.5 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)]">
            MUTUAL FUNDS DISCOVERY
          </span>
          <h1 className="font-grotesk text-4xl sm:text-5xl font-bold mt-4 text-[var(--text-primary)]">
            Explore <span className="text-gradient-green-blue">Mutual Funds</span>
          </h1>
          <p className="font-inter text-sm sm:text-base text-[var(--text-muted)] mt-2 max-w-xl mx-auto">
            Search thousands of mutual fund schemes and analyze historical NAV returns, risk volatility, and Monte Carlo forecasts.
          </p>
        </div>

        {/* Searchbar */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-xl w-full">
            <input
              ref={inputRef}
              value={search}
              onChange={onSearchChange}
              type="text"
              placeholder="Search Mutual Funds by scheme name…"
              className="w-full px-6 py-3.5 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[#1EFD68] focus:ring-1 focus:ring-[#1EFD68] backdrop-blur-xl transition-all shadow-lg text-sm"
              aria-label="Search Mutual Funds"
            />
            {search && (
              <button
                onClick={onClearSearch}
                className="absolute right-5 top-3.5 text-[var(--text-muted)] hover:text-white text-base"
                aria-label="Clear Search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-2 border-[#1EFD68] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : noResults ? (
          <div className="flex flex-col items-center py-16">
            <span className="text-4xl mb-4 opacity-70">🔍</span>
            <span className="text-[var(--text-muted)] text-base font-inter">
              No mutual funds found. Try another search query!
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedMfs.map(([code, name]) => (
              <div
                key={code}
                className="glass-card p-6 flex flex-col justify-between h-full group hover:border-[#1EFD68]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-grotesk text-xs uppercase tracking-wider text-[var(--text-faint)] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      MUTUAL FUND
                    </span>
                    <span className="font-mono text-xs text-[#1EFD68] font-bold font-tabular">
                      #{code}
                    </span>
                  </div>
                  <h3 className="font-grotesk font-bold text-base text-[var(--text-primary)] group-hover:text-white transition-colors line-clamp-2 mb-2">
                    {name}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">View NAV & Analytics</span>
                  <Link href={`/MFDashboard/${code}`}>
                    <span className="btn-primary-green !py-1.5 !px-3.5 !text-xs">
                      View Details →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Chatbot />
    </section>
    </>
  );
}

