import React from "react";
import { Link } from "react-router";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react";

const LatestJobs = ({ jobs = [], loading = false }) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading latest jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Latest Job Openings
        </h2>
        <p className="text-gray-300 text-lg">
          Discover the newest opportunities posted on our platform
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-xl">No jobs available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all transform hover:scale-105 group"
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                <img
                  src={
                    job.coverImage ||
                    job.image ||
                    job.companyLogo ||
                    `https://picsum.photos/seed/${job._id}/800/600`
                  }
                  alt={job.title || job.jobTitle || "Job"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {job.title || job.jobTitle || "Job Opening"}
                </h3>
                {job.company && (
                  <p className="text-gray-300 font-medium mb-4">
                    {job.company}
                  </p>
                )}
                <div className="space-y-2 mb-4">
                  {job.location && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                  )}

                  {job.jobType && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{job.jobType}</span>
                    </div>
                  )}

                  {job.salary && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{job.salary}</span>
                    </div>
                  )}

                  {job.deadline && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {job.postedDate && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                {job.description && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>
                )}
                <Link
                  to={`/allJobs/${job._id}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group/link"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Jobs Button */}
      {jobs.length > 0 && (
        <div className="text-center mt-12">
          <Link
            to="/allJobs"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
          >
            View All Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
