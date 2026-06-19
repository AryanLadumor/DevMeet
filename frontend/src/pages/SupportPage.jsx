import React, { useState } from "react";
import StaticLayout from "../components/layout/StaticLayout";

const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <StaticLayout title="Developer Support Hub" badge="Contact Cluster Support">
      <div className="space-y-4">
        <p>
          Encountered a system exception or have feature optimization feedback? Submit an issue directly to the core maintainer or open a trace ticket below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Support Actions Side Block */}
          <div className="space-y-4 bg-base-100/40 p-4 border border-base-300 rounded-xl">
            <h4 className="font-bold text-base-content text-base">🔧 Repository Diagnostics</h4>
            <p className="text-xs text-base-content/60 leading-relaxed">
              If you discover an issue with the REST endpoints or real-time web socket channels, log an engineering ticket in the main repository stack.
            </p>
            <a 
              href="mailto:aryanladumor666@gmail.com" 
              className="btn btn-sm btn-secondary rounded-xl w-full h-10 font-bold"
            >
              Email Technical Support
            </a>
          </div>

          {/* Simulated Quick Feedback Form */}
          <div className="space-y-3">
            <h4 className="font-bold text-base-content text-base">✉️ Quick Help Ticket</h4>
            {submitted ? (
              <div className="alert alert-success text-xs font-bold rounded-xl animate-fadeIn">
                ✓ Diagnostic message logged successfully!
              </div>
            ) : (
              <div className="space-y-2.5">
                <input 
                  type="text" 
                  placeholder="Ticket Subject" 
                  className="input input-bordered w-full h-10 rounded-xl text-xs font-semibold"
                />
                <textarea 
                  placeholder="Describe your runtime issue or feature suggestion..." 
                  className="textarea textarea-bordered w-full h-20 rounded-xl text-xs font-semibold p-3"
                />
                <button 
                  onClick={() => setSubmitted(true)}
                  className="btn btn-primary btn-sm rounded-xl w-full h-10 font-bold text-primary-content"
                >
                  Submit Diagnostic Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StaticLayout>
  );
};

export default SupportPage;