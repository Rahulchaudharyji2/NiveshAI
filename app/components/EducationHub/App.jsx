import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../style";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const initialVideos = [
  { title: "Stock Market for Beginners", videoId: "p7HKvqRI_Bo" },
  { title: "How to Invest in ETFs", videoId: "PHe0bXAIuk0" },
  { title: "Mutual Funds Explained", videoId: "1d_jYPL6uUI" },
  { title: "Cryptocurrency Investing", videoId: "9nlhmVrkv1Q" },
  { title: "What Are Bonds & How Do They Work?", videoId: "xVU4byInxk4" },

  { title: "Ethereum and Smart Contracts", videoId: "pWGLtjG-F5c" },
];

const trendingNews = [
  {
    title: "Tech Stocks Surge in 2025",
    summary: "Analysts predict a boom in tech investments.",
    url: "https://www.google.com/search?q=tech+stocks+surge+2025",
  },
  {
    title: "Crypto Market Volatility Continues",
    summary: "Bitcoin and Ethereum face fluctuations.",
    url: "https://www.google.com/search?q=crypto+market+volatility+2025",
  },
  {
    title: "Federal Reserve Rate Cut Impact",
    summary: "How lower rates affect markets in 2025.",
    url: "https://www.google.com/search?q=federal+reserve+rate+cut+2025",
  },
  {
    title: "Emerging Markets Gain Momentum",
    summary: "Investment trends in developing economies.",
    url: "https://www.google.com/search?q=emerging+markets+2025",
  },
];

const EducationHub = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }
    if (!YOUTUBE_API_KEY) {
      setError("Invalid or missing YouTube API key.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!data.items || data.items.length === 0) throw new Error("No videos found.");
      setVideos(
        data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
        }))
      );
    } catch (err) {
      setError(`Failed to fetch videos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#06050B] min-h-screen text-[var(--text-primary)] relative overflow-hidden py-12 px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#2D1B45] via-[#834AA4] to-[#1EFD68] blur-[150px] opacity-20 pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="font-grotesk text-xs uppercase tracking-widest text-[var(--green-primary)] font-semibold px-3.5 py-1 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)]">
            FINANCIAL KNOWLEDGE
          </span>
          <motion.h1
            className="font-grotesk text-4xl sm:text-5xl font-bold mt-4 text-[var(--text-primary)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Financial <span className="text-gradient-green-blue">Education Hub</span>
          </motion.h1>
          <p className="font-inter text-sm sm:text-base text-[var(--text-muted)] mt-2 max-w-xl mx-auto">
            Master stock markets, crypto, and mutual fund investing with curated video lessons and market analysis.
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative max-w-xl w-full flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search financial video courses..."
              className="w-full px-6 py-3.5 rounded-full bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[#1EFD68] focus:ring-1 focus:ring-[#1EFD68] backdrop-blur-xl transition-all shadow-lg text-sm"
            />
            <motion.button
              onClick={fetchVideos}
              className="btn-primary-green !py-3 !px-6 text-sm shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#1EFD68] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && <p className="text-center text-red-400 font-inter mb-8">{error}</p>}

        {/* Video Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="glass-card p-5 flex flex-col justify-between group hover:border-[#1EFD68]"
              whileHover={{ y: -4 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <h3 className="font-grotesk font-semibold text-[var(--text-primary)] text-base leading-snug mb-3 line-clamp-2">
                {video.title}
              </h3>
              <iframe
                width="100%"
                height="180"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                frameBorder="0"
                allowFullScreen
                title={video.title}
                className="rounded-xl border border-white/10"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent mb-12"></div>

        {/* Trending News Section */}
        <div className="text-center mb-8">
          <motion.h2
            className="font-grotesk text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Trending Financial Insights
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {trendingNews.map((news, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 flex flex-col justify-between group hover:border-[#1EFD68]"
              whileHover={{ y: -3 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            >
              <div>
                <h3 className="font-grotesk font-bold text-[var(--text-primary)] text-lg mb-2 group-hover:text-white transition-colors">
                  {news.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{news.summary}</p>
              </div>
              <div>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-ghost !py-1.5 !px-4 !text-xs inline-flex items-center gap-1.5"
                >
                  Read Market Story →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EducationHub;
