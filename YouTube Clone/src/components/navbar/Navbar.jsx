import React, { useContext, useState } from 'react'
import upload_icon from '../../assets/upload2.svg'
import notification_icon from '../../assets/notification2.svg'
import profile_icon from '../../assets/usericon2.svg'
import { Link, useNavigate } from 'react-router-dom'
import { SetContext } from '../../contexts/setContext'
import darkTheme from '../../assets/dark.svg'
import lightTheme from '../../assets/light.svg'
import notificationLight from '../../assets/notificationlight.svg'
import userLight from '../../assets/userlight.svg'
import uploadLight from '../../assets/uploadlight.svg'
import SearchBar from '../search/SearchBar'
import authService from '../../appwrite/auth'



const Navbar = () => {
  const {userData, setUserData, setSidebar, themeChanger, themeMode } = useContext(SetContext)
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logoutHanlder = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUserData(null)
      alert("Successfully logged out")
      navigate("/login")
    } catch (error) {
      console.log(error);
      alert("some error occured, try again!")
    } finally {
      setShowOptions(false)
    }
    setLoading(false);
  }

  return (
    <nav className='flex-div flex justify-between shadow-md bg-white sticky top-0 h-16 z-10 dark:bg-black dark:text-white'>
      <div className="nav-left flex items-center md:mr-6 ml-6">
        {/* <img className=' cursor-pointer menu-icon w-6 mr-2 sm:mr-6' src={menu_icon} alt="" onClick={() => setSidebar((prev) => !prev)} /> */}

        <i className={`fa-solid fa-bars dark:text-white w-8 cursor-pointer menu-icon mr-2 sm:mr-6 text-3xl`} onClick={() => setSidebar((prev) => !prev)} ></i>

        <Link to='/'><img className='cursor-pointer logo w-10 hidden sm:inline' src="/youtubelogo.png" alt="" /></Link>
      </div>

      <div className="nav-middle flex items-center">
        {/* <div className="search-box flex items-center border border-gray-400 
        mr-4 py-2 px-3 rounded-full dark:border-gray-150 dark:bg-transparent">
          <input type="text" placeholder='Search' className='md:w-[400px] w-full border-none outline-none bg-transparent text-xs md:text-sm' />
          <img src={search_icon} alt="" className='w-4 cursor-pointer' />
        </div> */}
        <SearchBar />
      </div>

      <div className="relative nav-right flex items-center gap-6 sm:gap-10 mr-6">
        <img src={
          themeMode === 'light' ? darkTheme
            : lightTheme
        } className='opacity-80 hover:opacity-100 transition duration-200 w-4 h-6 cursor-pointer' onClick={themeChanger} />
        <img src={
          themeMode === 'dark' ? upload_icon
            : uploadLight
        } alt="" className={`opacity-80 hover:opacity-100 transition duration-200 w-4 h-6 cursor-pointer  hidden lg:inline`} />
        <img src={
          themeMode === 'dark' ? notification_icon
            : notificationLight
        } alt="" className={`opacity-80 hover:opacity-100 transition duration-200 w-4 h-6 cursor-pointer  hidden md:inline`} />
        <img src={
          themeMode === 'dark' ? profile_icon
            : userLight
        } alt="" className={`opacity-80 hover:opacity-100 transition duration-200 w-4 h-6 cursor-pointer  rounded-full`}
          onClick={() => setShowOptions((prev) => !prev)} />
        <ul className={`absolute top-4 right-2 text-xs md:text-sm  px-6 py-6 space-y-4 bg-gray-600 text-white rounded-md ${!showOptions && "hidden"}`}>
          <li onClick={() => { setShowOptions(false); navigate("/login")}} className={`${userData && "hidden"} cursor-pointer border-b-2 border-transparent hover:border-white pb-1`}>Login</li>
          <li onClick={() => { setShowOptions(false); navigate("/signup")}} className={`${userData && "hidden"} cursor-pointer border-b-2 border-transparent hover:border-white pb-1`}>SignUp</li>
          <li onClick={logoutHanlder} className={`${!userData && "hidden"} cursor-pointer border-b-2 border-transparent hover:border-white pb-1`}>{loading ? <div className='h-6 w-6 border-4 border-t-gray-600 animate-spin rounded-full'></div> : "Logout"}</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar