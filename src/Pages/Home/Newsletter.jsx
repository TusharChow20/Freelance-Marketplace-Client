import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Thanks — you're subscribed to the newsletter!");
    }, 900);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:flex md:items-center md:justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Get job updates
          </h3>
          <p className="text-gray-300 mt-2">
            Subscribe to receive new job matches and career tips.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered bg-white/10 text-white placeholder-gray-300"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
