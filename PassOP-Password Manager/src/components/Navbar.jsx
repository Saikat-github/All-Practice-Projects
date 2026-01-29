import { Github } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center gap-4 px-4 py-4 bg-slate-800 text-gray-200 sm:px-24'>
            <div className="logo text-green-700 font-bold text-2xl">
                <span>&lt;</span>
                <span className='text-white'>Pass</span><span>OP</span>
                <span>&gt;</span>
            </div>
            <div className='bg-green-700 px-2 py-1 flex gap-1 items-center rounded-full cursor-pointer hover:bg-green-600 transition-all duration-300'>
                <Github className='w-6'/>
                Github
            </div>
        </nav>
    )
}

export default Navbar