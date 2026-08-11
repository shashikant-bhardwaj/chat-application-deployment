import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../features/user/userSlice";

function UseUploadProfile() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(store => store.user);

    const uploadProfile = async (file) => {
        try {
            if (!file) {
                console.log("No file selected");
                return;
            }

            const formData = new FormData();

            formData.append("profilePhoto", file);

            axios.defaults.withCredentials = true;

            const res = await axios.post(
                " https://chat-application-deployment-vqph.onrender.com/api/v1/users/upload-profile",
                formData
            );
            dispatch(setAuthUser(res.data.data));

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("ERROR MESSAGE:", error.message);
            console.log("ERROR RESPONSE:", error.response?.data);
        }
    };

    return { uploadProfile };
}

export default UseUploadProfile;