"use client";

import type React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const specialMoments = [
  {
    id: 1,
    title: "Lần đầu nắm tay",
    description:
      "Khoảnh khắc đầu tiên anh nắm lấy bàn tay nhỏ bé của em, cảm giác ấm áp và hạnh phúc khó tả.",
    image: "./placeholder.svg?height=600&width=800",
    align: "left",
  },
  {
    id: 2,
    title: "Buổi hẹn hò đầu tiên",
    description:
      "Buổi hẹn đầu tiên tại quán cafe nhỏ, nơi chúng ta đã trò chuyện suốt nhiều giờ không biết chán.",
    image: "./placeholder.svg?height=600&width=800",
    align: "right",
  },
  {
    id: 3,
    title: "Chuyến du lịch đáng nhớ",
    description:
      "Chuyến đi đầu tiên của hai đứa, những kỷ niệm tuyệt vời mà chúng ta không bao giờ quên.",
    image: "./placeholder.svg?height=600&width=800",
    align: "left",
  },
  {
    id: 4,
    title: "Khoảnh khắc đặc biệt",
    description:
      "Những giây phút bình yên bên nhau, chỉ cần có em bên cạnh, mọi thứ đều trở nên tuyệt vời.",
    image: "./placeholder.svg?height=600&width=800",
    align: "right",
  },
];

export default function SpecialMoments() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 relative" ref={containerRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-dancing gradient-text text-center mb-16 section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Khoảnh Khắc Đặc Biệt
        </motion.h2>

        <div className="space-y-32">
          {specialMoments.map((moment) => (
            <MomentItem
              key={moment.id}
              moment={moment}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentItem({
  moment,
  containerRef,
}: {
  moment: (typeof specialMoments)[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    moment.align === "left" ? [-100, 0] : [100, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    moment.align === "left" ? [100, 0] : [-100, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [moment.align === "left" ? -5 : 5, 0]
  );

  return (
    <div ref={elementRef} className="relative min-h-[300px]">
      <div
        className={`flex flex-col md:flex-row items-center gap-8 ${
          moment.align === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          className="flex-1 glass-card p-6"
          style={{ x, opacity, scale, rotate }}
          initial={{
            x: moment.align === "left" ? -100 : 100,
            opacity: 0,
            scale: 0.8,
            rotate: moment.align === "left" ? -5 : 5,
          }}
          whileInView={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl font-dancing gradient-text mb-4">
            {moment.title}
          </h3>
          <p className="text-gray-600">{moment.description}</p>
        </motion.div>

        <motion.div
          className="flex-1"
          style={{ x: imageX, opacity, scale }}
          initial={{
            x: moment.align === "left" ? 100 : -100,
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={moment.image || "./placeholder.svg"}
              alt={moment.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
