import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-[var(--border-subtle)] bg-[#06050B] text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-[var(--surface-glass)] border border-[var(--border-subtle)] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#1EFD68] shadow-[0_0_8px_#1EFD68]"></span>
            </div>
            <span className="font-grotesk font-bold text-base text-[var(--text-primary)] tracking-tight">
              Wealth<span className="text-gradient-green-blue">Pulse</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <Link href="/#features" className="hover:text-[var(--text-primary)] transition-colors">Features</Link>
            <Link href="/StockDashboard" className="hover:text-[var(--text-primary)] transition-colors">Stocks</Link>
            <Link href="/MFDashboard" className="hover:text-[var(--text-primary)] transition-colors">Mutual Funds</Link>
            <Link href="/CryptoDashboard" className="hover:text-[var(--text-primary)] transition-colors">Crypto</Link>
            <Link href="/Courses" className="hover:text-[var(--text-primary)] transition-colors">Education Hub</Link>
          </nav>

          {/* Copyright */}
          <div className="font-inter text-xs text-[var(--text-faint)]">
            © {new Date().getFullYear()} NiveshAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

