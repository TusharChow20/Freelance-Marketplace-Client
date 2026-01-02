import React, { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Jobs from "./Jobs";
import LoadingFallback from "../../Loading/Loading";

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [allJob, setAllJob] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);

  // UI state
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // items per page

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

  // Derived filter options
  const categories = useMemo(
    () => [...new Set(allJob.map((j) => j.category).filter(Boolean))],
    [allJob]
  );
  const locations = useMemo(
    () => [...new Set(allJob.map((j) => j.location).filter(Boolean))],
    [allJob]
  );

  // Filter + search
  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allJob.filter((job) => {
      if (selectedCategory && job.category !== selectedCategory) return false;
      if (selectedLocation && job.location !== selectedLocation) return false;
      if (!q) return true;
      const hay = `${job.title || job.jobTitle || ""} ${
        job.summary || job.description || ""
      } ${job.company || ""} ${job.location || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [allJob, selectedCategory, selectedLocation, searchQuery]);

  // Sort the filtered results
  const sortedJobs = useMemo(() => {
    const arr = [...filteredJobs];
    arr.sort((a, b) => {
      const dateA = new Date(a.postedDate || a.createdAt || 0);
      const dateB = new Date(b.postedDate || b.createdAt || 0);

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return arr;
  }, [filteredJobs, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedJobs.slice(start, start + pageSize);
  }, [sortedJobs, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // reset to first page when filters/search change
  }, [searchQuery, selectedCategory, selectedLocation, sortOrder]);

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
      <div className="mb-6 relative z-50">
        <h1 className="text-4xl font-bold mb-4">All Jobs</h1>

        {/* Controls: search, category, location, sort */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div>
            <label className="sr-only" htmlFor="jobSearch">
              Search jobs
            </label>
            <input
              id="jobSearch"
              placeholder="Search by title, company, location, or keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full bg-base-100 text-base-content"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="categoryFilter">
              Filter by category
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full bg-base-100 text-base-content"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="sr-only" htmlFor="locationFilter">
              Filter by location
            </label>
            <select
              id="locationFilter"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select select-bordered w-full bg-base-100 text-base-content"
            >
              <option value="">All locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sortOrder" className="font-semibold">
              Sort:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered w-full bg-base-100 text-base-content"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <strong>{sortedJobs.length}</strong> results
          </div>
          <div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedLocation("");
                setSortOrder("newest");
              }}
              className="btn btn-ghost btn-sm"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Job grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {paginated.map((job) => (
          <Jobs key={job._id} job={job} />
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs match your filters.</p>
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-ghost"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
