import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";

const MyAddedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [allJob, setAllJob] = useState([]);
  const [myPostedJob, setMyPostedJob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/jobs").then((data) => setAllJob(data.data));
  }, [axiosSecure]);

  useEffect(() => {
    if (allJob.length > 0 && user?.email) {
      const filteredJobs = allJob.filter((job) => job.userEmail === user.email);
      setMyPostedJob(filteredJobs);
      setLoading(false);
    } else if (allJob.length > 0) {
      setLoading(false);
    }
  }, [allJob, user]);

  const handleUpdateJob = (job) => {
    navigate(`/update-job/${job._id}`, { state: { jobData: job } });
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosSecure.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully!");
      // Update the local state to remove the deleted job
      setMyPostedJob((prev) => prev.filter((job) => job._id !== jobId));
      setAllJob((prev) => prev.filter((job) => job._id !== jobId));
    } catch {
      toast.error("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Added Jobs</h1>

      {loading ? (
        <Loading />
      ) : myPostedJob.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-700">No jobs posted yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPostedJob.map((job) => (
            <div key={job._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Category:</span> {job.category}
              </p>
              <p className="text-sm text-gray-400 mb-3">{job.summary}</p>
              <p className="text-xs text-gray-500 mb-4">
                Posted on: {new Date(job.postedDate).toLocaleDateString()}
              </p>

              <div className="flex flex-col gap-2">
                <Link
                  to={`/allJobs/${job._id}`}
                  className="btn btn-primary hover:scale-105 transition-transform shadow-lg w-full"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleUpdateJob(job)}
                  className="btn btn-accent hover:scale-105 transition-transform shadow-lg w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Update
                </button>

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="btn btn-error hover:scale-105 transition-transform shadow-lg w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
