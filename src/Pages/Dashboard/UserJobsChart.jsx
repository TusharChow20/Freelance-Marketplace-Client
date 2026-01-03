import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";
import Loading from "../../Loading/Loading";

const COLORS = ["#6366F1", "#10B981", "#06B6D4", "#F59E0B"];

const UserJobsChart = () => {
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        if (!user?.email) {
          if (mounted) setData(null);
          return;
        }

        // Fetch all jobs and filter by current user (postedBy or userEmail)
        const [jobsRes, acceptedRes] = await Promise.all([
          axios.get("/jobs"),
          axios.get(`/acceptedJob?email=${encodeURIComponent(user.email)}`),
        ]);

        const allJobs = Array.isArray(jobsRes.data)
          ? jobsRes.data
          : jobsRes.data?.data || [];
        const postedByMe = allJobs.filter(
          (j) =>
            (j.userEmail && j.userEmail === user.email) ||
            (j.postedBy && j.postedBy === user.displayName)
        );

        const accepted = Array.isArray(acceptedRes.data)
          ? acceptedRes.data
          : [];

        const postedCount = postedByMe.length;
        const acceptedCount = accepted.length;

        const chart = [
          { name: "Posted", value: postedCount },
          { name: "Accepted", value: acceptedCount },
        ];

        if (mounted) setData(chart);
      } catch {
        if (mounted)
          setData([
            { name: "Posted", value: 0 },
            { name: "Accepted", value: 0 },
          ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [axios, user]);

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="p-6 rounded-lg bg-base-100 text-center">
        <div className="text-sm text-base-content/70">
          Log in to see your job activity.
        </div>
      </div>
    );
  }

  if (!data || data.every((d) => d.value === 0)) {
    return (
      <div className="p-6 rounded-lg bg-base-100 text-center">
        <div className="text-lg font-semibold mb-2">No activity yet</div>
        <div className="text-sm text-base-content/70">
          You haven't posted or accepted any jobs.
        </div>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="p-4 rounded-lg bg-base-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-semibold">Your Job Activity</div>
          <div className="text-sm text-base-content/70">
            Overview of your posted vs accepted jobs
          </div>
        </div>
        <div className="text-sm text-base-content/70">
          Total: <span className="font-semibold">{total}</span>
        </div>
      </div>

      <div style={{ width: "100%", height: 260 }} className="-mx-2">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={90}
              paddingAngle={4}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Jobs"]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.map((d, i) => (
          <div
            key={d.name}
            className="flex items-center gap-3 p-3 rounded border border-base-200"
          >
            <div
              style={{
                width: 12,
                height: 12,
                background: COLORS[i % COLORS.length],
                borderRadius: 4,
              }}
            />
            <div>
              <div className="text-sm text-base-content/70">{d.name}</div>
              <div className="font-semibold">{d.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserJobsChart;
