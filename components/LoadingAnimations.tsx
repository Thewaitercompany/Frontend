"use client";

import { useState, useEffect, useRef } from "react";

interface LoadingAnimationsProps {
  onComplete?: () => void;
}

export default function LoadingAnimations({
  onComplete,
}: LoadingAnimationsProps) {
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const [animationsCompleted, setAnimationsCompleted] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playAnimations = async () => {
      if (video1Ref.current && video2Ref.current) {
        try {
          await video1Ref.current.play();
          await new Promise((resolve) => {
            video1Ref.current!.onended = resolve;
          });

          setCurrentAnimation(2);
          await video2Ref.current.play();
          await new Promise((resolve) => {
            video2Ref.current!.onended = resolve;
          });

          setAnimationsCompleted(true);
          if (onComplete) {
            onComplete();
          }
        } catch (error) {
          console.error("Error playing animations:", error);
          setAnimationsCompleted(true);
          if (onComplete) {
            onComplete();
          }
        }
      }
    };

    playAnimations();
  }, [onComplete]);

  if (animationsCompleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md max-h-md">
        <video
          ref={video1Ref}
          className="absolute inset-0 object-cover w-full h-full"
          muted
          playsInline
          preload="auto"
        >
          <source src="/animation 1.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
            currentAnimation === 2 ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
        >
          <source src="/animation 2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
