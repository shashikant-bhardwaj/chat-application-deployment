import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


function Signup() {


  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "", 
    username: "",
    email: "",
    password: "",
    gender: ""
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
      const res = await axios.post(" https://chat-application-deployment-vqph.onrender.com/api/v1/users/register", user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log("axios error:", error)
    }

    console.log(user)
    setUser({
      fullName: "",
      username: "",
      email: "",
      password: "",
      gender: ""
    })
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-md  p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-white">
            Sign Up
          </h1>
          <form
            onSubmit={onSubmitHandler}
            className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                onChange={onChange}
                name='fullName'
                value={user.fullName}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Username
              </label>
              <input
                onChange={onChange}
                name='username'
                value={user.username}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Email
              </label>
              <input
                onChange={onChange}
                name='email'
                value={user.email}
                type="email"
                placeholder="Enter your email"
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
                name='password'
                value={user.password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Gender
              </label>
              <select
                onChange={onChange}
                name='gender'
                value={user.gender}
                className="w-full  px-4 py-2 border border-gray rounded-lg  border-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className='text-black ' value="">Select Gender</option>
                <option className='text-black ' value="male">Male</option>
                <option className='text-black ' value="female">Female</option>
              </select>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>

            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
