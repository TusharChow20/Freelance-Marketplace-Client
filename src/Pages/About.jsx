import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Task Rio</h1>
        <p className="text-lg text-gray-700 mb-6">
          Task Rio is a professional freelance marketplace focused on connecting
          talented professionals with meaningful opportunities. We prioritize
          trust, transparency, and high-quality experiences for both job seekers
          and employers.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            Provide an easy-to-use, secure platform that helps people find the
            right opportunities and companies discover the best talent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-700">
            For business inquiries: contact@taskrio.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
