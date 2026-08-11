import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../features/user/userSlice.js";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // get authUser from store

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setUser({
      identifier: "",
      password: "",
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-md  p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-white">Log In</h1>
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {/* Username or email --> identifier */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Username/Email
              </label>
              <input
                onChange={onChange}
                name="identifier"
                value={user.identifier}
                type="text"
                placeholder="Enter your username or email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Password
              </label>
              <input
                onChange={onChange}
                name="password"
                value={user.password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>

            {/* SignUp Link */}
            <p className="text-center text-sm text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
