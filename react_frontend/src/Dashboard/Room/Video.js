import { styled } from "@mui/system";
import React, { useEffect, useRef } from "react";

const MainContainer = styled('div')({
  height: '50%',
  width: '50%',
  backgroundColor: 'black',
  borderRadius: '8px',
});

const VideoE1 = styled('video')({
  width: '100%',
  height: '100%',
});

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream; // Corrected typo here
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <MainContainer>
      <VideoE1 ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </MainContainer>
  );
};

export default Video;
