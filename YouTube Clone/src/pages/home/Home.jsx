import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import { SetContext } from '../../contexts/setContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {userData} = useContext(SetContext);
  const navigate = useNavigate();
  

  return userData ? (userData?.emailVerification ? (
    <div className='dark:bg-black dark:text-white'>
    <Sidebar />
    {/* <h1 className='text-5xl text-center my-6'>Home</h1> */}
    <Feed/>
    </div>
  ) : <p className='text-center my-20 text-2xl h-screen '>Please <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/verifypage")}>verify</span> your email to watch videos</p>) : <p className='text-center my-20 text-2xl h-screen'>Please <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/login")}>login</span> to watch videos</p>
}

export default Home