import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import assets from '../../assets/assets';
import { StoreContext } from '../../contexts/ChatContext';
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { upload } from '../../firebase/upload';
import { toast } from 'react-toastify';

const ChatBox = () => {
  const [image, setImage] = useState();
  const { chatVisible, setChatVisible, chatUser, messageId, messages, setMessages, userData, convertTime } = useContext(StoreContext);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({ mode: "onChange" });

  // Handle sending messages and updating chat data
  const formSubmit = async (data) => {
    try {
      if (messageId && (data.input || data.image)) {
        const messagesRef = doc(db, 'messages', messageId);

        // Text message handling
        if (data.input) {
          await updateDoc(messagesRef, {
            messages: arrayUnion({
              createdAt: Date.now(),
              sId: userData.id,
              text: data.input
            })
          });
        } 
        // Image message handling
        else if (data.image[0]) {
          let imgUrl = await upload(data.image[0]);
          await updateDoc(messagesRef, {
            messages: arrayUnion({
              createdAt: Date.now(),
              sId: userData.id,
              image: imgUrl
            })
          });
        }

        // Update chat data for both users
        updateChatData(messageId, userData, chatUser, data);

      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    reset();
    setImage(null);
  };

  // Firebase snapshot for messages
  useEffect(() => {
    if (messageId) {
      const messagesRef = doc(db, 'messages', messageId);
      const unSub = onSnapshot(messagesRef, (res) => {
        if (res.exists()) {
          const loadMessages = res.data().messages.map((message) => ({
            ...message,
            createdAt: message.createdAt instanceof Timestamp
              ? message.createdAt.toDate().getTime()
              : message.createdAt
          }));
          setMessages(loadMessages.reverse());
        }
      });

      return () => unSub();
    }
  }, [messageId]);

  // Update chat data function
  const updateChatData = async (messageId, userData, chatUser, data) => {
    const userIds = [chatUser.id, userData.id];
    userIds.forEach(async (id) => {
      const userChatsRef = doc(db, 'chat', id);
      const userChatsSnap = await getDoc(userChatsRef);

      if (userChatsSnap.exists()) {
        const userChatData = userChatsSnap.data();
        const chatIndex = userChatData.chatData.findIndex((c) => c.messageId === messageId);
        userChatData.chatData[chatIndex].updatedAt = Date.now();
        userChatData.chatData[chatIndex].lastMessage = data.input || "image";
        if (userChatData.chatData[chatIndex].rId === userData.id) {
          userChatData.chatData[chatIndex].messageSeen = false;
        }
        await updateDoc(userChatsRef, {
          chatData: userChatData.chatData
        });
      }
    });
  };

  // Memoized image preview to prevent unnecessary re-renders
  const imagePreview = useMemo(() => image ? URL.createObjectURL(image) : assets.gallery_icon, [image]);

  // Memoized messages rendering to avoid re-renders
  const renderMessages = useMemo(() => {
    return messages?.map((msg, idx) => (
      <div key={idx} className={`s-msg flex items-end justify-end gap-1 px-4 ${msg.sId === userData.id ? "flex-row" : "flex-row-reverse"}`}>
        {msg.image 
          ? <img src={msg.image} className='w-32' /> 
          : <p className={`msg mb-3 text-xs max-w-52 text-white ${msg.sId === userData.id ? "rounded-t-md rounded-l-md bg-sky-600" : "rounded-t-md rounded-r-md bg-gray-700"} p-2`}>{msg.text}</p>}
        <div className='text-center text-[9px]'>
          <img className='w-7 aspect-auto rounded-full' src={msg.sId === userData.id ? userData.avatar : chatUser?.avatar} alt="" />
          <p className='text-white'>{convertTime(msg.createdAt)}</p>
        </div>
      </div>
    ));
  }, [messages]);

  return chatUser ? (
    <div className={`chat-box lg:col-span-2 col-span-4 relative bg-black h-[80vh] ${chatVisible ? "block" : "hidden lg:block"}`}>
      {/* Chat Header */}
      <div className="chat-user px-4 py-2 flex items-center gap-3 border-b">
        <img src={assets.arrow_icon} onClick={() => setChatVisible(false)} className='w-6 cursor-pointer md:hidden inline' alt="" />
        <img src={chatUser?.avatar} className='w-10 rounded-full' />
        <p className='flex text-lg font-semibold items-center gap-1 text-white'>{chatUser?.name}</p>
        {Date.now() - chatUser.lastSeen < 70000 ? <img src={assets.green_dot} /> : null}
        <img src={assets.help_icon} className='w-6 rounded-full' />
      </div>

      {/* Chat Messages */}
      <div className="chat-msg h-3/4 overflow-y-scroll flex flex-col-reverse gap-4 pt-4">
        {renderMessages}
      </div>

      {/* Message Input */}
      <form className="chat-input flex items-center gap-3 px-4 py-2 bg-gray-950 absolute bottom-0 right-0 left-0 m-2" onSubmit={handleSubmit(formSubmit)}>
        <input type="text" placeholder='Send a message' className='flex-1 border-none outline-none bg-gray-950 text-white' {...register("input")} />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden {...register("image", { onChange: (e) => setImage(e.target.files[0]) })} />
        <label htmlFor="image" className='flex'>
          <img className='w-10 h-10 cursor-pointer bg-white rounded-md' src={imagePreview} alt="" />
        </label>
        <button type='submit' disabled={isSubmitting}>
          <img className='w-8 cursor-pointer' src={assets.send_button} alt="" />
        </button>
      </form>
    </div>
  ) : (
    <div className={`chat-welcome chat-box col-span-2 relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white h-[80vh] hidden lg:flex flex-col justify-center items-center gap-8}`}>
      <img src={assets.logo_icon} className='w-32' />
      <p className='text-center text-3xl'>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatBox;
