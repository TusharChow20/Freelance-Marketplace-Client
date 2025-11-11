import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Monitor,
  Palette,
  TrendingUp,
  DollarSign,
  Heart,
  BookOpen,
  Settings,
  BarChart3,
} from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import CircularGallery from "./CircularGallery";
import HeroBanner from "./HeroBanner";
import LatestJobs from "./LatestJobs";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  // const [allJob, setAllJob] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/jobs")
      .then((response) => {
        const jobs = response.data;
        // sorted in backend get latest 6
        const sorted = [...jobs].slice(0, 6);

        setLatestJobs(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  // ----------mongo db data///////////////
  const galleryItems = latestJobs.map((job) => ({
    image:
      job.coverImage ||
      job.image ||
      job.companyLogo ||
      `https://picsum.photos/seed/${job._id}/800/600`,
    text: job.title || job.jobTitle || "Job Opening",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900">
      {/* ---------------Hero Banner ---------------*/}
      <HeroBanner></HeroBanner>
      {/* ---------------latest job--------------------- */}
      <LatestJobs jobs={latestJobs} loading={loading} />
      {/* -------------------Featured Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-300 text-lg">
            Find the perfect job in your field
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Technology", icon: Monitor, count: "2,340" },
            { name: "Design", icon: Palette, count: "1,520" },
            { name: "Marketing", icon: TrendingUp, count: "1,890" },
            { name: "Finance", icon: DollarSign, count: "1,230" },
            { name: "Healthcare", icon: Heart, count: "980" },
            { name: "Education", icon: BookOpen, count: "750" },
            { name: "Engineering", icon: Settings, count: "1,640" },
            { name: "Sales", icon: BarChart3, count: "1,420" },
          ].map((category) => {
            const IconComponent = category.icon;
            return (
              <a
                key={category.name}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 group"
              >
                <div className="flex justify-center mb-3">
                  <IconComponent
                    className="w-10 h-10 text-white group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-white font-semibold md:text-lg mb-1">
                  {category.name}
                </div>
                <div className="text-gray-400 text-sm">
                  {category.count} jobs
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* *************************How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-300 text-lg">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Create Profile
            </h3>
            <p className="text-gray-300">
              Sign up and build your professional profile in minutes
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Browse & Apply
            </h3>
            <p className="text-gray-300">
              Search thousands of jobs and apply with one click
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-600 to-red-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Get Hired</h3>
            <p className="text-gray-300">
              Connect with employers and land your dream job
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className=" rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals finding their perfect job match
            today
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
