import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "./features/user/userSlice.js";
import {
  setAddMessages,
  setDeletedMsg,
  setUpdatedMessages,
} from "./features/message/messageSlice.js";
import updateProfile from "./components/Home/UpdateProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser?._id) return;

    const socket = io(" https://chat-application-deployment-vqph.onrender.com");

    socket.on("connect", () => {
      socket.emit("addUser", authUser._id);
    });
    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", async (newMessage) => {
      if (newMessage?.senderId === selectedUser?._id) {
        // message UI mein add karo
        dispatch(setAddMessages(newMessage));

        // kyunki chat already open hai,
        // message ko immediately seen kar do
        try {
          await axios.patch(
            ` https://chat-application-deployment-vqph.onrender.com/api/v1/messages/seen/${newMessage.senderId}`,
            {},
            {
              withCredentials: true,
            },
          );
        } catch (error) {
          console.log(
            "MARK AS SEEN ERROR:",
            error.response?.data || error.message,
          );
        }
      }
    });
    socket.on("updatedMessages", (updatedMessages) => {
      dispatch(setUpdatedMessages(updatedMessages));
    });
    socket.on("deleteMsg", (deleteMsg) => {
      dispatch(setDeletedMsg(deleteMsg));
    });

    return () => {
      socket.disconnect();
    };
  }, [authUser, selectedUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
