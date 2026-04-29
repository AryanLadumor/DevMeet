import React, { useState } from "react";
import apiCall from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstname] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");

  const [msgText, setMsgText] = useState();
  const [toast, setToast] = useState(null);

  const saveProfile = async () => {
    try {
      const res = await apiCall.patch("/profile/edit", {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),

        ...(photoURL && { photoURL }),
        ...(about && { about }),
         ...(skills && { skills: skills.split(",").map(s => s.trim()).filter(Boolean) }),
        ...(age && { age: Number(age) }),
        ...(gender && { gender }),
      });
      setMsgText(res.data.msg);
      setToast("success");
      setTimeout(() => setToast(null), 3000);

      dispatch(addUser(res.data.user));
    } catch (error) {
      setMsgText(error?.response?.data?.msg || "Something went wrong");
      setToast("fail");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      <div className="card card-dash bg-base-300 w-96">
        
        <div className="card-body flex flex-col justify-center  ">
          <h2 className="card-title">Edit Your Profile</h2>

          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="input input-primary"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              className="input validator"
              placeholder="Age  17-55"
              min="17"
              max="55"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className=" flex ">
            <label className="p-2">
              <input
                type="radio"
                name="gender"
                className="radio radio-secondary"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              &nbsp;Male
            </label>

            <label className="p-2">
              <input
                type="radio"
                name="gender"
                className="radio radio-primary"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              &nbsp;Female
            </label>
          </div>

          {/* About */}
          <div>
            <textarea
              placeholder="About"
              className="textarea textarea-primary"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div>
            <input
              type="url"
              placeholder="https://image-url"
              className="input input-bordered"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Skills */}
          <div>
            <input
              type="text"
              placeholder="Skills (comma separated)"
              className="input input-sm"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <button
            className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
      {/* Toast */}
      {toast && <div className="toast toast-top toast-start">
        <div className={`alert ${toast=="success"? "alert-success" : "alert-error"}` }>
          <span>{msgText}</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
