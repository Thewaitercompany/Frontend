"use client";

import { useState, useEffect, useRef } from "react";

export default function LoadingAnimations({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState({
    video1: false,
    video2: false,
  });

  // Preload videos
  useEffect(() => {
    const preloadVideos = async () => {
      try {
        const video1Promise = fetch("/animation 1.mp4").then((response) => {
          if (!response.ok) throw new Error("Video 1 not found");
          return response.blob();
        });

        const video2Promise = fetch("/animation 2.mp4").then((response) => {
          if (!response.ok) throw new Error("Video 2 not found");
          return response.blob();
        });

        const [video1Blob, video2Blob] = await Promise.all([
          video1Promise,
          video2Promise,
        ]);

        if (video1Ref.current && video2Ref.current) {
          video1Ref.current.src = URL.createObjectURL(video1Blob);
          video2Ref.current.src = URL.createObjectURL(video2Blob);

          setVideosLoaded({ video1: true, video2: true });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error preloading videos:", error);
        setHasError(true);
        onComplete();
      }
    };

    preloadVideos();

    return () => {
      // Cleanup object URLs
      if (video1Ref.current) URL.revokeObjectURL(video1Ref.current.src);
      if (video2Ref.current) URL.revokeObjectURL(video2Ref.current.src);
    };
  }, []);

  // Play videos once loaded
  useEffect(() => {
    if (!videosLoaded.video1 || !videosLoaded.video2) return;

    let isMounted = true;
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    const playVideos = async () => {
      try {
        if (!video1 || !video2) return;

        // Play first video
        await video1.play();

        // Wait for first video to end
        await new Promise<void>((resolve) => {
          if (!video1) return;
          video1.onended = () => resolve();
        });

        if (!isMounted) return;

        // Switch to second video
        setCurrentAnimation(2);

        // Play second video
        await video2.play();

        // Wait for second video to end
        await new Promise<void>((resolve) => {
          if (!video2) return;
          video2.onended = () => resolve();
        });

        if (!isMounted) return;
        onComplete();
      } catch (error) {
        console.error("Error playing videos:", error);
        setHasError(true);
        onComplete();
      }
    };

    playVideos();

    return () => {
      isMounted = false;
      if (video1) {
        video1.pause();
        video1.currentTime = 0;
      }
      if (video2) {
        video2.pause();
        video2.currentTime = 0;
      }
    };
  }, [videosLoaded, onComplete]);

  if (hasError) return null;

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F1EEE6]">
          <div className="w-16 h-16 border-4 border-[#4A3F3C] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#4A3F3C]">Loading animations...</p>
        </div>
      )}
      <div className="w-full max-w-md aspect-video relative">
        <video
          ref={video1Ref}
          className={`w-full h-full object-contain ${
            currentAnimation === 1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={video2Ref}
          className={`w-full h-full object-contain absolute inset-0 ${
            currentAnimation === 2 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
