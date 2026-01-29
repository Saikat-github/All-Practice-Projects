import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 flex flex-col justify-center items-center gap-4 text-white py-10'>
            <div className="logo text-green-700 font-bold text-2xl">
                <span>&lt;</span>
                <span className='text-white'>Pass</span><span>OP</span>
                <span>&gt;</span>
            </div>

            <p className='flex items-center'>Created with <Heart className='w-6 text-red-600 px-1'/> by Saikat Saha</p>
        </div>
    )
}

export default Footer