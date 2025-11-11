import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Jobs from "./Jobs";
import LoadingFallback from "../../Loading/Loading";

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [allJob, setAllJob] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);

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

  if (jobLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Jobs</h1>
        <p className="">
          <LoadingFallback></LoadingFallback>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJob.map((job) => (
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
