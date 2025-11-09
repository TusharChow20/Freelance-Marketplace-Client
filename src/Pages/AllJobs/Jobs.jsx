import React from "react";
import { Link } from "react-router";

const Jobs = ({ job }) => {
  //   console.log(job._id);

  return (
    <div className="card bg-base-100 w-full h-[450px] shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden group">
      <figure className="h-full relative">
        {job.coverImage ? (
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt={job.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/75 to-black/100"></div>
      </figure>

      <div className="card-body absolute inset-0 justify-between text-white z-10">
        <div>
          <div className="mb-3">
            <span className="badge badge-primary badge-md font-semibold shadow-lg">
              {job.category}
            </span>
          </div>
          <h2 className="card-title font-bold text-2xl mb-3 text-white drop-shadow-lg">
            {job.title}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-5 h-5 text-white drop-shadow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="text-white drop-shadow">
              Posted by <span className="font-semibold">{job.postedBy}</span>
            </p>
          </div>

          {/* Summary */}
          <p className="text-white/95 flex-grow line-clamp-4 leading-relaxed drop-shadow">
            {job.summary}
          </p>
        </div>
        <div className="card-actions justify-end">
          <Link
            to={`/allJobs/${job._id}`}
            className="btn btn-primary btn-wide hover:scale-105 transition-transform shadow-lg"
          >
            <span>View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
