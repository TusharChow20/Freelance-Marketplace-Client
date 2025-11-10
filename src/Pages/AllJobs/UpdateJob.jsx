import React, { useState, use } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const UpdateJob = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure();
  const { user } = use(AuthContext);

  // Get job data from location state or initialize with empty values
  const jobData = location.state?.jobData || {};

  const [formData, setFormData] = useState({
    title: jobData.title || "",
    category: jobData.category || "",
    summary: jobData.summary || "",
    coverImage: jobData.coverImage || "",
    postedBy: jobData.postedBy || "",
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Customer Service",
    "Human Resources",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.patch(`/jobs/${id}`, formData);
      toast.success("Job updated successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Update Job Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/*-------------------------------- Title------------------ */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Senior React Developer"
            />
          </div>

          {/* -------------------Posted By------------------- */}
          <div>
            <label
              htmlFor="postedBy"
              className="block text-sm font-medium mb-2"
            >
              Posted By
            </label>
            <input
              type="text"
              id="postedBy"
              name="postedBy"
              value={user?.displayName || "Not Found"}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-md cursor-not-allowed"
            />
          </div>

          {/*--------- Category ----------*/}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition  text-gray-400"
            >
              <option value="" className="text-gray-900">
                Select a Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium mb-2">
              Job Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-vertical"
              placeholder="Provide a detailed description of the job role, responsibilities, and requirements..."
            />
          </div>
          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium mb-2"
            >
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/*------------- User Email ----------*/}
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="flex-1 bg-gray-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-600 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Updating...
                </span>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
