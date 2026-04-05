// src/components/VideoCallWrapper.jsx
import React from "react";
import { useParams } from "react-router-dom";
import VideoConsult from "./VideoConsult";

const VideoCallWrapper = () => {
  // get channel from URL, e.g., /video/:channel
  const { channel } = useParams();

  // optional: handle when user leaves
  const handleLeave = () => {
    console.log("Left the video call");
  };

  return (
    <div className="p-4">
      <VideoConsult
        channelName={channel}
        role="host" // or 'audience' depending on the user
        onLeave={handleLeave}
      />
    </div>
  );
};

export default VideoCallWrapper;
