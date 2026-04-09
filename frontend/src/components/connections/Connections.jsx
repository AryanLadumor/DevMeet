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
      <div className="flex justify-center">
        <span className="  loading loading-ring loading-xl"></span>
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center">
      {userConnections.map(connection=><ConnectionsCard key={connection._id} user={connection} />)}
      
    </div>
  );
};

export default Connections;
