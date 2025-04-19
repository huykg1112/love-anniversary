"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text =
      "Như Ý ♥♥♥, hôm nay tròn 2.000 ngày ta bên nhau. Cùng anh ôn lại kỷ niệm nhé!";
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length && textRef.current) {
        textRef.current.innerHTML =
          text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
      } else {
        clearInterval(typing);
        if (textRef.current) {
          textRef.current.innerHTML = text;
        }

        // Add floating hearts after typing is complete
        const container = document.querySelector(".hero-container");
        if (container) {
          for (let i = 0; i < 10; i++) {
            createHeart(container as HTMLElement);
          }
        }
      }
    }, 100);

    return () => clearInterval(typing);
  }, []);

  const createHeart = (container: HTMLElement) => {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heart.style.opacity = `${Math.random() * 0.5 + 0.5}`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.position = "absolute";
    heart.style.bottom = "0";
    heart.style.animation = "float-up 3s ease-in forwards";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3000);
  };

  return (
    <section className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b bg-header from-pink-50 to-white z-0"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-200 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="absolute inset-0 z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <motion.div
        className="glass-card p-8 md:p-12 max-w-3xl mx-4 text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1
          ref={textRef}
          className="text-3xl md:text-5xl font-dancing gradient-text mb-8 min-h-[3rem] md:min-h-[4rem] leading-relaxed"
        >
          <span className="cursor">|</span>
        </h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Mỗi khoảnh khắc bên em là một món quà, mỗi nụ cười của em là ánh
            nắng trong cuộc đời anh.
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

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
    </section>
  );
}
