import React from "react";
import { Link } from "react-router-dom";

const ConnectionsCard = ({ user }) => {
  const {_id, firstName, lastName, photoURL, about, age, gender } = user;
  return (
    <div className="flex gap-4 list-row bg-base-300 w-lg p-4 m-3 rounded items-center">
      <div className="">
        <img className=" w-24 h-20 rounded-full" src={photoURL} />
      </div>

      <div className="flex flex-col justify-around items-start">
        <div className="font-semibold">{firstName + " " + lastName}</div>
        <div>
          {gender} . {age}
        </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {about}
        </div>
      </div>

      <Link to={`/chat/${_id}`}>
      <button className="btn btn-primary">message</button>
      </Link>
      
    </div>
  );
};

export default ConnectionsCard;
