// SearchBar.jsx
import { useState, useEffect, useCallback } from 'react';
import search_icon from '../../assets/search.png'
import { useContext } from 'react';
import { SetContext } from '../../contexts/setContext'
import { valueConverter, ytAPIKey, splitDuration } from '../../data'
import crossIcon from '../../assets/cross2.svg'


const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState(null);
    const { setVideos } = useContext(SetContext)
    const [error, setError] = useState(null);


    // const handleSearch = useCallback(async (searchQuery) => {
    //     setLoading(true);
    //     setQuery(searchQuery);
    //     try {
    //         const { items, nextPageToken } = await fetchVideosByTitle(searchQuery);
    //         console.log(items);
    //         setVideos(items);
    //         setNextPageToken(nextPageToken);
    //     } catch (error) {
    //         setError(error)
    //     } finally {
    //         setLoading(false);
    //     }

    // }, []);

    // const loadMore = async () => {
    //     setLoading(true);
    //     setError(null);

    //     const { items, nextPageToken: newPageToken } = await fetchVideosByTitle(query, nextPageToken);
    //     setVideos((prevVideos) => [...prevVideos, ...items]);
    //     setNextPageToken(newPageToken);
    //     setLoading(false);
    // };


    // Debounce user input to limit API calls
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (query.trim()) {
    //             handleSearch(query);
    //         }
    //     }, 500); // Waits 500ms after user stops typing

    //     return () => clearTimeout(timer);
    // }, [query, handleSearch]);
    const url = query ? `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${ytAPIKey}` : null;

    const handleSearch = () => {
        setLoading(true);
        setError(null);
        if (!url) return;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const video = data.items[0];  // Access the first result
                    console.log('Video ID:', video.id.videoId);
                    console.log('Video Title:', video.snippet.title);
                    console.log('Video Description:', video.snippet.description);
                    console.log(video)
                } else {
                    console.log('No video found with that title.');
                }
            })
            .catch((error) => {
                console.error('Error:', error)
                setError(error)
            }
            )
            .finally(() => setLoading(false));
    }



    return (
        <div className="search-box flex items-center border border-gray-400 
        sm:mr-4 mr-1 py-2 px-3 rounded-full dark:border-gray-150 dark:bg-transparent">
            <input type="text" placeholder='Search' className='md:w-[400px] border-none outline-none bg-transparent text-xs md:text-sm'
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            <img src={crossIcon} className={`w-4 mr-2 cursor-pointer ${query ? 'inline' : "hidden"}`} onClick={() => setQuery("")} alt="" />
            {loading ? <div className='w-6 h-6 border-2 border-t-black  rounded-full animate-spin'></div> : <img src={search_icon} alt="" className='sm:h-6 h-4 pr-1 sm:pr-0 cursor-pointer' onClick={handleSearch}/>}
        </div>
    );
};

export default SearchBar;
