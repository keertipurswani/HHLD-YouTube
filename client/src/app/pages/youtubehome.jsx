"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios"
import dynamic from 'next/dynamic'
import NavBar from '../components/navbar';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const YouTubeHome = () => {
   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
       const getVideos = async () => {
           try {
               const res = await axios.get('http://localhost:8082/watch/home');
               console.log(res);
               setVideos(res.data);
               setLoading(false); // Set loading to false when videos are fetched
           } catch (error) {
               console.log('Error in fetching videos : ', error);
               setLoading(false);
           }
       }
       getVideos();

   }, []);

   return (
       <div>
            <NavBar/>
           {loading ? (
               <div className='container mx-auto flex justify-center items-center h-screen'>Loading...</div>
           ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
                   {videos.map(video => (
                       <div key={video.id}
                           className="border rounded-md overflow-hidden">
                           <div>
                               <ReactPlayer url={video.url}
                                   width="360px"
                                   height="180px"
                                   controls={true}
                               />
                           </div>
                           <div className="p-4">
                               <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                               <p className="text-gray-700">Author - {video.author}</p>
                               <p className="text-gray-700">{video.description}</p>
                           </div>
                       </div>
                   ))}
               </div>
           )}
       </div>
   );
};

export default YouTubeHome;
