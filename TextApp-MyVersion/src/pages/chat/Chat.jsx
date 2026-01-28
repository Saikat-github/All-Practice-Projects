import React, { useContext, useEffect } from 'react'
import { ChatBox, LeftSideBar, RightSideBar } from '../../components'
import { StoreContext } from '../../contexts/ChatContext'

const Chat = () => {
  const {loading} = useContext(StoreContext);

  return (
    <div className=" flex justify-center min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover">
      {loading ? <div className='my-auto w-16 h-16 border-8 rounded-full border-x-white border-t-white border-b-transparent animate-spin '></div> :
        <div className="chat-container w-full mx-10 grid grid-cols-4 h-screen my-10">
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>}
    </div>
    // <div className=" flex justify-center min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover">
    //   <div className="chat-container w-full mx-10 grid grid-cols-4 h-screen my-10">
    //     <LeftSideBar />
    //     <ChatBox />
    //     <RightSideBar />
    //   </div>
    // </div>
  )
}

export default Chat