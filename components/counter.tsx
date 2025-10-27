"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter() {
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  // Target: 29 Oct 2025 (set to midnight local time)
  const targetDate = new Date("2025-10-29T00:00:00");

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = targetDate.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (!isInView) return;

    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    };

    // update immediately and every second
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const pad = (n: number) => n.toString().padStart(2, "0");

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
          className="text-3xl md:text-4xl font-dancing gradient-text mb-6 section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Kỷ niệm 6 năm yêu nhau
        </motion.h2>

        <p className="text-sm text-gray-600 mb-8">(29/10/2019 — 29/10/2025)</p>

        <div className="flex justify-center gap-4 mb-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold">{days}</div>
            <div className="text-sm text-gray-600">Ngày</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold">{pad(hours)}</div>
            <div className="text-sm text-gray-600">Giờ</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold">{pad(minutes)}</div>
            <div className="text-sm text-gray-600">Phút</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold">{pad(seconds)}</div>
            <div className="text-sm text-gray-600">Giây</div>
          </div>
        </div>

        <motion.div
          className="glass-card p-6 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
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
