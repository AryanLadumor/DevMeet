import UserCard from "../feed/UserCard";

const ProfileView = ({ user }) => {
  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default ProfileView;
