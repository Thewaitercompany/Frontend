"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
        await video.play();
        return new Promise<void>((resolve) => {
          video.onended = () => resolve();
        });
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
      <video
        ref={video1Ref}
        className={`object-cover ${
          currentAnimation === 1 ? "block" : "hidden"
        }`}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideo1Loaded(true)}
        onError={() => handleVideoError(1)}
      >
        <source src="/animation 1.mp4" type="video/mp4" />
        <source src="/animation 1.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <video
        ref={video2Ref}
        className={`object-cover ${
          currentAnimation === 2 ? "block" : "hidden"
        }`}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideo2Loaded(true)}
        onError={() => handleVideoError(2)}
      >
        <source src="/animation 2.mp4" type="video/mp4" />
        <source src="/animation 2.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <Image
        src="/fallback-image.jpg"
        alt="Loading animation fallback"
        layout="fill"
        objectFit="cover"
        priority
        className={`${videoLoadError ? "block" : "hidden"}`}
      />
    </div>
  );
}
