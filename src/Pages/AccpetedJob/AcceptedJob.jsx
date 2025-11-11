import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CheckCircle, XCircle } from "lucide-react";

const AcceptedJob = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/acceptedJob?email=${user.email}`)
      .then((res) => setJobData(res.data));
    // .catch((err) => console.error("Error fetching accepted jobs:", err));
  }, [axiosInstance, user]);

  const handleRemoveOrDone = async (id) => {
    try {
      setJobData((prev) => prev.filter((job) => job._id !== id));
      await axiosInstance.delete(`/acceptedJob/${id}`);
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5 text-center">Accepted Jobs</h2>

      {jobData.length === 0 ? (
        <p className="text-center text-gray-500">No accepted jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobData.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              <img
                src={job.courseImage}
                alt={job.courseTitle}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {job.courseTitle}
              </h3>
              <p className="text-sm text-gray-500">{job.email}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleRemoveOrDone(job._id)}
                  className="flex items-center gap-1 text-green-600 hover:text-green-800"
                >
                  <CheckCircle className="w-5 h-5" /> Done
                </button>
                <button
                  onClick={() => handleRemoveOrDone(job._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <XCircle className="w-5 h-5" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedJob;
