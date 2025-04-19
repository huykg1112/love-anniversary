"use client"

import { useState } from "react"
import confetti from "canvas-confetti"

export default function HeartButton() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff3366", "#ff6b8b", "#8a2be2", "#ffffff"],
    })

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="relative">
      <button
        className={`heart-button ${isAnimating ? "animate-beat" : ""}`}
        onClick={handleClick}
        aria-label="Nhấn vào trái tim"
      >
        <span className="heart-button-content">❤️</span>
      </button>

      <style jsx>{`
        @keyframes beat {
          0%, 100% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(45deg) scale(1.2);
          }
        }
        
        .animate-beat {
          animation: beat 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
