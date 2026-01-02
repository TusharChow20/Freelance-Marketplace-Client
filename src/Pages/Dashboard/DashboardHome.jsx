import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const StatCard = ({ title, value }) => (
  <div className="bg-base-100 rounded-lg p-6 shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

const DashboardHome = () => {
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ jobs: 0, accepted: 0 });

  useEffect(() => {
    // Fetch basic counts - using existing endpoints
    Promise.all([axios.get("/jobs"), axios.get("/acceptedJob")])
      .then(([jobsRes, acceptedRes]) => {
        setStats({
          jobs: jobsRes.data.length,
          accepted: acceptedRes.data.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [axios]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Jobs" value={stats.jobs} />
        <StatCard title="Accepted Jobs" value={stats.accepted} />
        <StatCard title="Your Active Listings" value={stats.jobs} />
      </div>

      <section className="bg-base-100 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
        <p className="text-gray-500">
          This section will include a small chart and recent actions.
        </p>
        {/* Add chart component here later */}
      </section>
    </div>
  );
};

export default DashboardHome;
