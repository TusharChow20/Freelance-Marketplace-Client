import React from "react";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I apply for a job?",
      a: "Open the job details and click 'Apply' or 'Accept Job' depending on the posting. Ensure your profile is complete.",
    },
    {
      q: "Can I post multiple jobs?",
      a: "Yes — use the 'Add a Job' page. All your posted jobs are available in 'My Added Jobs'.",
    },
    {
      q: "How do payments work?",
      a: "Payments are handled outside Task Rio depending on the employer and contract terms. Always check the job details.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="bg-white/5 p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer text-gray-100">
              {f.q}
            </summary>
            <div className="mt-2 text-gray-300">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
