import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [allJob, setAllJob] = useState([]);
  useEffect(() => {
    axiosSecure.get("/jobs").then((data) => console.log(data.data));
  }, [axiosSecure]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
