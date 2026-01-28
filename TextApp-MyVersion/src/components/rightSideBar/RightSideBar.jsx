import React, { useContext } from 'react'
import assets from '../../assets/assets'
import { logout } from '../../firebase/config'
import { StoreContext } from '../../contexts/ChatContext'


const RightSideBar = () => {
  let {chatUser, messages} = useContext(StoreContext);


  return (
    chatUser ? <div className="rs hidden lg:block text-white bg-gray-950 relative overflow-y-scroll h-[80vh] px-5 no-scrollbar rounded-r-lg">
      <div className="rs-profile text-center pt-16 m-auto max-w-3/4 flex justify-center items-center flex-col">
        <img src={chatUser.avatar} className='w-28 h-28 rounded-full' />
        {/* <h3 className='text-lg flex items-center justify-center my-1'>{chatUser.userData.name}{Date.now() - chatUser.userData.lastSeen <= 70000 ?
          <img src={assets.green_dot} className='w-4' /> :
          null}</h3> */}
        <p className='text-[10px] opacity-80 mt-4' >{chatUser.bio}</p>
      </div>
      <hr className='text-gray-800 my-8' />
      <div className="rs-media text-sm">
        <p>Media</p>
        <div className='max-h-44 grid grid-cols-3 gap-1 mt-2'>
          {messages?.map((item, idx) => (
            item.image && <img onClick={() => window.open(item.image)} key={idx} src={item.image} className='w-16 rounded-sm cursor-pointer' />
          ))}
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <button onClick={() => logout()} className='absolute bottom-5 bg-sky-700 text-sm text-white cursor-pointer px-16 py-2 rounded-full hover:bg-opacity-85'>Logout</button>
      </div>
    </div> :
      <div className="rs hidden lg:block text-white bg-gray-950 relative h-[80vh] px-5">
        <button onClick={() => logout()} className='absolute bottom-5 bg-sky-700 text-sm text-white cursor-pointer px-16 py-2 rounded-full hover:bg-opacity-85'>Logout</button>
      </div>
  )
}

export default RightSideBar