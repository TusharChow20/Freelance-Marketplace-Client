import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const JobsTable = () => {
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchPage = async (p = page, l = limit, q = search) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/jobs?page=${p}&limit=${l}&search=${encodeURIComponent(q)}`
      );
      // Prefer server-provided shape { data, total }
      const payload = res.data;
      if (Array.isArray(payload)) {
        setJobs(payload);
        setTotal(payload.length);
      } else if (Array.isArray(payload.data)) {
        setJobs(payload.data);
        setTotal(payload.total ?? payload.data.length);
      } else {
        // Fallback: try res.data.jobs or empty
        const arr = payload.jobs || [];
        setJobs(arr);
        setTotal(payload.total ?? arr.length);
      }
    } catch {
      // fallback: fetch all and paginate client-side
      try {
        const res2 = await axios.get("/jobs");
        const all = Array.isArray(res2.data)
          ? res2.data
          : res2.data?.data || [];
        const filtered = search
          ? all.filter((j) =>
              (j.title || "").toLowerCase().includes(search.toLowerCase())
            )
          : all;
        setTotal(filtered.length);
        const start = (p - 1) * l;
        setJobs(filtered.slice(start, start + l));
      } catch {
        setJobs([]);
        setTotal(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // when limit or search changes, reset to page 1
    setPage(1);
    fetchPage(1, limit, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, search]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await axios.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      // refresh current page
      fetchPage();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  if (loading) return <Loading />;

  const totalPages = total ? Math.max(1, Math.ceil(total / limit)) : 1;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="input input-bordered w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearch(searchInput);
          }}
        />
        <button className="btn" onClick={() => setSearch(searchInput)}>
          Search
        </button>
      </div>

      <div className="overflow-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Posted</th>
              <th>By</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j._id} className="align-top">
                <td className="max-w-sm">
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-sm text-base-content/70">
                    {j.summary?.slice(0, 80)}
                  </div>
                </td>
                <td>{j.category}</td>
                <td>{new Date(j.postedDate).toLocaleDateString()}</td>
                <td>{j.postedBy}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() =>
                        navigate(`/update-job/${j._id}`, {
                          state: { jobData: j },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => handleDelete(j._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-sm text-base-content/70"
                >
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Rows:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="select select-bordered w-24"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm"
            disabled={page <= 1}
            onClick={() => {
              setPage((p) => {
                const np = p - 1;
                fetchPage(np);
                return np;
              });
            }}
          >
            Prev
          </button>
          <div className="px-3">
            Page {page} / {totalPages}
          </div>
          <button
            className="btn btn-sm"
            disabled={page >= totalPages}
            onClick={() => {
              setPage((p) => {
                const np = p + 1;
                fetchPage(np);
                return np;
              });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
