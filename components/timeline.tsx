"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, Camera, Gift, Heart, MapPin, Plane } from "lucide-react";
import { useEffect, useRef } from "react";

const timelineEvents = [
  {
    date: "01/01/2018",
    title: "Ngày đầu gặp gỡ",
    description: "Lần đầu tiên chúng ta gặp nhau tại...",
    icon: <MapPin className="h-6 w-6 text-white" />,
  },
  {
    date: "14/02/2018",
    title: "Chính thức yêu nhau",
    description: 'Ngày em nói "Có" và chúng ta bắt đầu hành trình tình yêu...',
    icon: <Heart className="h-6 w-6 text-white" />,
  },
  {
    date: "20/10/2018",
    title: "Kỷ niệm đáng nhớ",
    description: "Lần đầu tiên chúng ta cùng nhau đi xem phim...",
    icon: <Gift className="h-6 w-6 text-white" />,
  },
  {
    date: "01/05/2019",
    title: "Chuyến du lịch đầu tiên",
    description: "Chuyến đi đầu tiên của chúng ta đến...",
    icon: <Plane className="h-6 w-6 text-white" />,
  },
  {
    date: "14/02/2020",
    title: "Kỷ niệm 2 năm",
    description: "Hai năm bên nhau với bao nhiêu kỷ niệm đẹp...",
    icon: <Calendar className="h-6 w-6 text-white" />,
  },
  {
    date: "20/11/2022",
    title: "Khoảnh khắc đáng nhớ",
    description: "Cùng nhau chụp bộ ảnh kỷ niệm tuyệt đẹp...",
    icon: <Camera className="h-6 w-6 text-white" />,
  },
];

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !timelineRef.current) return;

    const line = timelineRef.current.querySelector(
      ".timeline-line"
    ) as HTMLElement;
    if (!line) return;

    line.style.height = "0";

    setTimeout(() => {
      if (line) {
        line.style.transition = "height 2s ease-in-out";
        line.style.height = "100%";
      }
    }, 500);
  }, [isInView]);

  return (
    <section className="py-16 relative" ref={timelineRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-dancing gradient-text text-center mb-16 section-title">
          Timeline Tình Yêu
        </h2>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="timeline-dot">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {event.icon}
                </div>
              </div>

              <div className="timeline-content">
                <div className="text-sm gradient-text font-semibold mb-2">
                  {event.date}
                </div>
                <h3 className="text-xl font-dancing text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
