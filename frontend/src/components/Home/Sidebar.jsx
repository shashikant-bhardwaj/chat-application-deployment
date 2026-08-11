import React from "react";
import { FcSearch } from "react-icons/fc";
import OtherUsers from "./OtherUsers.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoggedInProfile from "./Loggedinprofile.jsx";
import Searchbar from "./Searchbar.jsx";
import { setSelectedUser } from "../../features/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Sidebar({ loading }) {
  const [searchedUser, setSearchedUser] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  //get authUser from store
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!loading && !authUser) {
      navigate("/login");
    }
  }, [loading, authUser, navigate]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white/5">
        <span className="text-white text-sm">Loading...</span>
      </div>
    );
  }

  if (!authUser) {
    navigate("/login");
    console.log("working");

    return null;
  }

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post("https://chat-application-deployment-vqph.onrender.com/api/v1/users/logout");
      navigate("/login");
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //  const users = [
  //     { id: 1, name: "Ankit", online: true },
  //     { id: 2, name: "Rahul", online: false },
  //     { id: 3, name: "Priya", online: true },
  //     { id: 4, name: "Aman", online: false },
  //   ];

  return (
    <div className="h-full flex flex-col bg-white/5">
      {/* Header */}

      <Searchbar setSearchedUser={setSearchedUser} />

      {/* Searched User */}
      {searchedUser && (
        <div
          onClick={() => {
            dispatch(setSelectedUser(searchedUser));
            setSearchedUser("");
          }}
          className={`
          flex items-center gap-3 p-4 cursor-pointer rounded-lg
          transition-all duration-10
          ${
            selectedUser?._id === searchedUser._id
              ? "bg-blue-500/20 shadow-lg shadow-blue-500/40 border border-blue-400"
              : "hover:bg-white/10"
          }
        `}
        >
          <div
            className="flex items-center gap-3 p-3 rounded-lg 
                       bg-white/10 cursor-pointer hover:bg-white/20"
          >
            <img
              src={searchedUser.profilePhoto}
              alt={searchedUser.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-white font-medium">{searchedUser.fullName}</p>

              <p className="text-gray-400 text-sm">@{searchedUser.username}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Users */}
      {!searchedUser && <OtherUsers />}

      {/* Logged In User + Logout */}
      <div className="border-t border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logged In User */}

          <LoggedInProfile />

          {/* Logout Button */}
          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg text-white text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

// <div className="flex-1 overflow-y-auto hide-scrollbar">

//       {users.map((user) => (

//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition"
//         >

//           <img
//             src="https://avatar.iran.liara.run/public"
//             alt=""
//             className="w-12 h-12 rounded-full"
//           />

//           <div>

//             <h2 className="text-white font-semibold">
//               {user.name}
//             </h2>

//             <p className="text-sm text-gray-400">
//               {user.online ? "Online" : "Offline"}
//             </p>

//           </div>

//         </div>

//       ))}

//     </div>
