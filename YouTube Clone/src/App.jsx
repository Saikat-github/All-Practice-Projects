import React, { useContext, useState, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { SetContext } from './contexts/setContext'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import authService from './appwrite/auth'

const App = () => {
const {themeMode} = useContext(SetContext);
const [authLoading, setAuthLoading] = useState(false);
const { setUserData} = useContext(SetContext);
const navigate = useNavigate();


useEffect(() => {
  document.querySelector('html').classList.remove('light', 'dark');
  document.querySelector('html').classList.add(themeMode)
}, [themeMode]);

useEffect(() => {
  setAuthLoading(true);
  const checkUserSession = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setUserData(user)
      } else {
        setUserData(null)
        navigate("/login");
      }
    } catch (err) {
      if (err.code === 401) {
        console.log('Session expired or, user is not authenticated');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  checkUserSession();
}, [])

  return <>
  
  {!authLoading ? (
    <div className='font-Roboto dark:bg-black dark:text-gray-100'>
      <ScrollToTop />
      <Navbar/>
      <Outlet />
    </div>
  ) : (<div className='w-screen h-screen flex justify-center items-center bg-gray-100'><div className="h-20 w-20 border-8 border-t-blue-500 rounded-full animate-spin "></div></div>)}
  
  </>
}

export default App



