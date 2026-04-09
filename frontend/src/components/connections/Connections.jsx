import React, { useEffect, useState } from "react";
import apiCall from "../../utils/axiosInstance";
import ConnectionsCard from "./ConnectionsCard";

const Connections = () => {
  const [userConnections, setUserConnetions] = useState(null);
  useEffect(() => {
    const getUserConnections = async () => {
      const res = await apiCall.get("/user/connections");
      setUserConnetions(res.data.connections);
      console.log(res.data.connections);
    };
    getUserConnections();
  }, []);
  if (!userConnections)
    return (
      <div className="flex justify-center items-center m-10">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );  
  if (userConnections.length == 0)
    return (
      <div className="flex justify-center items-center m-10">
        --You Don't Have Connetions Make Some--
      </div>
    );
  
  return (
    <div className="flex flex-col justify-center items-center">
      {userConnections.map((connection) => (
        <ConnectionsCard key={connection._id} user={connection} />
      ))}
    </div>
  );
};

export default Connections;
