// // App.jsx
// import { useState, useCallback } from 'react';
// import SearchBar from './components/SearchBar';
// import { fetchVideosByTitle } from './api';

// const App = () => {
//     const [videos, setVideos] = useState([]);
//     const [query, setQuery] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [nextPageToken, setNextPageToken] = useState(null);

//     const handleSearch = useCallback(async (searchQuery) => {
//         setLoading(true);
//         setError(null);
//         setQuery(searchQuery);

//         const { items, nextPageToken } = await fetchVideosByTitle(searchQuery);
//         setVideos(items);
//         setNextPageToken(nextPageToken);
//         setLoading(false);
//     }, []);

//     const loadMore = async () => {
//         setLoading(true);
//         setError(null);

//         const { items, nextPageToken: newPageToken } = await fetchVideosByTitle(query, nextPageToken);
//         setVideos((prevVideos) => [...prevVideos, ...items]);
//         setNextPageToken(newPageToken);
//         setLoading(false);
//     };

//     return query ? (
//         <div>
//             <SearchBar onSearch={handleSearch}/>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching videos.</p>}
//             <div className="video-results">
//                 {videos.map((video) => (
//                     <div key={video.id.videoId} className="video-card">
//                         <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
//                         <h3>{video.snippet.title}</h3>
//                     </div>
//                 ))}
//             </div>
//             {nextPageToken && (
//                 <button onClick={loadMore} disabled={loading}>
//                     Load More
//                 </button>
//             )}
//         </div>
//     ) : null
// };

// export default App;
