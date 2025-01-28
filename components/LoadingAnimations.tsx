"use client";

import { useState, useEffect, useRef } from "react";

interface LoadingAnimationsProps {
  onComplete: () => void;
}

export default function LoadingAnimations({
  onComplete,
}: LoadingAnimationsProps) {
  const [currentAnimation, setCurrentAnimation] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playAnimations = async () => {
      if (video1Ref.current && video2Ref.current) {
        try {
          // Play first animation
          await video1Ref.current.play();
          await new Promise<void>((resolve) => {
            const onEnded = () => {
              video1Ref.current?.removeEventListener("ended", onEnded);
              resolve();
            };
            video1Ref.current?.addEventListener("ended", onEnded);
          });

          // Switch to second animation
          setCurrentAnimation(2);

          // Play second animation
          await video2Ref.current.play();
          await new Promise<void>((resolve) => {
            const onEnded = () => {
              video2Ref.current?.removeEventListener("ended", onEnded);
              resolve();
            };
            video2Ref.current?.addEventListener("ended", onEnded);
          });

          // Both animations completed
          onComplete();
        } catch (error) {
          console.error("Error playing animations:", error);
          onComplete();
        }
      }
    };

    playAnimations();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md max-h-md aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[80vmin] max-h-[80vmin]">
            <video
              ref={video1Ref}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                currentAnimation === 1 ? "opacity-100" : "opacity-0"
              }`}
              muted
              playsInline
              preload="auto"
            >
              <source src="/static/media/animation 1.mp4" type="video/mp4" />
            </video>
            <video
              ref={video2Ref}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                currentAnimation === 2 ? "opacity-100" : "opacity-0"
              }`}
              muted
              playsInline
              preload="auto"
            >
              <source src="/static/media/animation 2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
