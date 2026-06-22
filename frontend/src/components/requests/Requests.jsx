import React, { useEffect, useState } from "react";
import apiCall from "../../utils/axiosInstance";
import RequestsCard from "./RequestsCard";

const Requests = () => {
  const [requests, setRequests] = useState(null);

  const handleReply = (id) => {
    if (id) setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await apiCall.get("/user/requests/received");
        setRequests(res.data.requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests([]);
      }
    };

    getRequests();
  }, []);

  // Loading State Infinite Spinner Indicator
  if (!requests) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  // Clean Empty State Fallback View Panel
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh] w-full max-w-md mx-auto px-4 py-8 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center shadow-lg border border-base-300 mb-6 text-4xl" aria-hidden="true">
          ✉️
        </div>
        <h3 className="text-2xl font-serif font-black text-base-content">Inbox Empty</h3>
        <p className="text-sm text-base-content/60 mt-3 leading-relaxed">
          You don't have any inbound invitations right now. Your profile is active in the discovery rotation—hang tight, new requests will appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Tab Context Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-black tracking-tight text-base-content">
          Connection Requests
        </h2>
        <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mt-1">
          {requests.length} Pending Inbound {requests.length === 1 ? "Invitation" : "Invitations"}
        </p>
      </div>

      {/* Modern Multi-Column Adaptive Responsive Grid
          - 1 column on standard mobile phones
          - 2 columns on intermediate tablet resolutions
          - 3 columns on full monitor screens
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {requests.map((request) => (
          <RequestsCard
            key={request._id}
            reqId={request._id}
            user={request.fromUserId}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;