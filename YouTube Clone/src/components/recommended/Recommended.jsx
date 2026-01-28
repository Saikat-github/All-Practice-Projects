import React, { useState, useEffect } from 'react'
import thumbnail1 from '../../assets/thumbnail1.png'
// import thumbnail2 from '../../assets/thumbnail2.png'
// import thumbnail3 from '../../assets/thumbnail3.png'
// import thumbnail4 from '../../assets/thumbnail4.png'
// import thumbnail5 from '../../assets/thumbnail5.png'
// import thumbnail6 from '../../assets/thumbnail6.png'
// import thumbnail7 from '../../assets/thumbnail7.png'
// import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { valueConverter, ytAPIKey, splitDuration } from '../../data'
import moment from 'moment';

const Recommended = ({ categoryId }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null)
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${ytAPIKey}`
            await fetch(videoList_url).then((res) => res.json()).then((data) => setData(data.items))
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(null)
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);


    if (error) return <p className='text-red-700 text-center my-10'>{error}</p>
    if (!data) return <div className='h-16 w-16 rounded-full border-8 border-t-blue-600 animate-spin sm:mx-auto'></div>

    return (
        <div className='recommended lg:w-[35%] xl:w-[30%] sm:mx-auto'>
            {data.map((video, idx) => {
                return (
                    <Link to={`/video/${video.snippet.categoryId}/${video.id}`} className='card flex sm:flex-row flex-col mb-4 w-full' key={idx}>
                        <div className='sm:w-1/2 w-full relative'>
                            <img className='w-full h-full sm:rounded-2xl my-2 object-co' src={video ? video.snippet.thumbnails.medium.url : thumbnail1} alt="" />
                            <span className='absolute right-2 bottom-1 text-xs bg-black bg-opacity-50 rounded-md px-1 text-white'>{splitDuration(video.contentDetails.duration)}</span>
                        </div>
                        <div className='flex sm:my-1 ml-2 sm:w-1/2 w-full sm:mt-2'>
                            <div className="vid-info ml-2">
                                <h2 className='sm:text-sm text-xs font-medium text-black dark:text-gray-100'>{video ? video.snippet.title : ""}</h2>
                                <h3 className='sm:text-sm text-xs opacity-80'>{video ? video.snippet.channelTitle : ""}</h3>
                                <p className='sm:text-sm text-xs opacity-80'>{video ? valueConverter(video.statistics.viewCount) : 0} views &bull; {video ? moment(video.snippet.publishedAt).fromNow() : 0}</p>
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

export default Recommended