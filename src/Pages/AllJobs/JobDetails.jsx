import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const JobDetails = () => {
  const axiosInstance = useAxiosSecure();
  const { data } = useLoaderData();
  const { user } = use(AuthContext);
  //   console.log(data);

  const isAccepted = false;
  const handleAcceptJob = () => {
    const acceptedJobsUser = {
      name: user.displayName,
      email: user.email,
      courseTitle: data.title,
      courseImage: data.coverImage,
    };
    // console.log(acceptedJobsUser);

    axiosInstance.post("/acceptedJob", acceptedJobsUser);
  };

  // Loading state
  if (!data) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Job Card */}
        <div className="card bg-base-100 shadow-xl">
          {/* Cover Image */}
          <figure className="h-64 md:h-80 overflow-hidden">
            <img
              src={data.coverImage}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="badge badge-primary badge-lg mb-3">
                  {data.category}
                </div>
                <h1 className="card-title text-3xl md:text-4xl font-bold mb-2">
                  {data.title}
                </h1>
                <p className="text-base-content/70 text-lg">{data.summary}</p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-2">
                {!isAccepted ? (
                  <button
                    onClick={handleAcceptJob}
                    className="btn btn-primary btn-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Accept Job
                  </button>
                ) : (
                  <div className="alert alert-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Job Accepted!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-12">
                    <span className="text-2xl flex justify-center items-center mt-2">
                      {data.postedBy
                        ? data.postedBy.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Posted by</p>
                  <p className="font-semibold text-lg">
                    {data.postedBy || "Unknown"}
                  </p>
                </div>
              </div>
              {/* poseted job--------------------////////// */}
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Posted on</p>
                  <p className="font-semibold text-lg">
                    {new Date(data.postedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* email ------------------  */}
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg md:col-span-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Contact Email</p>
                  <p className="font-semibold text-lg wrap-anywhere">
                    {data.userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description Section */}
            <div className="bg-base-200/50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">About this Job</h3>
              <p className="text-base-content/80 leading-relaxed mb-4">
                {data.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="badge badge-outline badge-lg">
                  {data.category}
                </div>
                <div className="badge badge-outline badge-lg">Remote</div>
                <div className="badge badge-outline badge-lg">
                  Flexible Hours
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="card-actions justify-between items-center mt-6 pt-6 border-t border-base-300">
              <div className="text-sm text-base-content/60">
                Job ID: {data._id}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
                <button className="btn btn-ghost btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
