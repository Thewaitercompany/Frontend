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

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      try {
        console.log("Starting to load videos...");

        // Create promises for both videos to load
        const loadVideo1 = new Promise<void>((resolve, reject) => {
          const video = video1Ref.current;
          if (!video) return reject("Video 1 element not found");

          // Log video element properties
          console.log("Video 1 element:", {
            src: video.src,
            readyState: video.readyState,
            error: video.error,
          });

          video.onloadeddata = () => {
            console.log("Video 1 loaded successfully");
            resolve();
          };
          video.onerror = (e) => {
            console.error("Video 1 load error:", e);
            reject("Video 1 failed to load");
          };
        });

        const loadVideo2 = new Promise<void>((resolve, reject) => {
          const video = video2Ref.current;
          if (!video) return reject("Video 2 element not found");

          // Log video element properties
          console.log("Video 2 element:", {
            src: video.src,
            readyState: video.readyState,
            error: video.error,
          });

          video.onloadeddata = () => {
            console.log("Video 2 loaded successfully");
            resolve();
          };
          video.onerror = (e) => {
            console.error("Video 2 load error:", e);
            reject("Video 2 failed to load");
          };
        });

        // Wait for both videos to load
        await Promise.all([loadVideo1, loadVideo2]);
        console.log("Both videos loaded successfully");

        if (!isMounted) return;
        setIsLoading(false);

        // Play videos sequentially
        if (video1Ref.current && video2Ref.current) {
          console.log("Starting video 1 playback");
          // Play first video
          await video1Ref.current.play();

          // Wait for first video to end
          await new Promise<void>((resolve) => {
            if (!video1Ref.current) return;
            video1Ref.current.onended = () => {
              console.log("Video 1 playback completed");
              resolve();
            };
          });

          if (!isMounted) return;
          // Switch to second video
          setCurrentAnimation(2);
          console.log("Starting video 2 playback");

          // Play second video
          await video2Ref.current.play();

          // Wait for second video to end
          await new Promise<void>((resolve) => {
            if (!video2Ref.current) return;
            video2Ref.current.onended = () => {
              console.log("Video 2 playback completed");
              resolve();
            };
          });

          if (!isMounted) return;
          console.log("Animation sequence completed");
          onComplete();
        }
      } catch (error) {
        console.error("Error with videos:", error);
        if (isMounted) {
          setHasError(true);
          onComplete();
        }
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
      // Capture ref values before cleanup
      const video1 = video1Ref.current;
      const video2 = video2Ref.current;

      // Cleanup video elements
      if (video1) {
        video1.pause();
        video1.src = "";
        video1.load();
      }
      if (video2) {
        video2.pause();
        video2.src = "";
        video2.load();
      }
    };
  }, [onComplete]);

  if (hasError) {
    console.log("Rendering error state");
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F1EEE6]">
          <div className="w-16 h-16 border-4 border-[#4A3F3C] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="w-full max-w-md aspect-video relative">
        <video
          ref={video1Ref}
          className={`w-full h-full object-contain ${
            currentAnimation === 1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          src="/animation 1.mp4"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
        <video
          ref={video2Ref}
          className={`w-full h-full object-contain absolute inset-0 ${
            currentAnimation === 2 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          src="/animation 2.mp4"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}
