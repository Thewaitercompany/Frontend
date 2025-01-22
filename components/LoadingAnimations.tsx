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
  // Removed: const [isLoading, setIsLoading] = useState(true)
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const [hasError, setHasError] = useState(false);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Set a timeout to proceed if videos don't load
    loadingTimeoutRef.current = setTimeout(() => {
      console.log("Loading timeout - proceeding to login");
      onComplete();
    }, 3000);

    const playVideosSequentially = async () => {
      try {
        if (video1Ref.current && video2Ref.current) {
          // Preload both videos
          video1Ref.current.load();
          video2Ref.current.load();

          // Play first video
          await video1Ref.current.play();

          // Wait for first video to end
          await new Promise<void>((resolve) => {
            if (video1Ref.current) {
              video1Ref.current.onended = () => resolve();
            }
          });

          // Switch to second video
          setCurrentAnimation(2);

          // Play second video
          await video2Ref.current.play();

          // Wait for second video to end
          await new Promise<void>((resolve) => {
            if (video2Ref.current) {
              video2Ref.current.onended = () => resolve();
            }
          });

          // Complete the animation sequence
          onComplete();
        }
      } catch (error) {
        console.error("Error playing videos:", error);
        setHasError(true);
        onComplete();
      } finally {
        // Removed: setIsLoading(false)
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      }
    };

    playVideosSequentially();
  }, [onComplete]);

  // If there's an error, don't show anything and proceed to login
  if (hasError) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
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
        />
      </div>
    </div>
  );
}
