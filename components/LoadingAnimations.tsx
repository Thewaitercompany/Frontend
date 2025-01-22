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
    const loadVideos = async () => {
      try {
        // Create promises for both videos to load
        const loadVideo1 = new Promise<void>((resolve, reject) => {
          if (video1Ref.current) {
            video1Ref.current.onloadeddata = () => {
              resolve();
            };
            video1Ref.current.onerror = () => reject("Video 1 failed to load");
          }
        });

        const loadVideo2 = new Promise<void>((resolve, reject) => {
          if (video2Ref.current) {
            video2Ref.current.onloadeddata = () => {
              resolve();
            };
            video2Ref.current.onerror = () => reject("Video 2 failed to load");
          }
        });

        // Wait for both videos to load
        await Promise.all([loadVideo1, loadVideo2]);
        setIsLoading(false);

        // Play videos sequentially
        if (video1Ref.current && video2Ref.current) {
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

          // Complete the sequence
          onComplete();
        }
      } catch (error) {
        console.error("Error with videos:", error);
        setHasError(true);
        onComplete();
      }
    };

    loadVideos();
  }, [onComplete]);

  if (hasError) {
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
