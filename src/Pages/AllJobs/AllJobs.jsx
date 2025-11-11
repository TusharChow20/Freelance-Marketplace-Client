import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Jobs from "./Jobs";
import LoadingFallback from "../../Loading/Loading";

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [allJob, setAllJob] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'

  useEffect(() => {
    setJobLoading(true);
    axiosSecure
      .get("/jobs")
      .then((data) => {
        setAllJob(data.data);
        setJobLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobLoading(false);
      });
  }, [axiosSecure]);

  // Sort jobs based on selected order
  const sortedJobs = [...allJob].sort((a, b) => {
    const dateA = new Date(a.postedDate || a.createdAt || 0);
    const dateB = new Date(b.postedDate || b.createdAt || 0);

    if (sortOrder === "newest") {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  if (jobLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Jobs</h1>
        <p>
          <LoadingFallback />
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-20">
        <h1 className="text-4xl font-bold">All Jobs</h1>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sortOrder" className="font-semibold">
            Sort by:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered w-full max-w-xs relative z-[9999] bg-white text-black"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedJobs.map((job) => (
          <Jobs key={job._id} job={job} />
        ))}
      </div>

      {allJob.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No jobs available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
