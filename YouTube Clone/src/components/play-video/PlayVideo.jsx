import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { valueConverter, ytAPIKey } from '../../data';

const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVideoData = useCallback(async () => {
        setError(null)
        try {
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${ytAPIKey}`;
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData?.snippet?.channelId}&key=${ytAPIKey}`;
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${ytAPIKey}`;

            const [videoResponse, channelResponse, commentResponse] = await Promise.all([
                fetch(videoDetailsUrl),
                apiData?.snippet?.channelId && fetch(channelDataUrl),
                fetch(commentUrl),
            ]);

            const videoResult = await videoResponse.json();
            const channelResult = channelResponse ? await channelResponse.json() : null;
            const commentResult = await commentResponse.json();

            setApiData(videoResult.items[0]);
            setChannelData(channelResult?.items[0] || null);
            setCommentData(commentResult.items);
        } catch (error) {
            setError('Error fetching data');
            console.error('Error fetching video data:', error);
        } finally {
            setLoading(false);
        }
    }, [videoId, apiData?.snippet?.channelId]);

    useEffect(() => {
        fetchVideoData();
    }, [fetchVideoData]);



    const toggleDescription = useCallback(() => setShowDesc((prev) => !prev), []);
    const toggleComments = useCallback(() => setShowComments((prev) => !prev), []);

    if (loading) return <div className='text-center text-3xl h-screen'>Loading...</div>;
    if (error) return <p className='text-red-700 text-center my-10'>{error}</p>;

    const { snippet, statistics } = apiData || {};
    const { thumbnails, channelTitle, publishedAt, description } = snippet || {};

    return (
        <div className="play-video lg:w-[63%]">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full sm:h-[70vh] h-[30vh] sm:rounded-xl"
            ></iframe>
            <h3 className="my-2 mx-2 sm:mx-0 font-semibold sm:text-xl text-sm">
                {snippet?.title || 'Title Here'}
            </h3>
            <p className="sm:hidden text-xs text-gray-700 dark:text-stone-400 mx-2">
                {valueConverter(statistics?.viewCount)} views &bull; {moment(publishedAt).fromNow()}
            </p>
            <div className="play-video-info flex items-center sm:justify-between flex-wrap mt-2 text-sm text-gray-600 sm:flex-nowrap">
                <div className="publisher flex justify-between w-full sm:w-auto mx-2 my-2 sm:mx-0">
                    <div className=" flex gap-2">
                        <img
                            src={channelData?.snippet?.thumbnails?.medium?.url || jack}
                            alt=""
                            className="h-10 rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-black text-xs sm:text-sm dark:text-white">
                                {channelTitle || 'None'}
                            </p>
                            <span className="dark:text-white dark:opacity-80 text-xs">
                                {channelData ? valueConverter(channelData.statistics.subscriberCount) : 0}{' '}
                                <span>Subscribers</span>
                            </span>
                        </div>
                    </div>
                    <button className="px-2 md:px-4 font-semibold bg-gray-200 rounded-full hover:bg-gray-300 text-black sm:ml-2 dark:bg-stone-900 dark:text-white dark:hover:bg-stone-800">
                        Subscribe
                    </button>
                </div>
                <div className="w-full sm:w-auto flex justify-between my-2 mx-2 sm:mx-0 sm:justify-normal">
                    {[
                        { src: like, label: valueConverter(statistics?.likeCount), alt: 'Like' },
                        { src: dislike, label: '', alt: 'Dislike' },
                        { src: share, label: 'Share', alt: 'Share' },
                        { src: save, label: 'Save', alt: 'Save' },
                    ].map(({ src, label, alt }, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center sm:px-4 px-2 sm:py-2 py-1 sm:ml-4 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer dark:bg-stone-900 dark:text-white dark:hover:bg-stone-800 text-xs sm:text-sm"
                        >
                            <img src={src} className="w-5 mr-2" alt={alt} />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
            <hr className="h-[1px] bg-slate-900 my-3 sm:mx-0 mx-2" />

            <div className="description sm:text-sm text-xs sm:mx-0 mx-2">
                <div className="desc-details mb-2">
                    <p className="hidden sm:block text-sm text-gray-700 dark:text-stone-400">
                        {valueConverter(statistics?.viewCount)} views &bull; {moment(publishedAt).fromNow()}
                    </p>
                    <p className="cursor-pointer text-gray-700 dark:text-stone-400" onClick={toggleDescription}>
                        {showDesc ? 'show less...' : 'more...'}
                    </p>
                    {showDesc && <p className='text-xs dark:text-gray-100'>{description}</p>}
                </div>
               
                <div className='bg-gray-200 dark:bg-stone-900 p-2 rounded-lg'>
                    <h4 onClick={toggleComments} className="sm:text-lg text-xs cursor-pointer block sm:hidden my-1">
                        {valueConverter(statistics?.commentCount)} Comments ...
                    </h4>

                    {/* Render comments dynamically */}
                    {showComments && commentData?.map((item, idx) => (
                        <Comment key={idx} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Comment = ({ item }) => {
    const {
        snippet: {
            topLevelComment: {
                snippet: { authorProfileImageUrl, authorDisplayName, publishedAt, textOriginal, likeCount },
            },
        },
    } = item;

    return (
        <div className="comment flex gap-2 mb-4 w-2/3">
            <img
                src={authorProfileImageUrl || user_profile}
                alt=""
                className="h-8 rounded-full"
            />
            <div>
                <h3 className="font-semibold text-gray-700 dark:text-white">
                    {authorDisplayName}{' '}
                    <span className="opacity-75 text-xs font-normal ml-1">{moment(publishedAt).fromNow()}</span>
                </h3>
                <p>{textOriginal}</p>
                <div className="comment-action flex my-1 items-center">
                    <img src={like} alt="" className="sm:h-6 h-4" />
                    <span className="ml-2">{likeCount}</span>
                    <img src={dislike} alt="" className="sm:h-6 h-4 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default PlayVideo;
