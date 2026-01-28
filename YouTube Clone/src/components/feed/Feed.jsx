import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { valueConverter, ytAPIKey, splitDuration } from '../../data'
import moment from 'moment';
import { SetContext } from '../../contexts/setContext'


const Feed = () => {
    const { sidebar, category, videos, setVideos } = useContext(SetContext)
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null)
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${ytAPIKey}`;
            const response = await fetch(videoList_url);
            const result = await response.json();
            setVideos(result.items);
        } catch (error) {
            console.error('Error fetching data:', error);
            setVideos(null)
            setError(error.message);
        }
    };



    useEffect(() => {
        fetchData()
    }, [category, videos]);



    if (error) return <p className='text-red-700 text-center my-10'>{error}</p>
    if (!videos) return (<div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-48"></div>
    </div>)

    return (
        <div className={`feed grid grid-cols-1 min-[520px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7 gap-x-6 sm:gap-y-14 gap-y-8 sm:mx-10 ${sidebar ? "opacity-70" : ""} `}>
            {videos?.map((item, idx) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card' key={idx}>
                        <div className='relative'>
                            <img className='w-full sm:rounded-2xl' src={item.snippet.thumbnails.medium.url} alt="" />
                            <span className='absolute right-2 bottom-1 text-xs bg-black bg-opacity-50 rounded-md px-1 text-white '>{splitDuration(item.contentDetails.duration)}</span>
                        </div>

                        <div className='flex gap-2  mt-4 mx-2 sm:mx-0'>
                            <img className='w-8 h-8 object-cover rounded-full' src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className='flex flex-col gap-1 px-2'>
                                <h2 className='text-xs sm:text-sm font-medium text-black mb-1 dark:bg-black dark:text-white'>{item.snippet.title}</h2>
                                <h3 className='text-xs opacity-80'>{item.snippet.channelTitle}</h3>
                                <p className='text-xs opacity-80'>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                            </div>
                        </div>

                        {/* <img src={thumbnail1} alt="" className='rounded-xl w-[40%]' />
                        <div className="vid-info">
                            <h2 className='text-sm font-medium text-black my-1'>Best channel to learn coding that help you to be a web developer</h2>
                            <h3 className='text-sm opacity-80'>Greatstack</h3>
                            <p className='text-sm opacity-80'>15k views &bull; 2 days ago</p>
                        </div> */}
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed