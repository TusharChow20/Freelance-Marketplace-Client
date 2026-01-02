import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const COLORS = [
  "#6366F1",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

const JobsChart = () => {
  const axios = useAxiosSecure();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await axios.get("/jobs");
        const jobs = Array.isArray(res.data) ? res.data : res.data?.data || [];
        // count by category
        const map = jobs.reduce((acc, j) => {
          const c = j.category || "Uncategorized";
          acc[c] = (acc[c] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.entries(map).map(([category, count]) => ({
          category,
          count,
        }));
        if (mounted) setData(chartData);
      } catch {
        if (mounted) setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [axios]);

  if (loading) return <Loading />;
  if (!data || data.length === 0)
    return (
      <div className="text-sm text-base-content/70">No data available.</div>
    );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={150} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366F1">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobsChart;
