import React from "react";

const RequestsCard = ({user}) => {
    const {firstName,lastName,age,gender,about,photoURL} = user
  return (
    <div className="list-row bg-base-300 m-3 w-lg">
      <div>
        <img
          className="size-15 rounded-full"
          src={photoURL}
        />
      </div>
      <div>
        <div className="font-semibold">{firstName + " "+ lastName}</div>
         <div>{gender} . {age}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {about}
        </div>
      </div>
      <button className="btn btn-error ">
        Reject
      </button>
      <button className="btn  btn-primary">
        Accept
      </button>
    </div>
  );
};

export default RequestsCard;
