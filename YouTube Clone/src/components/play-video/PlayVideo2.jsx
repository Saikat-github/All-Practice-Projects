// import React, { useEffect, useState } from 'react'

// import like from '../../assets/like.png'
// import dislike from '../../assets/dislike.png'
// import share from '../../assets/share.png'
// import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
// import user_profile from '../../assets/user_profile.jpg';
// import { valueConverter, ytAPIKey } from '../../data'
// import moment from 'moment';
// import { useParams } from 'react-router-dom';


// const PlayVideo = () => {
//     const { videoId } = useParams()
//     const [apiData, setApiData] = useState(null); // Set initial state to null
//     const [channelData, setChannelData] = useState();
//     const [commentData, setCommentData] = useState([])
//     const [showComments, setShowComments] = useState(true);
//     const [showDesc, setShowDesc] = useState(false);


//     useEffect(() => {
//         const fetchVideoData = async () => {
//             try {
//                 const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${ytAPIKey}`;
//                 const response = await fetch(videoDetailsUrl);
//                 const data = await response.json();
//                 setApiData(data.items[0]);
//             } catch (error) {
//                 console.error('Error fetching video data:', error);
//             }
//         };

//         fetchVideoData();
//     }, [videoId]);

//     useEffect(() => {
//         if (apiData?.snippet?.channelId) {
//             const fetchOtherData = async () => {
//                 try {
//                     const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${ytAPIKey}`;
//                     const channelResponse = await fetch(channelDataUrl);
//                     const channelResult = await channelResponse.json();
//                     setChannelData(channelResult.items[0]);

//                     const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=70&videoId=${videoId}&key=${ytAPIKey}`;
//                     const commentResponse = await fetch(commentUrl);
//                     const commentResult = await commentResponse.json();
//                     setCommentData(commentResult.items);
//                 } catch (error) {
//                     console.error('Error fetching other data:', error);
//                 }
//             };

//             fetchOtherData();
//         }
//     }, [apiData, videoId]);

//     return (
//         <div className="play-video lg:w-[63%]">
//             <iframe
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerPolicy="strict-origin-when-cross-origin"
//                 allowFullScreen
//                 className="w-full sm:h-[70vh] h-[40vh] sm:rounded-xl"
//             ></iframe>
//             <h3 className="mt-3 mx-2 sm:mx-0 font-semibold sm:text-xl text-sm">
//                 {apiData?.snippet?.title || "Title Here"}
//             </h3>
//             <div className="play-video-info flex items-center sm:justify-between flex-wrap mt-3 text-sm text-gray-600 sm:flex-nowrap">
//                 <div className="publisher flex justify-between w-full sm:w-auto mx-2 my-2 sm:mx-0">
//                     <div className=" flex gap-2">
//                         <img src={channelData?.snippet?.thumbnails.medium?.url || jack} alt="" className="h-10 rounded-full" />
//                         <div>
//                             <p className="font-semibold text-black text-xs sm:text-sm dark:text-white">
//                                 {apiData?.snippet?.channelTitle || "None"}
//                             </p>
//                             <span className="dark:text-white dark:opacity-80 text-xs">{channelData ? valueConverter(channelData.statistics.subscriberCount) : 0} <span>Subscribers</span></span>
//                         </div>
//                     </div>
//                     <button className="px-2 md:px-4 font-semibold bg-gray-200 rounded-full hover:bg-gray-300 text-black sm:ml-2 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
//                         Subscribe
//                     </button>
//                 </div>
//                 <div className="w-full sm:w-auto flex justify-between my-2 mx-2 sm:mx-0 sm:justify-normal">
//                     <span className="inline-flex items-center sm:px-4 px-2 sm:py-2 py-1 sm:ml-4 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer text-xs sm:text-sm dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
//                         <img src={like} className="w-5 mr-2" alt="" />
//                         {apiData?.statistics?.likeCount ? valueConverter(apiData.statistics.likeCount) : 0}
//                     </span>
//                     <span className="inline-flex items-center sm:px-4 px-2 sm:py-2 py-1 sm:ml-4 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 ">
//                         <img src={dislike} className="w-5 mr-2" alt="" />
//                     </span>
//                     <span className="inline-flex items-center sm:px-4 px-2 sm:py-2 py-1 sm:ml-4 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-xs sm:text-sm">
//                         <img src={share} className="w-5 mr-2" alt="" />
//                         Share
//                     </span>
//                     <span className="inline-flex items-center sm:px-4 px-2 sm:py-2 py-1 sm:ml-4 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-xs sm:text-sm">
//                         <img src={save} className="w-5 mr-2" alt="" />
//                         Save
//                     </span>
//                 </div>
//             </div>
//             <hr className="h-[1px] bg-slate-900 my-3 sm:mx-0 mx-2" />

//             <div className="description sm:text-sm text-xs sm:mx-0 mx-2">
//                 <div className="desc-details mb-2">
//                     <p className="font-semibold text-gray-700 dark:text-white">
//                         {apiData?.statistics?.viewCount ? valueConverter(apiData.statistics.viewCount) : 0} views &bull;{" "}
//                         {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : ""}
//                     </p>
//                     <p className='cursor-pointer' onClick={() => setShowDesc((prev) => !prev)}>{showDesc ? "show less..." : "more..."}</p>
//                     <p className={showDesc ? "" : "hidden"}>{apiData?.snippet?.description || ""}</p>
//                 </div>
//                 <hr />
//                 <h4 onClick={() => setShowComments((prev) => !prev)} className="my-4 sm:text-xl text-sm cursor-pointer">{apiData?.statistics?.commentCount ? valueConverter(apiData.statistics.commentCount) : 0} Comments</h4>


//                 {/* Render comments dynamically */}
//                 {commentData?.map((item, idx) => (
//                     <div className={`comment ${showComments ? "flex" : "hidden"} gap-2 mb-4 w-2/3`} key={idx}>
//                         <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl ? item.snippet.topLevelComment.snippet.authorProfileImageUrl : user_profile} alt="" className="h-8 rounded-full" />
//                         <div>
//                             <h3 className="font-semibold text-gray-700 dark:text-white">
//                                 {item.snippet.topLevelComment.snippet.authorDisplayName} <span className="text-gray-500 text-xs">{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
//                             </h3>
//                             <p>
//                                 {item.snippet.topLevelComment.snippet.textOriginal}
//                             </p>
//                             <div className="comment-action flex my-1 items-center">
//                                 <img src={like} alt="" className="h-6" />
//                                 <span className="ml-2">{item.snippet.topLevelComment.snippet.likeCount}</span>
//                                 <img src={dislike} alt="" className="h-6 ml-2" />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PlayVideo;
