import { useState } from 'react'
import { Plus, Eye, EyeOff, Copy, Edit, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const [show, setShow] = useState(false);
    const [passwordArray, setPasswordArray] = useState(localStorage.getItem('savedPassword') ? JSON.parse(localStorage.getItem('savedPassword')) : []);
    const [editId, setEditId] = useState(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    const toggleShow = () => {
        setShow((prev) => !prev)
    }


    const savePassword = (data) => {
        if (editId) {
            const updatedPasswords = passwordArray.map(item => {
                if (item.id === editId) {
                    return { id: editId, ...data };
                } else {
                    return item;
                }
            });
            setPasswordArray(updatedPasswords);
            localStorage.setItem('savedPassword', JSON.stringify(updatedPasswords));
            setEditId(null);
        } else {
            const newPassword = { id: uuidv4(), ...data };
            const updatedPasswords = [...passwordArray, newPassword];
            setPasswordArray(updatedPasswords);
            localStorage.setItem('savedPassword', JSON.stringify(updatedPasswords));
        }
        reset({ website: '', username: '', password: '' });
        toast('Password saved successfully!')
    }


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        navigator.clipboard.writeText(text);
    }


    const deletePassword = (id) => {
        const confirming = confirm("Are you sure you want to delete this password?");
        if (!confirming) return;
        console.log("deleting password with id", id);
        const updatedPasswords = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswords);
        localStorage.setItem('savedPassword', JSON.stringify(updatedPasswords));
        toast('Password deleted!')
    }


    const editPassword = (id) => {
        console.log("editing password with id", id);
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setEditId(id);
        reset(passwordToEdit);
    }






    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold text-center text-green-700 mt-4'>
                <span>&lt;</span>
                <span className='text-black'>Pass</span><span>OP</span>
                <span>&gt;</span>
            </h1>
            <p className='text-green-900 text-lg text-center mb-4'>Your Own Password Manager</p>
            <form onSubmit={handleSubmit(savePassword)} className='text-gray-900 flex flex-col p-4 gap-6 my-2'>
                <input
                    {...register("website", { required: "Website name is required", minLength: { value: 3, message: "Website name must be at least 3 characters" } })}
                    placeholder='Enter website url'
                    type="text" className='border border-green-500 w-full text-black px-4 py-1 rounded-full outline-none bg-white' />

                <div className="flex max-sm:flex-wrap gap-6">
                    <input
                        {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                        placeholder='Enter username' type="text" className='border border-green-500 w-full text-black px-4 py-1 rounded-full outline-none bg-white' />

                    <div className='relative border border-green-500 w-full text-black px-4 py-1 rounded-full bg-white flex' >
                        <input
                            {...register("password", { required: "Password is required", minLength: { value: 3, message: "Password must be at least 3 characters" } })}
                            placeholder='Enter password' type={show ? "text" : "password"}
                            className='outline-none' />
                        {
                            show
                                ?
                                <Eye onClick={toggleShow} className='absolute right-2 text-gray-600 w-5 cursor-pointer' />
                                :
                                <EyeOff onClick={toggleShow} className='absolute right-2 text-gray-600 w-5 cursor-pointer' />
                        }
                    </div>
                </div>
                {
                    (errors.website || errors.username || errors.password)
                    &&
                    <div className='text-center border border-red-500 bg-red-200 text-red-600 p-2 mx-auto rounded '>
                        <p>*{errors.website.message}</p>
                        <p>*{errors.username.message}</p>
                        <p>*{errors.password.message}</p>
                    </div>
                }

                <button type='submit' className='flex justify-center items-center gap-1 px-3 py-1 bg-green-600 rounded-full w-fit mx-auto hover:bg-green-400 transition-all duration-300 cursor-pointer'>
                    <Plus />
                    Save Password</button>
            </form>

            <div>
                <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>
                {
                    passwordArray.length === 0
                        ?
                        <div className='text-green-800 text-center text-lg font-medium'>No passwords to show!</div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table-auto rounded-md overflow-hidden bg-green-100 w-full min-w-[600px] border border-green-600">
                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2'>Website</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Passwords</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {passwordArray.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className='min-w-32 px-2 text-center py-2 border border-green-600 '>
                                                <a 
                                                className='hover:underline'
                                                href={item.website} target='_blank'>{item.website}</a>
                                            </td>

                                            <td className='min-w-32 px-2 text-center py-2 border border-green-600'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    {item.username}
                                                    <Copy
                                                        className='w-4 cursor-pointer hover:opacity-75 transition-all duration-200'
                                                        onClick={() => copyText(item.username)}
                                                    />
                                                </div>
                                            </td>

                                            <td className='min-w-32 px-2 text-center py-2 border border-green-600'>
                                                <div className='flex items-center justify-center gap-1'>
                                                   <input 
                                                   className='outline-none'
                                                   type="password"
                                                   value={item.password} />
                                                    <Copy
                                                        className='w-4 cursor-pointer hover:opacity-75 transition-all duration-200'
                                                        onClick={() => copyText(item.password)}
                                                    />
                                                </div>
                                            </td>

                                            <td className='min-w-32 px-2 text-center py-2 border border-green-600'>
                                                <div className='flex items-center justify-center gap-3'>
                                                    <Edit
                                                        className='w-4 cursor-pointer hover:opacity-75 transition-all duration-200'
                                                        onClick={() => editPassword(item.id)}
                                                    />
                                                    <Trash2
                                                        className='w-4 cursor-pointer hover:opacity-75 transition-all duration-200'
                                                        onClick={() => deletePassword(item.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                }
            </div>
        </div>
    )
}

export default Manager