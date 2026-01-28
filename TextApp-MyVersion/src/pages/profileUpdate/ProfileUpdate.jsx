import React, { useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import assets from '../../assets/assets';
import { StoreContext } from '../../contexts/ChatContext';
import { deleteFileByUrl, upload } from '../../firebase/upload';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';

const ProfileUpdate = () => {
  const {userData, setUserData, loading, setLoading} = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const prevImage = userData?.avatar;
  const {register, handleSubmit} = useForm({defaultValues : {
    name: userData?.name || "",
    bio: userData?.bio || ""
  }});
  const navigate = useNavigate();

  const profileUpdate = async (data) => {
    if(!prevImage && !data.avatar[0]) {
      toast.error("Please upload Profile Picture")
      return;
    }
    setLoading(true);
    try {
      const userRef = doc(db, 'users', userData.id);
      if(data.avatar[0]) {
        if(userData?.avatar) {
          await deleteFileByUrl(userData.avatar)
        }
        const imgUrl = await upload(data.avatar[0]);
        // setPrevImage(imgUrl);
        await updateDoc(userRef, {
          avatar: imgUrl,
          name: data.name,
          bio: data.bio
        })
      } else {
        await updateDoc(userRef, {
          name: data.name,
          bio: data.bio
        })
      }
      const snap = await getDoc(userRef);
      setUserData(snap.data());
      navigate("/chat")
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false)
  }


  const imagePreview = useMemo(() => image ? URL.createObjectURL(image) : (prevImage ? prevImage : assets.logo_icon), [image, prevImage])

  return (
    <div className="profile min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover flex justify-center items-center">
      <div className="profile-container bg-slate-500 bg-opacity-80 h-1/2 lg:w-1/2 w-full m-10 md:my-0 rounded-md flex flex-col-reverse sm:flex-row sm:p-10 py-10 justify-between items-center">
        <form className='flex flex-col gap-5 w-1/2' onSubmit={handleSubmit(profileUpdate)}>
          <h3 className='text-2xl font-semibold'>Profile Datails</h3>
          <label htmlFor="avatar" className='flex text-sm text-gray-500 items-center gap-2'>
            <img src={imagePreview} className='w-12 h-12 rounded-full' />
            <span className='text-black'>upload profile image</span>
          </label>
          <input type="file" id='avatar' accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("avatar", { onChange: (e) => setImage(e.target.files[0]) })} hidden />


          <input type="text" placeholder='Your name' className='text-sm border-2 rounded px-4 py-1' {...register("name", {
            required: true
          })} />
          <textarea placeholder='Write profile bio' className='text-sm border-2 rounded-sm px-4 py-1' {...register("bio", {
            required: true
          })}></textarea>
          <button type='submit' disabled={loading} className='border border-sky-700 px-4 py-1 roundedl text-white bg-sky-600 hover:bg-opacity-90 flex gap-4 justify-center'>Save
          <div className={`my-auto w-6 h-6 border-2 rounded-full border-x-white border-t-white border-b-transparent animate-spin ${loading ? "block" : "hidden"}`}></div>
          </button>
        </form>
        <img src={imagePreview} className='h-44 w-44 rounded-full' />
      </div>
    </div>
  )
}

export default ProfileUpdate