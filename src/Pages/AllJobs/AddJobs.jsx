import React, { use } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const AddJobs = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxiosSecure();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("wrokign");

    try {
      const title = e.target.title.value;
      const postedBy = e.target.postedBy.value;
      const category = e.target.category.value;
      const summary = e.target.summary.value;
      const coverImage = e.target.coverImage.value;
      const userEmail = e.target.userEmail.value;
      const postedDate = new Date().toISOString().split("T")[0];
      //   console.log(
      //     title,
      //     postedBy,
      //     category,
      //     summary,
      //     coverImage,
      //     userEmail,
      //     postedDate
      //   );
      const newJob = {
        title: title,
        postedBy: postedBy,
        category: category,
        summary: summary,
        coverImage: coverImage,
        userEmail: userEmail,
        postedDate: postedDate,
      };

      //   ---------------add to the mongo-------------
      axiosInstance.post("/jobs", newJob);

      toast.success("Job posted successfully!");
      e.target.reset();
    } catch {
      toast.error("Failed to post job. Please try again.");
      // console.error(error);
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto  rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Add a New Job</h2>

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
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Senior React Developer"
            />
          </div>

          {/* -------------------Posted By------------------- */}
          <div>
            <label
              htmlFor="postedBy"
              className="block text-sm font-medium  mb-2"
            >
              Posted By
            </label>
            <input
              type="text"
              id="postedBy"
              name="postedBy"
              value={user?.displayName || "Not Found"}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-md   cursor-not-allowed"
            />
          </div>

          {/*--------- Category ----------*/}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium  mb-2"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition  text-gray-400"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium  mb-2"
            >
              Job Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-vertical"
              placeholder="Provide a detailed description of the job role, responsibilities, and requirements..."
            />
          </div>

          {/* Cover Image */}
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
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
