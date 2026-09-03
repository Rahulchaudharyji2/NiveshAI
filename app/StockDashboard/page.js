"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

const stocksPerPage = 9;

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function getRandomSubset(arr, count) {
  if (!Array.isArray(arr)) return [];
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function StockDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // Load random stocks initially
  useEffect(() => {
    if (debouncedSearch) return;

    setLoading(true);
    setError("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/list`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch stock list");
        const arr = await res.json();
        setStocks(getRandomSubset(arr, stocksPerPage));
        setPage(1);
      })
      .catch(() => {
        setError("Could not fetch stocks.");
        setStocks([]);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  // Load searched stock if a symbol is entered
  useEffect(() => {
    if (!debouncedSearch) return;
    setLoading(true);
    setError("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/search?symbol=${encodeURIComponent(debouncedSearch)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch stock");
        const data = await res.json();
        setStocks(data.found ? [data] : []);
        setPage(1);
      })
      .catch(() => {
        setError("Could not fetch stock.");
        setStocks([]);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  const currentStocks = stocks.slice((page - 1) * stocksPerPage, page * stocksPerPage);

  return (
    <>
    <Navbar />
    <section className="min-h-screen pt-28 pb-20 px-6 bg-[#06050B] text-[var(--text-primary)] flex flex-col relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#2D1B45] via-[#834AA4] to-[#1EFD68] blur-[150px] opacity-20 pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3.5 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)]">
            LIVE EQUITY MARKETS
          </span>
          <h1 className="font-grotesk text-4xl sm:text-5xl font-bold mt-4 text-[var(--text-primary)]">
            Explore <span className="text-gradient-green-blue">Stock Markets</span>
          </h1>
          <p className="font-inter text-sm sm:text-base text-[var(--text-muted)] mt-2 max-w-xl mx-auto">
            Search top equity stocks and access real-time price trends, risk metrics, and AI forecasting.
          </p>
        </div>

        {/* Searchbar */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-xl w-full">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3.5 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[#1EFD68] focus:ring-1 focus:ring-[#1EFD68] backdrop-blur-xl transition-all shadow-lg text-sm"
              placeholder="Search Stock Symbol (e.g. TCS.NS, RELIANCE.NS)…"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-3.5 text-[var(--text-muted)] hover:text-white text-base"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-2 border-[#1EFD68] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400 font-inter">{error}</div>
          ) : currentStocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentStocks.map((stock) => (
                <Link href={`/StockDashboard/${stock.symbol}`} key={stock.symbol}>
                  <div className="glass-card p-6 flex flex-col justify-between h-full group hover:border-[#1EFD68]">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-grotesk text-xs uppercase tracking-wider text-[var(--text-faint)] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                          EQUITY
                        </span>
                        <span className="font-mono text-xs text-[#1EFD68] font-bold font-tabular">
                          {stock.symbol}
                        </span>
                      </div>
                      <h3 className="font-grotesk font-bold text-lg text-[var(--text-primary)] group-hover:text-white transition-colors line-clamp-1 mb-1">
                        {stock.longName || stock.symbol}
                      </h3>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-[var(--text-muted)]">View Analysis</span>
                      <span className="btn-primary-green !py-1.5 !px-3.5 !text-xs">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--text-muted)] font-inter">
              No stocks found matching your query.
            </div>
          )}
        </div>
      </div>
    </section>
    <Chatbot />
    </>
  );
}

