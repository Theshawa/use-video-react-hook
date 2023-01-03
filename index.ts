import { RefObject, useCallback, useEffect, useState } from "react";

export const useVideo = (videoElement: RefObject<HTMLVideoElement>) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const play = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    handleVideoProgress(0);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const supportPlaying = useCallback(async () => {
    if (!videoElement.current) return;
    if (isPlaying) {
      try {
        await videoElement.current.play();
      } catch (error) {
        setIsPlaying(false);
        setError(true);
      }
    } else {
      videoElement.current.pause();
    }
  }, [videoElement, isPlaying]);

  useEffect(() => {
    supportPlaying();
  }, [supportPlaying]);

  const handleOnTimeUpdate = () => {
    if (!videoElement.current) return;
    const progress =
      (videoElement.current.currentTime / videoElement!.current!.duration) *
      100;
    setProgress(progress);
  };

  const handleVideoProgress = (value: number) => {
    if (!videoElement.current) return;
    const manualChange = value;
    if (manualChange > 0) {
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
    } else {
      videoElement.current.currentTime = 0;
    }

    setProgress(manualChange);
  };

  const handleVideoSpeed = (value: number) => {
    if (!videoElement.current) return;
    const speed = value;
    videoElement.current.playbackRate = speed;
    setSpeed(speed);
  };

  const handleVideoError = () => {
    stop();
    setError(true);
    setLoading(false);
  };

  const handleVideoLoadingStart = () => {
    pause();
    setError(false);
    setLoading(true);
  };

  const handleVideoLoaded = () => {
    play();
    setError(false);
    setLoading(false);
  };

  const mute = () => {
    setIsMuted(true);
  };
  const unmute = () => {
    setIsMuted(false);
  };

  useEffect(() => {
    if (!videoElement.current) return;
    if (videoElement.current) {
      isMuted
        ? (videoElement.current.muted = true)
        : (videoElement.current.muted = false);
    }
  }, [isMuted, videoElement]);

  return {
    playerState: {
      error,
      loading,
      isPlaying,
      progress,
      speed,
      isMuted,
    },
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    mute,
    unmute,
    handleVideoLoadingStart,
    handleVideoError,
    handleVideoLoaded,
    play,
    pause,
    stop,
  };
};
