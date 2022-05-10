import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const VideoClass =(props) =>{
  const CAMERA_CONSTRAINTS = {
    audio: true,
    video: true,
  };
  const SCREEN_CONSTRAINTS = {
    audio: true,
    video: true,
  };
  const [connected, setConnected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamKey, setStreamKey] = useState(null);
  const [textOverlay, setTextOverlay] = useState("Live Stream");
  const [screenconnected, setsetScreenConnected] = useState(false);
  const [screenEnabled, setScreenEnabled] = useState(false);
  const [screenstreaming, setScreenStreaming] = useState(false);

  const inputStreamRef = useRef();
  const voiceRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const wsRef = useRef();
  const mediaRecorderRef = useRef();
  const requestAnimationRef = useRef();
  const nameRef = useRef();

  const stopcallStreaming = async () => {
    const stream = inputStreamRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ws = wsRef.current;
    const mediaRecorder = mediaRecorderRef.current;
    const requestAnimation = requestAnimationRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (video) {
      video.srcObject = null;
    }
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    if (ws) {
      ws.close();
    }
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (requestAnimation) {
      cancelAnimationFrame(requestAnimation);
    }
    setScreenStreaming(false);
    setsetScreenConnected(false);
    setScreenEnabled(false);
    setStreamKey(null);
    setStreaming(false);
    setConnected(false);
    setCameraEnabled(false);
    setStreamKey(null);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (video) {
      video.srcObject = null;
    }
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    if (ws) {
      ws.close();
    }
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (requestAnimation) {
      cancelAnimationFrame(requestAnimation);
    }
  };
  const screenRecord = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getDisplayMedia(
      SCREEN_CONSTRAINTS
    );
    voiceRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateScreenCanvas);

    setScreenEnabled(true);
  };
  const stopEnableCameras = async () => {
    const stream = inputStreamRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ws = wsRef.current;
    const mediaRecorder = mediaRecorderRef.current;
    const requestAnimation = requestAnimationRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (video) {
      video.srcObject = null;
    }
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    if (ws) {
      ws.close();
    }
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (requestAnimation) {
      cancelAnimationFrame(requestAnimation);
    }
    setScreenStreaming(false);
    setsetScreenConnected(false);
    setScreenEnabled(false);
    setStreamKey(null);
    setStreaming(false);
    setConnected(false);
    setCameraEnabled(false);
    setStreamKey(null);
  };
  const updateScreenCanvas = () => {
    if (videoRef.current.ended || videoRef.current.paused) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    ctx.fillStyle = "#FB3C4E";
    ctx.font = "50px Akkurat";
    ctx.fillText(nameRef.current, 10, 50, canvasRef.current.width - 20);

    requestAnimationRef.current = requestAnimationFrame(updateScreenCanvas);
  };

  const stopScreenStreaming = () => {
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setScreenStreaming(false);
  };

  const startScreenStreaming = () => {
    setScreenStreaming(true);

    const protocol = window.location.protocol.replace("http", "ws");
    const wsUrl = `${protocol}//localhost:5004/rtmp?key=${streamKey}`;
    wsRef.current = new WebSocket(wsUrl);
    wsRef.current.addEventListener("open", function open() {
      setsetScreenConnected(true);
    });

    wsRef.current.addEventListener("close", () => {
      setsetScreenConnected(false);
      stopScreenStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS
    // Let's do some extra work to get audio to join the party.
    // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
    const audioStream = new MediaStream();
    const audioTracks = voiceRef.current.getAudioTracks();
    audioTracks.forEach(function (track) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 3000000,
    });

    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      wsRef.current.send(e.data);
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      stopScreenStreaming();
      wsRef.current.close();
    });

    mediaRecorderRef.current.start(1000);
  };

  const enableCamera = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);

    setCameraEnabled(true);
  };

  const updateCanvas = () => {
    if (videoRef.current.ended || videoRef.current.paused) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    ctx.fillStyle = "#FB3C4E";
    ctx.font = "50px Akkurat";
    ctx.fillText(nameRef.current, 10, 50, canvasRef.current.width - 20);

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  };

  const stopStreaming = () => {
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setStreaming(false);
  };

  const startStreaming = () => {
    setStreaming(true);

    const protocol = window.location.protocol.replace("http", "ws");
    const wsUrl = `${protocol}//localhost:5004/rtmp?key=${streamKey}`;
    wsRef.current = new WebSocket(wsUrl);
    wsRef.current.addEventListener("open", function open() {
      setConnected(true);
    });

    wsRef.current.addEventListener("close", () => {
      setConnected(false);
      stopStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS
    // Let's do some extra work to get audio to join the party.
    // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
    const audioStream = new MediaStream();
    const audioTracks = inputStreamRef.current.getAudioTracks();
    audioTracks.forEach(function (track) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 3000000,
    });

    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      wsRef.current.send(e.data);
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      stopStreaming();
      wsRef.current.close();
    });

    mediaRecorderRef.current.start(1000);
  };

  const mute = () => {
    if (inputStreamRef.current.getAudioTracks().length > 0) {
      inputStreamRef.current.getAudioTracks()[0].enabled = false;
    }
  };
  const unmute = () => {
    if (inputStreamRef.current.getAudioTracks().length > 0) {
      inputStreamRef.current.getAudioTracks()[0].enabled = true;
    }
  };
  useEffect(() => {
    nameRef.current = textOverlay;
  }, [textOverlay]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, []);
  useEffect(() => {
    props.enableVideo ? enableCamera() : stopEnableCameras();
  }, [props.enableVideo]);

  useEffect(() => {
    if (props.screenSharing) {
      screenRecord();
    }
  }, [props.screenSharing]);

  // useEffect(() => {
  //   props.enableMic ? unmute() : mute();
  // }, [props.enableMic]);

  return (
    <div className={`${props.smallLayout ? "small-vid" : "videoLayout"}`}>
      <video ref={videoRef} muted playsInline></video>
       <button onClick={unmute}>Enable mic</button>
          <button onClick={mute}>Disable mic</button>
    </div>
  );
}

export default VideoClass;
