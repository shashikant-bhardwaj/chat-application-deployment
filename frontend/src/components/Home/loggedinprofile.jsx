import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdatedProfile from "./UpdateProfile";

function LoggedInProfile() {
  const { authUser, onlineUsers } = useSelector((store) => store.user);
  const [selectedProfilePage, setSelectedProfilePage] = useState(false);
  const isOnline = onlineUsers.includes(authUser?._id);

  return (
    <>
      <div
        onClick={() => {
          setSelectedProfilePage(true);
          console.log(selectedProfilePage);
        }}
        className="flex items-center gap-3 min-w-0"
      >
        <img
          src={authUser?.profilePhoto?.replace(
            "/image/upload/",
            "/image/upload/f_jpg/",
          )}
          alt="profile"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />

        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm sm:text-base truncate">
            {authUser?.fullName}
          </h3>

          <p className="text-green-400 text-xs sm:text-sm">
            {isOnline ? "online" : ""}
          </p>
        </div>
      </div>
      {selectedProfilePage && (
        <UpdatedProfile setSelectedProfilePage={setSelectedProfilePage} />
      )}
    </>
  );
}

export default LoggedInProfile;
