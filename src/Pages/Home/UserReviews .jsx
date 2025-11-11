import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const UserReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review:
        "I found my dream job within two weeks of signing up! The platform is intuitive, and the job matches were incredibly accurate. Highly recommend to anyone serious about their career.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Creative Studios",
      avatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      review:
        "As an employer, this platform has been a game-changer. We've hired three exceptional candidates in the past month. The quality of applicants is outstanding.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Design Co.",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      review:
        "The application process is so smooth! I love how I can track all my applications in one place. Got multiple interviews lined up thanks to this platform.",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Data Analyst",
      company: "Analytics Hub",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review:
        "Best job marketplace I've used. The search filters are powerful, and the company profiles are detailed. Landed a role that perfectly matches my skills.",
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "HR Director",
      company: "Global Enterprises",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      review:
        "We've been using this platform for recruitment for 6 months now. The candidate pool is diverse and qualified. Our hiring time has reduced by 40%!",
    },
    {
      id: 6,
      name: "Alex Kumar",
      role: "Full Stack Developer",
      company: "StartUp Labs",
      avatar: "https://i.pravatar.cc/150?img=14",
      rating: 5,
      review:
        "The job recommendations are spot-on! I received notifications for positions I didn't even know I was looking for, and they turned out to be perfect fits.",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-300 text-lg">
          Real stories from job seekers and employers who found success
        </p>
      </div>

      <div className="relative">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-8 right-8 opacity-10">
            <Quote className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-white text-xl md:text-2xl text-center mb-8 leading-relaxed max-w-4xl mx-auto">
              "{reviews[currentIndex].review}"
            </p>
            <div className="flex flex-col items-center">
              <img
                src={reviews[currentIndex].avatar}
                alt={reviews[currentIndex].name}
                className="w-20 h-20 rounded-full border-4 border-white/20 mb-4"
              />
              <h4 className="text-white font-bold text-xl">
                {reviews[currentIndex].name}
              </h4>
              <p className="text-gray-300 font-medium">
                {reviews[currentIndex].role}
              </p>
              <p className="text-gray-400 text-sm">
                {reviews[currentIndex].company}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all group"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all group"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-gradient-to-r from-blue-400 to-purple-400"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center border border-white/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            4.9/5
          </div>
          <p className="text-gray-300">Average Rating</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center border border-white/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            98%
          </div>
          <p className="text-gray-300">Success Rate</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 text-center border border-white/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            15K+
          </div>
          <p className="text-gray-300">Happy Users</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;