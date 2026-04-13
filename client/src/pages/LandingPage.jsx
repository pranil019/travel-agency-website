import React, { useState } from "react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#top"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            TRAVEL HUB
          </a>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <a href="#destinations" className="hover:text-cyan-400 transition">
              Destinations
            </a>
            <a href="#deals" className="hover:text-cyan-400 transition">
              Deals
            </a>
            <a href="#guide" className="hover:text-cyan-400 transition">
              Travel Guide
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">{isMenuOpen ? "Close" : "Open"}</span>
              <div className="space-y-1.5">
                <div
                  className={[
                    "h-0.5 w-5 bg-white/80 transition-transform",
                    isMenuOpen ? "translate-y-2 rotate-45" : "",
                  ].join(" ")}
                />
                <div
                  className={[
                    "h-0.5 w-5 bg-white/80 transition-opacity",
                    isMenuOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <div
                  className={[
                    "h-0.5 w-5 bg-white/80 transition-transform",
                    isMenuOpen ? "-translate-y-2 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>

            <button
              type="button"
              className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-cyan-900/20"
            >
              Book Now
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-slate-200">
              <a
                href="#destinations"
                className="hover:text-cyan-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </a>
              <a
                href="#deals"
                className="hover:text-cyan-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </a>
              <a
                href="#guide"
                className="hover:text-cyan-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Travel Guide
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <main id="top" className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full">
            Explore the Unexplored
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            Your Journey Starts <br />
            <span className="text-slate-500">Beyond the Horizon.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            Stop dreaming and start traveling. Travel Hub brings you the most
            exclusive destinations and seamless booking experiences across the
            globe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-all transform hover:scale-105"
            >
              Start Planning
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all"
            >
              View Destinations
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            {[
              ["12k+", "Active Travelers"],
              ["150+", "Destinations"],
              ["4.9/5", "User Rating"],
              ["24/7", "Expert Support"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white">{stat}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

