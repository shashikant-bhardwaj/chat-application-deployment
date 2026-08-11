import axios from "axios"
import { useSelector } from "react-redux"


import React from 'react'

function UseMessageMarkAsSeen() {
    const {selectedUser} = useSelector(store => store.user)
   
    const MarkAsSeen = async(senderId) => {
        
       try {
         axios.defaults.withCredentials = true;
         const res = await axios.patch(`https://chat-application-deployment-vqph.onrender.com/api/v1/messages/seen/${senderId}`)
         
         return res.data
       } catch (error) {
         

            console.log(
                "MARK AS SEEN ERROR:",
                error.response?.data || error.message
            )
       }
     
    }
      return { MarkAsSeen }
}

export default UseMessageMarkAsSeen
