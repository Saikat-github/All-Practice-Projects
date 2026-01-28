import React, { useContext } from 'react'
import PlayVideo from '../../components/play-video/PlayVideo'
import Recommended from '../../components/recommended/Recommended'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { SetContext } from '../../contexts/setContext'


const Video = () => {
  const {videoId, categoryId} = useParams();
  const {userData} = useContext(SetContext);
  const navigate = useNavigate();

  

  return userData ? (userData?.emailVerification ? (
    <div className="play-container sm:px-10 py-4 flex flex-col lg:flex-row">
      <Sidebar />
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
  ) : <p className='text-center my-20 text-2xl h-screen'>Please <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/verifypage")}>verify</span> your email to watch videos</p>) : <p className='text-center my-20 text-2xl h-screen'>Please <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/login")}>login</span> to watch videos</p>
}

export default Video