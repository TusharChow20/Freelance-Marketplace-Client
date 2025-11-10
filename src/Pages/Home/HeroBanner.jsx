import React from "react";
import { Link } from "react-router";
import LightRays from "./LightRays";

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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/15 to-indigo-700/10 z-[1]"></div>

      {/* Animated Particles */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Your Trusted Job
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Marketplace
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Connect with top talent and opportunities. Our reliable platform
            makes hiring and job searching seamless, secure, and efficient.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Link
              to="/jobs"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden"
            >
              <span className="relative z-10">Browse Jobs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/create-job"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all transform hover:scale-105 shadow-xl"
            >
              Create a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              10,000+
            </div>
            <div className="text-gray-300 text-lg font-medium">Active Jobs</div>
          </div>
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              50,000+
            </div>
            <div className="text-gray-300 text-lg font-medium">Job Seekers</div>
          </div>
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
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