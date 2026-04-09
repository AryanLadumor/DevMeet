import React, { useEffect, useState } from 'react'
import RequestsCard from './RequestsCard'
import apiCall from '../../utils/axiosInstance'

const Requests = () => {
    const [requests , setRequests] = useState(null)
    useEffect(()=>{
        const getRequests = async ()=>{
            const res = await apiCall.get("/user/requests/received")
            setRequests(res.data.requests)
            console.log(res.data.requests)
        }

        getRequests();
    },[])

     if (!requests)
    return (
      <div className="flex justify-center items-center m-10">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  if (requests.length <=0)
    return (
      <div className="flex justify-center items-center m-10">
        --You currently Don't Have Request get some loser--
      </div>
    );

  return (
    <div className='list items-center'>
        {requests.map((request,index)=><RequestsCard key={request._id} user={request.fromUserId}/> )}
       
    </div>
  )
}

export default Requests