import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setMessages } from '../../features/message/messageSlice'

function useGetMessages() {

    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(() => {

        if (!selectedUser) return;
        dispatch(setMessages([]));

        const getMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://chat-application-deployment-vqph.onrender.com/api/v1/messages/${selectedUser?._id}`)
                dispatch(setMessages(res.data.data.messages))
             
            } catch (error) {
                if (error.response?.status === 404) {
                    //conversation doesn't exist
                    dispatch(setMessages([]))
                    return;
                }
                console.log("failed to fetch messages")
            }

        }
        getMessages()
    }, [dispatch, selectedUser])

}

export default useGetMessages
