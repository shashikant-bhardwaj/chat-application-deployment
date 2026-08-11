import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import MessageContainer from "./messageContainer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAuthUser } from "../../features/user/userSlice";

function Home() {
  const [loading, setLoading] = useState(true);
  // const [selectedUser, setSelectedUser] = useState(null);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        console.log(loading);
        const res = await axios.get(
          "http://localhost:8080/api/v1/users/current-user",
          {
            withCredentials: true,
          },
        );

        console.log("CURRENT USER:", res.data.data);

        dispatch(setAuthUser(res.data.data));
      } catch (error) {
        console.log("CURRENT USER ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [dispatch]);

  return (
    <div className="h-screen p-2 sm:p-4">
      <div className="flex h-full rounded-xl overflow-hidden border border-gray-700 bg-white/10 backdrop-blur-md">
        {/* Sidebar */}
        <div
          className={`
            w-full
            md:w-80
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          <Sidebar loading={loading} selectedUser={selectedUser} />
        </div>

        {/* Message Container */}
        <div
          className={`
            flex-1
            ${selectedUser ? "block" : "hidden md:block"}
          `}
        >
          <MessageContainer selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
}

export default Home;
