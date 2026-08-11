import React from "react";
import OtherUser from "./OtherUser.jsx";
import { useSelector } from "react-redux";
import useGetOtherUsers from "../../hooks/getOtherUsers/useGetOtherUsers.js";

function OtherUsers() {
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) return null;

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
}

export default OtherUsers;
