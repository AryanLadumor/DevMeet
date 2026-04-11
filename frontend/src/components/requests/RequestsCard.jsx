import React from "react";
import apiCall from "../../utils/axiosInstance";

const RequestsCard = ({ user, reqId, onReply }) => {
  const { firstName, lastName, age, gender, about, photoURL } = user;

  const reqRelpy = async (stat, _id) => {
    try {
      const res = await apiCall.post(`/request/review/${stat}/${_id}`);
      console.log(res.data);
      onReply(reqId);
    } catch (error) {
      console.dir(error);
      onReply(null);
    }
  };

  return (
    <>
      <div className="list-row bg-base-300 m-3 w-lg">
        <div>
          <img className="size-15 rounded-full" src={photoURL} />
        </div>
        <div>
          <div className="font-semibold">{firstName + " " + lastName}</div>
          <div>
            {gender} . {age}
          </div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {about}
          </div>
        </div>
        <button
          className="btn btn-error "
          onClick={() => {
            reqRelpy("rejected", reqId);
          }}
        >
          Reject
        </button>
        <button
          className="btn  btn-primary"
          onClick={() => {
            reqRelpy("accepted", reqId);
          }}
        >
          Accept
        </button>
      </div>
    </>
  );
};

export default RequestsCard;
