import React, { use, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const JobDetails = () => {
  const axiosInstance = useAxiosSecure();
  const { data } = useLoaderData();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [acceptEmail, setAcceptEmail] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [relatedJobs, setRelatedJobs] = useState([]);

  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // editing state for user's own reviews
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editSubmitting, setEditSubmitting] = useState(false);

  const averageRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
        reviews.length
      ).toFixed(1)
    : null;

  const logggedInUserEmail = user?.email;
  const jobCreatorEmail = data?.userEmail;
  const isJobCreator = logggedInUserEmail === jobCreatorEmail;
  // console.log("accept email, data", acceptEmail, data);

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/acceptedJob?email=${user.email}`)
      .then((data) => setAcceptEmail(data.data));
  }, [axiosInstance, user]);

  const isAccepted = acceptEmail?.some((item) => item.courseId === data?._id);

  // Prepare gallery
  useEffect(() => {
    const images = [];
    if (data) {
      if (Array.isArray(data.images) && data.images.length > 0)
        images.push(...data.images);
      if (data.coverImage) images.unshift(data.coverImage);

      // ensure images are unique and valid URLs
      const uniq = [...new Set(images.filter(Boolean))];
      images.length = 0;
      images.push(...uniq);
    }
    // fallback to placeholder image if empty
    if (images.length === 0)
      images.push(`https://picsum.photos/seed/${data._id}/1000/600`);
    setGalleryImages(images);
    setActiveImage(0);
  }, [data]);

  // Reviews fetching and lightbox keyboard navigation
  const fetchReviews = async () => {
    if (!data?._id) return;
    try {
      const res = await axiosInstance.get(`/reviews?jobId=${data._id}`);
      setReviews(res.data || []);
    } catch {
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();

    // keyboard navigation for lightbox
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setActiveImage(
          (i) => (i - 1 + galleryImages.length) % galleryImages.length
        );
      if (e.key === "ArrowRight")
        setActiveImage((i) => (i + 1) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, galleryImages.length, data?._id]);

  // Fetch related jobs by category
  useEffect(() => {
    if (!data?.category) return;
    axiosInstance
      .get(`/jobs?category=${encodeURIComponent(data.category)}`)
      .then((res) => {
        const related = (res.data || [])
          .filter((j) => j._id !== data._id)
          .slice(0, 8);
        setRelatedJobs(related);
      })
      .catch(() => setRelatedJobs([]));
  }, [axiosInstance, data]);

  const handleAcceptJob = async () => {
    const acceptedJobsUser = {
      courseId: data._id,
      name: user.displayName,
      email: user.email,
      courseTitle: data.title,
      courseImage: data.coverImage,
    };

    try {
      await axiosInstance.post("/acceptedJob", acceptedJobsUser);
      setAcceptEmail((prev) => [...(prev || []), acceptedJobsUser]);
      toast.success("Job accepted successfully!");
    } catch {
      // console.error("Error accepting job:", error);
      toast.error("Failed to accept job");
    }
  };

  const handleUpdateJob = () => {
    navigate(`/update-job/${data._id}`, { state: { jobData: data } });
  };

  const handleDeleteJob = async () => {
    try {
      await axiosInstance.delete(`/jobs/${data._id}`);
      toast.success("Job deleted successfully!");
      setTimeout(() => {
        navigate("/allJobs");
      }, 1000);
    } catch {
      // console.error("Error deleting job");
      toast.error("Failed to delete job. Please try again.");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      toast.success("Review deleted");
      fetchReviews();
    } catch {
      toast.error("Failed to delete review.");
    }
  };
  if (!data || !user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          {/* Lightbox modal */}
          {lightboxOpen && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                aria-label="Close image"
                className="absolute top-6 right-6 btn btn-ghost btn-circle"
                onClick={() => setLightboxOpen(false)}
              >
                ✕
              </button>

              <div
                className="max-w-5xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryImages[activeImage]}
                  alt={`Large ${data.title}`}
                  className="w-full h-[70vh] object-contain rounded"
                />

                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    aria-label="Previous image"
                    className="btn btn-circle btn-ghost"
                    onClick={() =>
                      setActiveImage(
                        (i) =>
                          (i - 1 + galleryImages.length) % galleryImages.length
                      )
                    }
                  >
                    ‹
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    aria-label="Next image"
                    className="btn btn-circle btn-ghost"
                    onClick={() =>
                      setActiveImage((i) => (i + 1) % galleryImages.length)
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          )}
          <figure className="mb-4">
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-md bg-gray-100">
              <img
                role="button"
                tabIndex={0}
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxOpen(true);
                }}
                src={galleryImages[activeImage]}
                alt={data.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-300 cursor-zoom-in"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`w-20 h-12 rounded overflow-hidden border-2 shrink-0 ${
                    idx === activeImage
                      ? "border-primary ring-2 ring-primary"
                      : "border-base-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${data.title} ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </figure>

          <div className="card-body p-6 md:p-8">
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
              <div className="flex flex-col gap-2">
                {isJobCreator ? (
                  <>
                    <button
                      onClick={handleUpdateJob}
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Update Details
                    </button>
                    <button
                      onClick={handleDeleteJob}
                      className="btn btn-error btn-lg"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
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
                  <p className="text-sm text-base-content/80">Posted by</p>
                  <p className="font-semibold text-lg">
                    {data.postedBy || "Unknown"}
                  </p>
                </div>
              </div>

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
                  <p className="text-sm text-base-content/80">Posted on</p>
                  <p className="font-semibold text-lg">
                    {new Date(data.postedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

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
                  <p className="text-sm text-base-content/80">Contact Email</p>
                  <p className="font-semibold text-lg wrap-anywhere">
                    {data.userEmail}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-base-200/70 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">About this Job</h3>
              <p className="text-base-content leading-relaxed mb-4">
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

              {/* Reviews */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-3">
                  <span>Reviews ({reviews.length})</span>
                  {averageRating && (
                    <span className="text-sm text-primary flex items-center gap-2">
                      <span className="font-semibold">★ {averageRating}</span>
                      <span className="text-base-content/70 text-xs">
                        ({reviews.length})
                      </span>
                    </span>
                  )}
                </h4>
                <div className="space-y-4">
                  {reviews.length === 0 && (
                    <p className="text-sm text-base-content/80">
                      No reviews yet. Be the first to leave one!
                    </p>
                  )}

                  {reviews.map((r) => {
                    const isMine = r.userEmail === user?.email;
                    const isEditing = editingReviewId === r._id;
                    return (
                      <div
                        key={r._id || r.createdAt}
                        className="p-4 bg-base-100 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold">
                              {r.name || r.userEmail}
                            </div>
                            <div className="text-sm text-base-content/80">
                              {new Date(r.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-sm text-primary">
                              {Array.from({ length: r.rating || 5 }).map(
                                (_, i) => (
                                  <span key={i}>★</span>
                                )
                              )}
                            </div>
                            {isMine && !isEditing && (
                              <div className="flex items-center gap-2">
                                <button
                                  aria-label="Edit review"
                                  className="btn btn-sm btn-ghost"
                                  onClick={() => {
                                    setEditingReviewId(r._id);
                                    setEditText(r.text || "");
                                    setEditRating(r.rating || 5);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  aria-label="Delete review"
                                  className="btn btn-sm btn-ghost text-error"
                                  onClick={async () =>
                                    handleDeleteReview(r._id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {!isEditing ? (
                          <div className="text-base-content/80">{r.text}</div>
                        ) : (
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setEditSubmitting(true);
                              try {
                                await axiosInstance.put(`/reviews/${r._id}`, {
                                  text: editText,
                                  rating: editRating,
                                });
                                toast.success("Review updated");
                                setEditingReviewId(null);
                                fetchReviews();
                              } catch {
                                toast.error("Failed to update review.");
                              } finally {
                                setEditSubmitting(false);
                              }
                            }}
                            className="space-y-2"
                          >
                            <textarea
                              className="textarea textarea-bordered w-full mb-2"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                            ></textarea>
                            <div className="flex items-center gap-2">
                              <select
                                className="select select-bordered w-28"
                                value={editRating}
                                onChange={(e) =>
                                  setEditRating(Number(e.target.value))
                                }
                              >
                                <option value={5}>5 - Excellent</option>
                                <option value={4}>4 - Good</option>
                                <option value={3}>3 - Okay</option>
                                <option value={2}>2 - Poor</option>
                                <option value={1}>1 - Terrible</option>
                              </select>
                              <button
                                type="submit"
                                className={`btn btn-primary btn-sm ${
                                  editSubmitting ? "loading" : ""
                                }`}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => setEditingReviewId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    );
                  })}

                  {user ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!reviewText.trim()) {
                          toast.error(
                            "Please write a review before submitting."
                          );
                          return;
                        }
                        setReviewSubmitting(true);
                        const newReview = {
                          jobId: data._id,
                          userEmail: user.email,
                          name: user.displayName || "Anonymous",
                          rating: reviewRating,
                          text: reviewText,
                          createdAt: new Date().toISOString(),
                        };
                        try {
                          await axiosInstance.post("/reviews", newReview);
                          setReviewText("");
                          setReviewRating(5);
                          toast.success("Review submitted!");
                          fetchReviews();
                        } catch {
                          toast.error("Failed to submit review.");
                        } finally {
                          setReviewSubmitting(false);
                        }
                      }}
                      className="mt-2"
                    >
                      <textarea
                        className="textarea textarea-bordered w-full mb-2"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                      <div className="flex items-center gap-2">
                        <select
                          className="select select-bordered w-28"
                          value={reviewRating}
                          onChange={(e) =>
                            setReviewRating(Number(e.target.value))
                          }
                        >
                          <option value={5}>5 - Excellent</option>
                          <option value={4}>4 - Good</option>
                          <option value={3}>3 - Okay</option>
                          <option value={2}>2 - Poor</option>
                          <option value={1}>1 - Terrible</option>
                        </select>
                        <button
                          type="submit"
                          className={`btn btn-primary ${
                            reviewSubmitting ? "loading" : ""
                          }`}
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-sm text-base-content/80 mt-2">
                      Please log in to leave a review.
                    </p>
                  )}
                </div>
              </div>

              {/* Related jobs */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-3">Related Jobs</h4>
                {relatedJobs.length === 0 ? (
                  <p className="text-sm text-base-content/80">
                    No related jobs found.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedJobs.map((job) => (
                      <div
                        key={job._id}
                        className="p-3 bg-base-100 rounded-lg hover:shadow-md cursor-pointer"
                        onClick={() => navigate(`/allJobs/${job._id}`)}
                      >
                        <img
                          src={
                            job.coverImage ||
                            `https://picsum.photos/seed/${job._id}/400/240`
                          }
                          alt={job.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-28 object-cover rounded"
                        />
                        <div className="mt-2 font-semibold">{job.title}</div>
                        <div className="text-sm text-base-content/80">
                          {job.category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="card-actions justify-between items-center mt-6 pt-6 border-t border-base-300">
              <div className="text-sm text-base-content/80">
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
