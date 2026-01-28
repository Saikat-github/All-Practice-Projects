import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'
import { onAuthStateChanged } from 'firebase/auth/cordova'
import { auth } from './firebase/config';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './contexts/ChatContext'
import { ToastContainer, toast } from 'react-toastify'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase/config'

const App = () => {

  const navigate = useNavigate();
  const { loadUserData, userData, setChatData, chatData, setLoading} = useContext(StoreContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadUserData(user.uid)
      } else {
        navigate("/")
      }
    })
  }, [])


  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, 'chat', userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = await res.data().chatData;
        const allChatData = [];
        for (const item of chatItems) {
          const userRef = doc(db, 'users', item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          allChatData.push({ ...item, userData })
        }
        setChatData(allChatData.sort((a, b) => b.updatedAt - a.updatedAt))
      });

      return () => {
        unSub();
      }
    }
  }, [userData])




  return (
    <div className='font-Poppins'>
      <ToastContainer />
      <Routes >
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </div>
  )
}

export default App