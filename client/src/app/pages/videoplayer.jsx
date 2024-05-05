"use client"
import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
   const videoRef = useRef(null);
   const src = "https://hhld-classes.s3.ap-south-1.amazonaws.com/output/test_mp4_master.m3u8";

   useEffect(() => {
       const video = videoRef.current;

       if (Hls.isSupported()) {
           console.log("HLS is supported");
               console.log(src);
               const hls = new Hls();
               hls.attachMedia(video);
               hls.loadSource(src);
               hls.on(Hls.Events.MANIFEST_PARSED, function () {
                   console.log("playing video");
                   video.play();
               });
       } else {
           console.log('HLS is not supported');
           // Play from the original video file
       }
   }, [src]);

   return <video ref={videoRef} controls />;
};

export default VideoPlayer;

