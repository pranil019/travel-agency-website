import React, { useState } from "react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroBackgroundImage = "/images/explore-world.png";

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-rose-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[tomato] backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#top" className="flex items-center gap-3 text-2xl font-bold text-white">
            <img src="/favicon.svg" alt="TravelHub logo" className="h-7 w-7" />
            <span className="bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
              TRAVEL HUB
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-sm font-medium text-white/90">
            <a href="#destinations" className="hover:text-rose-200 transition">
              Destinations
            </a>
            <a href="#deals" className="hover:text-rose-200 transition">
              Deals
            </a>
            <a href="#guide" className="hover:text-rose-200 transition">
              Travel Guide
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">{isMenuOpen ? "Close" : "Open"}</span>
              <div className="space-y-1.5">
                <div
                  className={[
                    "h-0.5 w-5 bg-white/90 transition-transform",
                    isMenuOpen ? "translate-y-2 rotate-45" : "",
                  ].join(" ")}
                />
                <div
                  className={[
                    "h-0.5 w-5 bg-white/90 transition-opacity",
                    isMenuOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <div
                  className={[
                    "h-0.5 w-5 bg-white/90 transition-transform",
                    isMenuOpen ? "-translate-y-2 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>

            <button
              type="button"
              className="bg-white text-rose-700 hover:bg-rose-50 px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-red-900/20"
            >
              Book Now
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden border-t border-white/10 bg-[tomato] backdrop-blur-md">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-white/95">
              <a
                href="#destinations"
                className="hover:text-rose-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </a>
              <a
                href="#deals"
                className="hover:text-rose-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </a>
              <a
                href="#guide"
                className="hover:text-rose-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Travel Guide
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <main id="top" className="relative isolate overflow-hidden pt-32 pb-20 px-6">
        <div
          className="absolute inset-0 -z-20 bg-center bg-cover opacity-20"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-rose-500/15 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-rose-300 uppercase bg-rose-500/10 border border-rose-300/20 rounded-full">
            Explore the Unexplored
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            Your Journey Starts <br />
            <span className="text-rose-200">Beyond the Horizon.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
            Stop dreaming and start traveling. Travel Hub brings you the most
            exclusive destinations and seamless booking experiences across the
            globe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="px-8 py-4 bg-white text-rose-700 rounded-xl font-bold hover:bg-rose-50 transition-all transform hover:scale-105"
            >
              Start Planning
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-rose-700 text-white border border-rose-600 rounded-xl font-bold hover:bg-rose-600 transition-all"
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
                <div className="text-sm text-rose-200/70 uppercase tracking-wide">
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

