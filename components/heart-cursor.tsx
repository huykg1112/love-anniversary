"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function HeartCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([])
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const interval = setInterval(() => {
      // Generate a random color from gradient
      const colors = ["#ff3366", "#ff6b8b", "#a64dff", "#8a2be2"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      const newHeart = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
        size: Math.random() * 0.5 + 0.5, // Random size between 0.5 and 1
        color: randomColor,
      }

      setHearts((prevHearts) => [...prevHearts, newHeart])

      // Limit the number of hearts to prevent performance issues
      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id))
      }, 1000)
    }, 100)

    return () => clearInterval(interval)
  }, [mousePosition, isEnabled])

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className="glass-card p-2 shadow-md text-pink-500 hover:text-pink-600 transition-colors"
          aria-label={isEnabled ? "Tắt hiệu ứng trái tim" : "Bật hiệu ứng trái tim"}
        >
          {isEnabled ? "❤️" : "🖤"}
        </button>
      </div>

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-50"
            initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 0.8 }}
            animate={{
              x: heart.x + (Math.random() * 100 - 50),
              y: heart.y - 100,
              scale: heart.size,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ x: heart.x, y: heart.y, color: heart.color }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
