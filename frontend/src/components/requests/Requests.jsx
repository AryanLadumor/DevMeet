import React, { useEffect, useState } from "react";
import RequestsCard from "./RequestsCard";
import apiCall from "../../utils/axiosInstance";
import Toast from "../../utils/toast";
const Requests = () => {
  const [requests, setRequests] = useState(null);


  const handleReply = (id) => {
    if(id) setRequests((prev) => prev.filter((r) => r._id !== id));
  };
  useEffect(() => {
    const getRequests = async () => {
      const res = await apiCall.get("/user/requests/received");
      setRequests(res.data.requests);
      console.log(res.data.requests);
    };

    getRequests();
  }, []);

  if (!requests)
    return (
      <div className="flex justify-center items-center m-10">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  if (requests.length <= 0)
    return (
      <div className="flex justify-center items-center m-10">
        --You currently Don't Have Request get some loser--
      </div>
    );

  return (
    <>
      <div className="list items-center">
        {requests.map((request) => (
          <RequestsCard
            key={request._id}
            reqId={request._id}
            user={request.fromUserId}
            onReply={handleReply} // now receives (id, msg)
          />
        ))}
      </div>

      
    </>
  );
};

export default Requests;
