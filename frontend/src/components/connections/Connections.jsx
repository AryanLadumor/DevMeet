import React, { useEffect, useState } from "react";
import apiCall from "../../utils/axiosInstance";
import ConnectionsCard from "./ConnectionsCard";

const Connections = () => {
  const [userConnections, setUserConnections] = useState(null);

  useEffect(() => {
    const getUserConnections = async () => {
      try {
        const res = await apiCall.get("/user/connections");
        setUserConnections(res.data.connections);
      } catch (error) {
        console.error("Error fetching connections:", error);
        setUserConnections([]);
      }
    };
    getUserConnections();
  }, []);

  // Loading State Spinner Placeholder
  if (!userConnections) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  // Empty State Fallback View Panel
  if (userConnections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh] w-full max-w-md mx-auto px-4">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="text-xl font-bold text-base-content">No Connections Yet</h3>
        <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
          Keep exploring the discovery feed! Like and connect with local developers to build your network.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Tab Context Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-black tracking-tight text-base-content">
          Your Network
        </h2>
        <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mt-1">
          {userConnections.length} Active {userConnections.length === 1 ? "Connection" : "Connections"}
        </p>
      </div>

      {/* Dynamic Multi-Column Responsive Grid System
          - 1 column on standard mobile viewports
          - 2 columns on tablet screens
          - 3 columns on full desktop monitors
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {userConnections.map((connection) => (
          <ConnectionsCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;