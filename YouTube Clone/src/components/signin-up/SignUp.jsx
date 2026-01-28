import React, { useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../../appwrite/auth';
import { SetContext } from '../../contexts/setContext';
import { useMemo } from 'react';
import GoogleLogo from '../../assets/google2.svg';



const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm();
    const navigate = useNavigate();
    const { setUserData } = useContext(SetContext);
    const rootUrl = window.location.origin;
    const verifytUrl = useMemo(() => `${rootUrl}/verifyemail`, []);


    const create = async (data) => {
        setLoading(true);
        setError("");
        console.log(verifytUrl)
        try {
            let session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) setUserData(userData)
            }
            await authService.sendVerificationEmail(verifytUrl)
            alert('Verification email sent! Please check your inbox.');
        } catch (error) {
            setError(error.message);
        } finally {
            reset()
            setLoading(false);
        }
    }

    const googleLogin = useCallback(() => {
        alert("Google login is coming soon!")
    }, [])


    return (
        <div className="flex justify-center h-screen z-10 bg-[#00000090] animate">
            <div className={`mx-auto w-full max-w-lg h-3/4 bg-gray-100 rounded-sm px-10 border border-black/10 animate-[fadeIn_0.5s] overflow-y-auto mt-10`}>
                <div className='flex justify-end'>
                    <Link to='/' className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-6 cursor-pointer'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </Link >
                </div>
                <h2 className="text-center text-3xl leading-tight dark:text-gray-700">Sign up</h2>
                <p className="my-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='flex gap-y-2 flex-col'>
                        <label
                            className='inline-block mb-1 pl-1 text-sm text-gray-600'
                            htmlFor={"name"}>
                            Name
                        </label>
                        <input
                            id='name'
                            className={`px-3 py-1 text-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-700 focus:shadow-lg `}
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />

                        <label
                            className='inline-block mb-1 pl-1 text-sm text-gray-600'
                            htmlFor={"email"}>
                            Email
                        </label>
                        <input
                            id='email'
                            className={`px-3 py-1 text-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-700 focus:shadow-lg `}
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
                            className={`px-3 py-1 text-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-700 focus:shadow-lg `}
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button type="submit" className="flex gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 ${className} text-lg transition duration-300 my-6"
                            disabled={isSubmitting} >
                            Creat Account
                            {loading ? <div className="h-6 w-6 border-4 border-blue-800 border-t-white rounded-full animate-spin"></div> : null}
                        </button>

                    </div>
                </form>
                <div className=' flex gap-4 items-center'>
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

export default SignUp