import React, { useCallback, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import GoogleLogo from '../../assets/google2.svg';
import { SetContext } from '../../contexts/setContext';
import authService from '../../appwrite/auth';
import { useMemo } from 'react'




const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const rootUrl = window.location.origin;
  const resetUrl = useMemo(() => `${rootUrl}/resetPassword`, []);

  const { register, handleSubmit, watch, formState: { isSubmitting, isSubmitted }, reset } = useForm();
  const navigate = useNavigate();
  const { setUserData } = useContext(SetContext)


  //login user handler
  const authLogin = useCallback(async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        authService.getCurrentUser().then((userData) => {
          if (userData) setUserData(userData)
          navigate("/");
        });
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      reset();
      setLoading(false);
    }
  }, [navigate]);


  const forgetPassword = useCallback(() => {
    alert("Please contact Saikat to reset your password")
  }, [])

  const googleLogin = useCallback(() => {
    alert("Google login is coming soon!")
  }, [])



  return (
    <div
      className='flex justify-center h-screen z-10 bg-[#00000090] dark:bg-white dark:bg-opacity-15'
    >
      <div className={`mx-auto w-full max-w-lg h-3/4 bg-gray-100 rounded-sm px-10 border border-black/10 animate-[fadeIn_1s] overflow-y-auto mt-10`}>
        {/* <div className='flex justify-end'>
          <Link to='/' className='flex justify-end'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-6 cursor-pointer'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </Link >
        </div> */}

        <h2 className="text-center text-3xl leading-tight dark:text-gray-700">Log In</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline" 
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit(authLogin)} className='mt-8'>
          <div className='space-y-2'>
            <label
              className='inline-block mb-1 pl-1 text-sm text-gray-600'
              htmlFor={"email"}>
              Email
            </label>
            <input
              id='email'
              label="Email "
              placeholder="Enter your email"
              type="email"
              className={`px-3 py-1 text-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-700 focus:shadow-lg `}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <label
              className='inline-block mb-1 pl-1 text-sm text-gray-600'
              htmlFor={"password"}>
              Password
            </label>
            <input
              id='password'
              label="Password "
              type="password"
              placeholder="Enter your password"
              className={`px-3 py-1 text-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-700 focus:shadow-lg `}
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="flex gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 ${className} text-lg transition duration-300 my-6"
                disabled={isSubmitting || isSubmitted}
              >Login <div className={`h-6 w-6 border-4 border-blue-800 border-t-white rounded-full animate-spin ${loading ? "opacity-100" : "opacity-0"}`}></div></button>
              <span disabled={loading} className='text-xs hover:underline py-2 cursor-pointer dark:text-gray-700 my-6' onClick={() => forgetPassword()}>
                Forget Password?
              </span>
            </div>
          </div>
        </form>
        <div className='my-6 flex gap-4 items-center'>
          <hr className='bg-gray-400 h-0.5 border-0 flex-grow' />
          <span className="mx-2 dark:text-gray-700">Or</span>
          <hr className='bg-gray-400 h-0.5 border-0 flex-grow' />
        </div>

        <div className="oauth my-4 flex flex-col gap-4 items-center">
          {/* <button className='hover:ring-1 hover:ring-blue-700  w-72 py-3 text-gray-600 flex gap-2 justify-center items-center shadow-lg'><img className='w-8' src={FacebookLogo} alt="" />Continue With Facebook</button> */}
          <button className='hover:ring-1 hover:ring-blue-700  w-72 py-3 dark:text-gray-700 flex gap-2 justify-center items-center shadow-xl' onClick={() => googleLogin()}><img className='w-8' src={GoogleLogo} alt="" />Continue With Google</button>
        </div>

      </div>
    </div>
  )
}

export default Login