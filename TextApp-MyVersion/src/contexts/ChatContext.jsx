import { getDoc, updateDoc, doc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";



export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [userData, setUserData] = useState();
    const [chatData, setChatData] = useState();
    const [loading, setLoading] = useState();
    const [chatVisible, setChatVisible] = useState(false);
    const [messageId, setMessageId] = useState();
    const [messages, setMessages] = useState();
    const [chatUser, setChatUser] = useState();




    const navigate = useNavigate();

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const data = userSnap.data();
            setUserData(data);
            if (data.avatar && data.name) {
                navigate('/chat')
            } else {
                navigate("/profile")
            }
            await updateDoc(userRef, {
                lastSeen: Date.now()
            })
            setInterval(async () => {
                await updateDoc(userRef, {
                    lastSeen: Date.now()
                })
            }, 60000);
        } catch (error) {
            console.log(error.message);
        }
    }



    //convert timestamp
    const convertTime = (timestamp) => {
        const date = new Date(timestamp);
        const istTime = date.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return istTime;
    }


    const contextValue = {
        userData, setUserData,
        chatData, setChatData,
        loading, setLoading,
        loadUserData,
        chatVisible, setChatVisible,
        messageId, setMessageId,
        messages, setMessages,
        chatUser, setChatUser,
        convertTime
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;