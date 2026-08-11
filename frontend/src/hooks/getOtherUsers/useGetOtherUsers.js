import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../../features/user/userSlice';

function UseGetOtherUsers() {
const dispatch = useDispatch()
     useEffect( () => {
        
          const fetchOtherUsers = async() => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get("https://chat-application-deployment-vqph.onrender.com/api/v1/users/")


            //store
            dispatch(setOtherUsers(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchOtherUsers();
     }, [dispatch])
  
}

export default UseGetOtherUsers
