import React, { useContext, useMemo, useState } from 'react'
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { db, logout } from '../../firebase/config';
import { StoreContext } from '../../contexts/ChatContext';
import { arrayUnion, collection, doc, getDocs, query, setDoc, getDoc, updateDoc, where } from 'firebase/firestore';

const LeftSideBar = () => {
    const { chatVisible, setChatVisible, userData, setChatUser, messageId, setMessageId, setMessages, chatData, convertTime } = useContext(StoreContext);
    const [showProfile, setShowProfile] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    const inputHandler = async (e) => {
        setInputVal(e.target.value);
        try {
            let input = e.target.value.trim();
            if (input) {
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);
                if (!querySnap.empty) {
                    let searchedUsers = [];
                    for (let user of querySnap.docs) {
                        const userDataFetched = user.data();
                        if (userDataFetched.id !== userData.id && !chatData.some((item) => item.rId === userDataFetched.id)) {
                            searchedUsers.push(userDataFetched);
                        }
                    }
                    setUsers(searchedUsers);
                    setInputVal("");
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    const addChat = async (user) => {
        if (!user || !userData) return;
        setUsers([]);
        try {
            const messageRef = collection(db, 'messages');
            const chatsRef = collection(db, 'chat');
            const newMessageRef = doc(messageRef);
            await setDoc(newMessageRef, {
                createdAt: Date.now(),
                messages: []
            });

            const newChatData = {
                messageId: newMessageRef.id,
                lastMessage: "",
                rId: user.id,
                updatedAt: Date.now(),
                messageSeen: true,
            }

            await updateDoc(doc(chatsRef, userData.id), {
                chatData: arrayUnion(newChatData)
            })
            await updateDoc(doc(chatsRef, user.id), {
                chatData: arrayUnion({ ...newChatData, rId: userData.id })
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    const setChat = async (item) => {
        setMessageId(item.messageId);
        setChatUser(item.userData);
        const chatsRef = doc(db, 'chat', userData.id);
        const chatsSnap = await getDoc(chatsRef);
        const allChatData = chatsSnap.data();
        const chat = allChatData.chatData.find((c) => c.rId === item.rId);
        chat.messageSeen = true;
        await updateDoc(chatsRef, {
            chatData: allChatData.chatData
        });
        setChatVisible(true);
    }


    const showSearchedUsers = useMemo(() => {
        return users?.map((item, idx) => (
            <div onClick={() => addChat(item)} key={idx} className="friends flex items-center px-5 py-2 gap-3 cursor-pointer text-sm hover:bg-sky-600 group">
                <img src={item.avatar} className='w-10 aspect-auto rounded-full' />
                <div className='flex flex-col'>
                    <p>{item.name}</p>
                    <span className='text-xs text-gray-400 group-hover:text-white'>{item.bio}</span>
                </div>
            </div>
        ))
    }, [users]);

    const showChatData = useMemo(() => {
        return chatData?.map((item, idx) => (
            <div onClick={() => setChat(item)} key={idx} className="friends flex items-center pl-5 py-2 pr-1 gap-3 cursor-pointer text-sm hover:bg-gray-800 group w-full">
                <img src={item.userData.avatar} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col w-full'>
                    <p>{item.userData.name}</p>
                    <div className={`w-full flex justify-between ${item.messageSeen ? "text-xs text-gray-400" : "text-xs text-green-500 font-semibold"}`}>
                        <span>{item.lastMessage}</span>
                        <span>{convertTime(item.updatedAt)}</span>
                    </div>
                </div>
            </div>
        ))
    }, [chatData])



    return (
        <div className={`ls lg:col-span-1 col-span-4 bg-gray-950 text-white h-[80vh] ${chatVisible ? "hidden lg:block" : "block"} rounded-l-lg md:rounded-r-none rounded-r-lg`}>
            <div className="ls-top p-5">
                <div className="ls-nav flex justify-between items-center">
                    <img src={assets.logo} className='logo max-w-32' />
                    <div className="menu relative py-2">
                        <div className="flex gap-2 items-center">
                            <img src={userData ? userData.avatar : ""} className='logo w-10  h-10 rounded-full cursor-pointer' onClick={() => navigate("/profile")} />
                            <img src={assets.menu_icon} className='w-6 h-6 opacity-85 cursor-pointer' onClick={() => setShowProfile((prev) => !prev)} />
                        </div>
                        {showProfile ? <div className="sub-menu absolute right-0 w-36 p-5 rounded-sm bg-white text-black">
                            <p className='text-sm cursor-pointer' onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr className='h-0.5 bg-gray-500 my-2' />
                            <p onClick={() => logout()} className='text-sm cursor-pointer'>Logout</p>
                        </div> : null}
                    </div>
                </div>
                <div className="ls-search flex items-center gap-3 px-3 py-2 mt-5 bg-blue-900">
                    <img src={assets.search_icon} className='w-4' />
                    <input onChange={inputHandler} value={inputVal} type="text" placeholder='Search here...' className='bg-transparent border-none outline-none text-white text-xs' />
                </div>
            </div>
            <div className="ls-list flex flex-col h-3/4 overflow-scroll no-scrollbar">
                {users.length > 0 ? showSearchedUsers : showChatData}
            </div>
        </div>
    )
}

export default LeftSideBar