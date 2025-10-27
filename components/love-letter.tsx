"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LoveLetter() {
  const letterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(letterRef, { once: true, margin: "-100px" });

  const letterContent = [
    "Gửi Như Ý của anh,",
    "6 năm yêu nhau (29/10/2019 - 29/10/2025) – đó là một hành trình dài mà chúng ta đã cùng nhau trải qua.",
    "Có những lúc vui vẻ, có những lúc buồn bã, nhưng tất cả đều là những kỷ niệm đẹp mà anh sẽ mãi trân trọng.",
    "Từng ngày bên em, với anh, đều là một món quà quý giá mà cuộc đời đã ban tặng.",
    "Cảm ơn em vì đã kiên nhẫn, dịu dàng, và luôn ở bên cạnh anh – dù là những lúc vui vẻ hay giông bão.",
    "Anh, Hoàng Huy, sẽ luôn yêu em bằng tất cả những gì anh có. Hôm nay, ngày mai và cả những năm tháng sau này.",
  "Chúc mừng 6 năm yêu nhau của chúng ta – một hành trình tuyệt đẹp và đầy ý nghĩa.",
    "Mãi yêu em,",
    "Hoàng Huy ❤️",
  ];
  return (
    <section className="py-16 relative" ref={letterRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        className="glass-card max-w-2xl mx-auto px-4 p-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-dancing gradient-text text-center mb-8 section-title">
          Lời Nhắn Gửi
        </h2>

        <div className="space-y-4 relative z-10">
          {letterContent.map((line, index) => (
            <motion.p
              key={index}
              className={`text-gray-700 ${
                index === 0 ||
                index === letterContent.length - 2 ||
                index === letterContent.length - 1
                  ? "font-dancing text-xl gradient-text"
                  : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              className="opacity-10"
            >
              <path
                d="M50 0L61.8 38.2H100L69.1 61.8L80.9 100L50 76.4L19.1 100L30.9 61.8L0 38.2H38.2L50 0Z"
                fill="url(#gradient1)"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF3366" />
                  <stop offset="1" stopColor="#8A2BE2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              className="opacity-10"
            >
              <path
                d="M50 0L61.8 38.2H100L69.1 61.8L80.9 100L50 76.4L19.1 100L30.9 61.8L0 38.2H38.2L50 0Z"
                fill="url(#gradient2)"
              />
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8A2BE2" />
                  <stop offset="1" stopColor="#FF3366" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
