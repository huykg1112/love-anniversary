"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = 2000;
    const duration = 3000; // 3 seconds
    const increment = Math.ceil(end / (duration / 16)); // 16ms per frame

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView]);

  const digits = count.toString().padStart(4, "0").split("");

  return (
    <div className="py-20 modern-gradient-bg bg-counter relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div
        className="max-w-4xl mx-auto px-4 text-center relative z-10"
        ref={counterRef}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-dancing gradient-text mb-12 section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ngày Yêu Nhau
        </motion.h2>

        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {digits.map((digit, index) => (
            <motion.div
              key={index}
              className="counter-digit"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {digit}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass-card p-6 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-lg md:text-xl text-gray-700">
            Mỗi ngày là một kỷ niệm ngọt ngào, mỗi phút giây là dấu ấn của chúng
            ta.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
