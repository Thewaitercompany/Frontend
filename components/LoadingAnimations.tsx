"use client";

import { useState, useEffect } from "react";

export default function LoadingAnimations({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentAnimation, setCurrentAnimation] = useState(1);

  useEffect(() => {
    const video1 = document.getElementById("animation1") as HTMLVideoElement;
    const video2 = document.getElementById("animation2") as HTMLVideoElement;

    const playAnimation = (video: HTMLVideoElement) => {
      return new Promise<void>((resolve) => {
        video.play();
        video.onended = () => resolve();
      });
    };

    const playAnimations = async () => {
      await playAnimation(video1);
      setCurrentAnimation(2);
      await playAnimation(video2);
      onComplete();
    };

    playAnimations();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#F1EEE6] z-50 flex items-center justify-center">
      <video
        id="animation1"
        className={`object-cover ${
          currentAnimation === 1 ? "block" : "hidden"
        }`}
        src="/animation 1.mp4"
        muted
        playsInline
      />
      <video
        id="animation2"
        className={` object-cover ${
          currentAnimation === 2 ? "block" : "hidden"
        }`}
        src="/animation 2.mp4"
        muted
        playsInline
      />
    </div>
  );
}
