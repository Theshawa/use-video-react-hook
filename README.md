# React hook for handling videos

**Usage**

```typescript

const videoElement = useRef<HTMLVideoElement>(null);

const {
    handleOnTimeUpdate,
    handleVideoError,
    handleVideoLoaded,
    handleVideoLoadingStart,
    handleVideoProgress,
    handleVideoSpeed,
    playerState,
    stop,
    unmute
    handle
    mute,
    pause,
    play,
  } = useVideo(videoElement);
  
  const SRC = `{{YOUR VIDEO SRC}}`
  

// JSX
 <video
  preload="metadata"
  onLoadStart={handleVideoLoadingStart}
  onLoadedData={handleVideoLoaded}
  onError={handleVideoError}
  onTimeUpdate={handleOnTimeUpdate}
  ref={videoElement}
>
  <source src={SRC} type="video/mp4"></source>
</video>

```
