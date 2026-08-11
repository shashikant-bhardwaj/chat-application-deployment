import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../features/message/messageSlice";

function useDeleteForEveryone() {

    const { selectedMessage, userMessages } = useSelector(
        store => store.message
    );

    const dispatch = useDispatch();

    const deleteForEveryone = async () => {

        try {
            axios.defaults.withCredentials = true;

            const res = await axios.post(
                `https://chat-application-deployment-vqph.onrender.com/api/v1/messages/delete-msg-everyone/${selectedMessage?._id}`
            );


            // Message ko remove nahi karna,
            // sirf deletedForEveryone true karna
            dispatch(
                setMessages(
                    userMessages.map(msg =>
                        msg._id === selectedMessage._id
                            ? {
                                ...msg,
                                deletedForEveryone: true
                            }
                            : msg
                    )
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    return {deleteForEveryone}
}

export default useDeleteForEveryone;
