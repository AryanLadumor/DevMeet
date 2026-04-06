import React from "react";

const UserCard = ({user}) => {
    if(!user) return (<div></div>)
    const {firstName,lastName,age,gender,photoURL,about,skills} = user
  return (
    <div className="card bg-base-200 w-80 shadow-sm">
      <figure>
        <img
          src={photoURL}
          alt="No photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          <div className="badge badge-secondary">{age}</div>
        </h2>
        <p>
         {about}
        </p>
        <div>
            <p>{gender}</p>
            {skills.join(",")}
        </div>
        <div className="card-actions justify-end">
        <button className="btn bg-base">Ignore</button>
          <button className="btn btn-accent">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
