import React from "react";
import { Link } from "react-router";
import LightRays from "./LightRays";
import CardSwap, { Card } from "./CardSwap";

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden min-h-[85vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#8b5cf6"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.08}
          distortion={0.03}
          fadeDistance={0.9}
          saturation={1.2}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/15 to-indigo-700/10 z-[1]"></div>
      <div className="absolute inset-0 z-[2] opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Trusted Job
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                Marketplace
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Connect with top talent and opportunities. Our reliable platform
              makes hiring and job searching seamless, secure, and efficient.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
              <Link
                to="/allJobs"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden"
              >
                <span className="relative z-10">Browse Jobs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/add-job"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all transform hover:scale-105 shadow-xl"
              >
                Create a Job
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative h-[600px]">
            <CardSwap
              width={400}
              height={500}
              cardDistance={50}
              verticalDistance={60}
              delay={2000}
              pauseOnHover={true}
              skewAmount={6}
              easing="power"
              animationStyle="flip "
            >
              <Card customClass="bg-gradient-to-br from-blue-600/90 to-purple-600/90 backdrop-blur-xl border-white/20 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">10,000+</h3>
                <p className="text-xl text-white/90">Active Jobs</p>
                <p className="text-white/70 mt-4">
                  Find your perfect opportunity
                </p>
              </Card>
              <Card customClass="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-white/20 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">50,000+</h3>
                <p className="text-xl text-white/90">Job Seekers</p>
                <p className="text-white/70 mt-4">Join our talent community</p>
              </Card>
              <Card customClass="bg-gradient-to-br from-indigo-600/90 to-purple-600/90 backdrop-blur-xl border-white/20 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">5,000+</h3>
                <p className="text-xl text-white/90">Companies</p>
                <p className="text-white/70 mt-4">Trusted employers hiring</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-3xl md:text-4xl lg:text-5xl  font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              10,000+
            </div>
            <div className="text-gray-300 text-lg font-medium">Active Jobs</div>
          </div>
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-3xl md:text-4xl lg:text-5xl  font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              50,000+
            </div>
            <div className="text-gray-300 text-lg font-medium">Job Seekers</div>
          </div>
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3  group-hover:scale-110 transition-transform">
              5,000+
            </div>
            <div className="text-gray-300 text-lg font-medium">Companies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
