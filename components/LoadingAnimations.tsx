"use client";

import { useState, useEffect, useRef } from "react";

interface LoadingAnimationsProps {
  onComplete: () => void;
}

export default function LoadingAnimations({
  onComplete,
}: LoadingAnimationsProps) {
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [video1Loaded, setVideo1Loaded] = useState(false);
  const [video2Loaded, setVideo2Loaded] = useState(false);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!video1Loaded || !video2Loaded) {
        console.log("Video loading timeout - proceeding to login");
        onComplete();
      }
    }, 5000);

    return () => clearTimeout(loadTimeout);
  }, [onComplete, video1Loaded, video2Loaded]);

  useEffect(() => {
    const playAnimation = async (video: HTMLVideoElement) => {
      try {
        if (video.readyState >= 2) {
          await video.play();
          return new Promise<void>((resolve) => {
            video.onended = () => resolve();
          });
        } else {
          throw new Error("Video not ready to play");
        }
      } catch (err) {
        console.error("Video playback error:", err);
        return Promise.reject(err);
      }
    };

    const loadAndPlayAnimations = async () => {
      try {
        if (video1Ref.current && video2Ref.current) {
          await playAnimation(video1Ref.current);
          setCurrentAnimation(2);
          await playAnimation(video2Ref.current);
          onComplete();
        }
      } catch (err) {
        console.error("Animation sequence error:", err);
        onComplete();
      }
    };

    if (video1Loaded && video2Loaded) {
      loadAndPlayAnimations();
    }
  }, [onComplete, video1Loaded, video2Loaded]);

  const handleVideoError = (
    videoNumber: number,
    error: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error(`Error loading video ${videoNumber}:`, error);
    setVideoLoadError(true);
    onComplete();
  };

  const handleVideoLoad = (videoNumber: number) => {
    console.log(`Video ${videoNumber} loaded successfully`);
    if (videoNumber === 1) {
      setVideo1Loaded(true);
    } else {
      setVideo2Loaded(true);
    }
  };

  useEffect(() => {
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Video 1 path:", "/animation 1.mp4");
    console.log("Video 2 path:", "/animation 2.mp4");
  }, []);

  if (videoLoadError) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <video
        ref={video1Ref}
        className={`max-w-full max-h-full object-contain ${
          currentAnimation === 1 ? "block" : "hidden"
        }`}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => handleVideoLoad(1)}
        onError={(e) => handleVideoError(1, e)}
      >
        <source src="/animation 1.mp4" type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        className={`max-w-full max-h-full object-contain ${
          currentAnimation === 2 ? "block" : "hidden"
        }`}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => handleVideoLoad(2)}
        onError={(e) => handleVideoError(2, e)}
      >
        <source src="/animation 2.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
