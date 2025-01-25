"use client";

import { useState, useEffect, useRef } from "react";

export default function LoadingAnimations({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [video1Loaded, setVideo1Loaded] = useState(false);
  const [video2Loaded, setVideo2Loaded] = useState(false);

  // Handle video sequence
  useEffect(() => {
    const playAnimation = async (video: HTMLVideoElement): Promise<void> => {
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
        throw err;
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
        setVideoLoadError(true);
        onComplete();
      }
    };

    if (video1Loaded && video2Loaded) {
      loadAndPlayAnimations();
    }
  }, [onComplete, video1Loaded, video2Loaded]);

  const handleVideoError = (videoNumber: number) => {
    console.error(`Error loading video ${videoNumber}`);
    setVideoLoadError(true);
    onComplete();
  };

  if (videoLoadError) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <video
          ref={video1Ref}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideo1Loaded(true)}
          onError={() => handleVideoError(1)}
        >
          <source src="/animation 1.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            currentAnimation === 2 ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideo2Loaded(true)}
          onError={() => handleVideoError(2)}
        >
          <source src="/animation 2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
