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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkVideoLoading = () => {
      timeoutId = setTimeout(() => {
        // If videos haven't loaded within 5 seconds, proceed to login
        if (!video1Loaded || !video2Loaded) {
          console.log("Video loading timeout - proceeding to login");
          onComplete();
        }
      }, 5000);
    };

    checkVideoLoading();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete, video1Loaded, video2Loaded]);

  useEffect(() => {
    const playAnimation = async (video: HTMLVideoElement) => {
      try {
        await video.play();
        return new Promise<void>((resolve) => {
          video.onended = () => resolve();
        });
      } catch (err) {
        console.error("Video playback error:", err);
        onComplete(); // Proceed to login if video fails to play
        return Promise.reject(err);
      }
    };

    const loadAndPlayAnimations = async () => {
      try {
        if (video1Ref.current && video2Ref.current) {
          // Play animations sequentially
          if (video1Loaded) {
            await playAnimation(video1Ref.current);
            setCurrentAnimation(2);
            if (video2Loaded) {
              await playAnimation(video2Ref.current);
            }
          }
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

  const handleVideoError = () => {
    setVideoLoadError(true);
    onComplete();
  };

  if (videoLoadError) {
    return null; // Proceed to login immediately if videos fail to load
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <video
        ref={video1Ref}
        className={`object-cover ${
          currentAnimation === 1 ? "block" : "hidden"
        }`}
        src="/animation 1.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideo1Loaded(true)}
        onError={handleVideoError}
      />
      <video
        ref={video2Ref}
        className={`object-cover ${
          currentAnimation === 2 ? "block" : "hidden"
        }`}
        src="/animation 2.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideo2Loaded(true)}
        onError={handleVideoError}
      />
    </div>
  );
}
