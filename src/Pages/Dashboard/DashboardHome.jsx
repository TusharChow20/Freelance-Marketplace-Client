import React, { useEffect, useState, useContext } from "react";
import JobsChart from "./JobsChart";
import UserJobsChart from "./UserJobsChart";
import { AuthContext } from "../../Provider/AuthContext";
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
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ jobs: 0, accepted: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const jobsRes = await axios.get("/jobs");
        let acceptedCount = 0;
        if (user?.email) {
          const accRes = await axios.get(
            `/acceptedJob?email=${encodeURIComponent(user.email)}`
          );
          acceptedCount = Array.isArray(accRes.data)
            ? accRes.data.length
            : accRes.data?.length ?? 0;
        }

        setStats({
          jobs: Array.isArray(jobsRes.data)
            ? jobsRes.data.length
            : jobsRes.data?.total ?? 0,
          accepted: acceptedCount,
        });
      } catch {
        // ignore for now; stats will stay at defaults
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [axios, user]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Jobs" value={stats.jobs} />
        <StatCard title="Accepted Jobs" value={stats.accepted} />
        <StatCard title="Your Active Listings" value={stats.jobs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="col-span-1 lg:col-span-1 bg-base-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Jobs by Category</h2>
          <JobsChart />
        </section>
        <section className="col-span-1 lg:col-span-2 bg-base-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Your Posted vs Accepted
          </h2>
          <UserJobsChart />
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
