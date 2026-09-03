"use client";

import { useEffect, useState, useCallback } from "react";
import useUser from "@/lib/authClient";
import AIDostModal from "../components/AIDostModal";
import AIReportModal from "../components/AIReportModal";
import Navbar from "../components/Navbar";

export default function PortfolioPage() {
  const { user, isSignedIn, isLoading } = useUser();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAIDost, setShowAIDost] = useState(false);
  const [showAIReport, setShowAIReport] = useState(false);
  const [riskVolatility, setRiskVolatility] = useState({});
  const [monteCarlo, setMonteCarlo] = useState({});

  // Function to calculate aggregate portfolio metrics
  const calculatePortfolioMetrics = useCallback(async () => {
    if (!portfolioItems.length) return;

    try {
      const totalRisk = portfolioItems.reduce(
        (acc, item) => acc + (item.risk_volatility?.annualized_volatility || 0),
        0
      );
      const avgVolatility = totalRisk / portfolioItems.length;

      const totalReturn = portfolioItems.reduce(
        (acc, item) => acc + (item.risk_volatility?.annualized_return || 0),
        0
      );
      const avgReturn = totalReturn / portfolioItems.length;

      setRiskVolatility({
        annualized_volatility: avgVolatility,
        annualized_return: avgReturn,
        sharpe_ratio: (avgReturn - 0.05) / avgVolatility,
      });

      setMonteCarlo({
        expected_nav: portfolioItems.reduce((acc, item) => acc + (item.nav || 0), 0),
        probability_positive_return: avgReturn > 0 ? 75 : 45,
        lower_bound_5th_percentile: avgReturn * 0.95,
        upper_bound_95th_percentile: avgReturn * 1.05,
      });
    } catch (error) {
      console.error("Error calculating portfolio metrics:", error);
    }
  }, [portfolioItems]);

  useEffect(() => {
    calculatePortfolioMetrics();
  }, [calculatePortfolioMetrics]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (isLoading) return;
      
      if (!isSignedIn || !user) {
        setError("Please sign in to view your portfolio");
        setLoading(false);
        return;
      }

      try {
        const userId = encodeURIComponent(user.sub || "");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }

        const items = await response.json();

        const itemsWithMetrics = await Promise.all(
          items.map(async (item) => {
            try {
              let riskResponse, navResponse;
              if (item.item_type === "stock") {
                riskResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/risk-volatility/${item.symbol}`);
                navResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/profile/${item.symbol}`);
              } else {
                riskResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mutual/risk-volatility/${item.symbol}`);
                navResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mutual/scheme-details/${item.symbol}`);
              }

              const risk = await riskResponse.json();
              const nav = await navResponse.json();

              return {
                ...item,
                risk_volatility: risk,
                nav: item.item_type === "stock" ? nav?.currentPrice : nav?.nav,
              };
            } catch (error) {
              console.error(`Error fetching metrics for ${item.symbol}:`, error);
              return item;
            }
          })
        );

        setPortfolioItems(itemsWithMetrics);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to fetch your portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [isSignedIn, user, isLoading]);

  const handleRemoveItem = async (itemId) => {
    if (!isSignedIn || !user) {
      alert("Please sign in to remove items");
      return;
    }

    try {
      const userId = encodeURIComponent(user.sub || "");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${userId}/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setPortfolioItems((items) => items.filter((item) => item.id !== itemId));
      alert("Item removed successfully!");
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  if (!isSignedIn && !isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 bg-[#06050B] text-[var(--text-primary)]">
        <Navbar />
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="font-grotesk text-3xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-[var(--text-muted)] font-inter">You need to be signed in to view your portfolio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[#06050B] text-[var(--text-primary)] relative overflow-hidden">
      <Navbar />
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#2D1B45] via-[#834AA4] to-[#1EFD68] blur-[150px] opacity-20 pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)]">
                ASSET OVERVIEW
              </span>
              <h1 className="font-grotesk text-4xl font-bold text-[var(--text-primary)] mt-3">My Portfolio</h1>
              <p className="font-inter text-sm text-[var(--text-muted)] mt-1">Manage and track your active investments & AI predictions</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowAIDost(true)}
                className="btn-primary-green !py-2.5 !px-5 text-sm flex items-center gap-2"
              >
                <span>🤖</span>
                AI Dost Assistant
              </button>
              <button
                onClick={() => setShowAIReport(true)}
                className="btn-secondary-ghost !py-2.5 !px-5 text-sm flex items-center gap-2"
              >
                <span>📊</span>
                Generate AI Report
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <div className="w-10 h-10 border-2 border-[#1EFD68] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-red-400 font-inter">
            {error}
          </div>
        ) : portfolioItems.length === 0 ? (
          <div className="text-center py-20 glass-card">
            <p className="text-[var(--text-muted)] font-inter">Your portfolio is currently empty. Add stocks or mutual funds from the market dashboards to get started!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <div key={item.id} className="glass-card p-6 flex flex-col justify-between group hover:border-[#1EFD68]">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-grotesk font-bold text-lg text-[var(--text-primary)] mb-1">{item.name}</h3>
                      <p className="font-mono text-xs text-[var(--text-muted)] font-tabular">{item.symbol}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase font-grotesk tracking-wider"
                      style={{
                        backgroundColor: item.item_type === 'stock' ? 'rgba(30, 253, 104, 0.12)' : 'rgba(131, 74, 164, 0.2)',
                        color: item.item_type === 'stock' ? '#1EFD68' : '#D857E0',
                        border: item.item_type === 'stock' ? '1px solid rgba(30, 253, 104, 0.3)' : '1px solid rgba(216, 87, 224, 0.3)'
                      }}>
                      {item.item_type}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-4 border-t border-white/10 mt-4">
                  <span className="font-tabular">Added: {new Date(item.added_at).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Remove Asset
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Modals */}
        <AIDostModal
          isOpen={showAIDost}
          onClose={() => setShowAIDost(false)}
          fundData={{
            meta: {
              portfolio_size: portfolioItems.length,
              stocks_count: portfolioItems.filter(i => i.item_type === 'stock').length,
              mutual_funds_count: portfolioItems.filter(i => i.item_type === 'mutual_fund').length,
              last_added: portfolioItems[0]?.added_at
            },
            riskVolatility,
            monteCarlo,
            portfolioItems
          }}
        />

        <AIReportModal
          isOpen={showAIReport}
          onClose={() => setShowAIReport(false)}
          fundData={{
            meta: {
              portfolio_size: portfolioItems.length,
              stocks_count: portfolioItems.filter(i => i.item_type === 'stock').length,
              mutual_funds_count: portfolioItems.filter(i => i.item_type === 'mutual_fund').length,
              last_added: portfolioItems[0]?.added_at
            },
            riskVolatility,
            monteCarlo,
            portfolioItems
          }}
        />
      </div>
    </div>
  );
}

