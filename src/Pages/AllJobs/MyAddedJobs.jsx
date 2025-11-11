import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";

const MyAddedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [allJob, setAllJob] = useState([]);
  const [myPostedJob, setMyPostedJob] = useState([]);

  useEffect(() => {
    axiosSecure.get("/jobs").then((data) => setAllJob(data.data));
  }, [axiosSecure]);

  useEffect(() => {
    if (allJob.length > 0 && user?.email) {
      const filteredJobs = allJob.filter((job) => job.userEmail === user.email);
      setMyPostedJob(filteredJobs);
    }
  }, [allJob, user]);

  // console.log(myPostedJob);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Added Jobs</h1>

      {myPostedJob.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No jobs posted yet</p>
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
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {job.category}
              </p>
              <p className="text-sm text-gray-400 mb-3">{job.summary}</p>
              <p className="text-xs text-gray-500 mb-4">
                Posted on: {new Date(job.postedDate).toLocaleDateString()}
              </p>

              <Link
                to={`/allJobs/${job._id}`}
                className="btn btn-primary  hover:scale-105 transition-transform shadow-lg w-full"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
