import React, { useContext, useState } from 'react'
import authService from '../../appwrite/auth';
import { useMemo } from 'react';
import { SetContext } from '../../contexts/setContext';

const VerifyPage = () => {
  const [loading, setLoading] = useState(false);
  const rootUrl = window.location.origin;
  const verifytUrl = useMemo(() => `${rootUrl}/verifyemail`, []);
  const {userData} = useContext(SetContext);


  const btnHandler = async () => {
    if (!userData) return;
    setLoading(true);
    try {
      if(!userData?.emailVerification) {
        await authService.sendVerificationEmail(verifytUrl)
        alert("Verification email sent, please check your inbox")
      } else {
        alert("You are verified, please go to home page")
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col my-20 h-screen items-center'>
      <p className='md:text-2xl mx-4'>Click the button below to verify your email</p>
      <button type="submit" className="flex gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 ${className} text-lg transition duration-300 my-6"
        disabled={loading} onClick={btnHandler}>
        Verify Email
        {loading ? <div className="h-6 w-6 border-4 border-blue-800 border-t-white rounded-full animate-spin"></div> : null}
      </button>
    </div>
  )
}

export default VerifyPage