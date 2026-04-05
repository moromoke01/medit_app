// src/components/VideoCall.jsx
import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { useParams } from "react-router-dom";


const VideoConsult = ({ channelName, role = "host" /* or 'audience' */, onLeave }) => {
  const [joined, setJoined] = useState(false);
  const [localAudio, setLocalAudio] = useState(true);
  const [localVideo, setLocalVideo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const clientRef = useRef(null);
  const localTrackRef = useRef({ videoTrack: null, audioTrack: null });
  const localContainerRef = useRef(null);

  // Helper for creating DOM container for remote user
  const createRemoteContainer = (uid) => {
    const container = document.createElement("div");
    container.id = `remote-player-${uid}`;
    container.style.width = "320px";
    container.style.height = "240px";
    container.style.margin = "8px";
    container.style.background = "#000";
    container.className = "rounded overflow-hidden";
    return container;
  };

  // Join function: requests token from backend and joins channel
  const joinCall = async () => {
    if (!channelName) return alert("Channel name required");

    setLoading(true);
    try {
      // request token from backend
      const resp = await axios.post("http://localhost:5000/api/VideoCall/token", {
        channel: channelName,
        // uid omitted -> server gives one, or send 0
        role: role === "host" ? "publisher" : "subscriber"
      });

      const { token, uid, appId } = resp.data;
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }); // or "h264"
      clientRef.current = client;

      // subscribe to events: when someone publishes, or leaves
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteContainer = document.getElementById(`remote-player-${user.uid}`) || createRemoteContainer(user.uid);
          remoteContainer.id = `remote-player-${user.uid}`;
          document.getElementById("remote-player-list").appendChild(remoteContainer);
          user.videoTrack.play(remoteContainer);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
        setRemoteUsers((prev) => [...prev.filter(u => u.uid !== user.uid), user]);
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          const remoteEl = document.getElementById(`remote-player-${user.uid}`);
          if (remoteEl) remoteEl.remove();
        }
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });

      client.on("user-left", (user) => {
        const remoteEl = document.getElementById(`remote-player-${user.uid}`);
        if (remoteEl) remoteEl.remove();
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });

      // join the channel
      const localUid = await client.join(appId, channelName, token, uid);
      // if host: create local tracks and publish
      if (role === "host") {
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        localTrackRef.current.audioTrack = microphoneTrack;
        localTrackRef.current.videoTrack = cameraTrack;

        // play local video
        const localContainer = localContainerRef.current;
        cameraTrack.play(localContainer);
        await client.publish([microphoneTrack, cameraTrack]);
      }

      setJoined(true);
      setLoading(false);
    } catch (err) {
      console.error("Join call error:", err);
      setLoading(false);
      alert("Failed to join call. See console.");
    }
  };

  // leave and cleanup
  const leaveCall = async () => {
    try {
      const client = clientRef.current;
      if (localTrackRef.current.audioTrack) {
        localTrackRef.current.audioTrack.stop();
        localTrackRef.current.audioTrack.close();
      }
      if (localTrackRef.current.videoTrack) {
        localTrackRef.current.videoTrack.stop();
        localTrackRef.current.videoTrack.close();
      }
      await client?.leave();
      // remove remote video containers
      const containerList = document.getElementById("remote-player-list");
      containerList && (containerList.innerHTML = "");
      setRemoteUsers([]);
      setJoined(false);
      onLeave && onLeave();
    } catch (err) {
      console.error("Error leaving call:", err);
    }
  };

  // toggles
  const toggleAudio = async () => {
    if (!localTrackRef.current.audioTrack) return;
    if (localAudio) {
      await localTrackRef.current.audioTrack.setEnabled(false);
      setLocalAudio(false);
    } else {
      await localTrackRef.current.audioTrack.setEnabled(true);
      setLocalAudio(true);
    }
  };

  const toggleVideo = async () => {
    if (!localTrackRef.current.videoTrack) return;
    if (localVideo) {
      await localTrackRef.current.videoTrack.setEnabled(false);
      setLocalVideo(false);
    } else {
      await localTrackRef.current.videoTrack.setEnabled(true);
      setLocalVideo(true);
    }
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      leaveCall();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Live Consultation — {channelName}</h2>

      <div className="flex gap-6">
        {/* Local */}
        <div>
          <div style={{ width: 320, height: 240, background: "#000" }} ref={localContainerRef} id="local-player" className="rounded overflow-hidden" />
          <div className="mt-2 text-center">
            <button onClick={joined ? leaveCall : joinCall} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">
              {joined ? "Leave" : loading ? "Joining..." : "Join"}
            </button>
            {joined && (
              <>
                <button onClick={toggleAudio} className="px-3 py-1 bg-gray-200 rounded mr-2">
                  {localAudio ? "Mute" : "Unmute"}
                </button>
                <button onClick={toggleVideo} className="px-3 py-1 bg-gray-200 rounded">
                  {localVideo ? "Stop Cam" : "Start Cam"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Remotes */}
        <div id="remote-player-list" style={{ display: "flex", flexWrap: "wrap" }} />
      </div>
    </div>
  );
};

export default VideoConsult;
