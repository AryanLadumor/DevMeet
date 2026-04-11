import React from "react";
import apiCall from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../store/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about, skills } =
    user;
  const dispatch = useDispatch();
  if (!user) return <span className="loading loading-dots loading-xs"></span>;

  const handleSendrequest = async (status, userId) => {
    try {
      const res = await apiCall.post(`/request/send/${status}/${userId}`);
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-200 w-80 shadow-sm">
      <figure>
        <img
          className="rounded cover-full w-full "
          src={photoURL}
          alt="No photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          <div className="badge badge-secondary">{age}</div>
        </h2>
        <p>{about}</p>
        <div>
          <p>{gender}</p>
          {skills.join(",")}
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn bg-base"
            onClick={() => handleSendrequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-accent"
            onClick={() => handleSendrequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
