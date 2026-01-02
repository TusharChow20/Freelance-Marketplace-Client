import React, { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side handling - submit to your backend or service
    setStatus(
      "Thanks — your message has been sent. We will reply within 2 business days."
    );
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-gray-700 mb-6">
          Have a question or need help? Send us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              required
              name="name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              name="message"
              className="textarea textarea-bordered w-full"
              rows={6}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>

        {status && (
          <div className="alert alert-success mt-6">
            <div>
              <span>{status}</span>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-semibold">Direct contact</h3>
          <p className="text-gray-700">
            Email:{" "}
            <a href="mailto:contact@taskrio.com" className="link">
              contact@taskrio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
