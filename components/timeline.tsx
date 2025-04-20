"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  MapPin,
  Plane,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Dữ liệu timeline
const timelineEvents = [
  {
    date: "01/01/2018",
    title: "Ngày đầu gặp gỡ",
    description: "Lần đầu tiên chúng ta gặp nhau tại...",
    icon: <MapPin className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 1",
    caption: "Bức ảnh đầu tiên",
    imageDescription:
      "Bức ảnh đầu tiên của chúng ta, nơi mà mọi thứ bắt đầu 🥰🥰🥰.",
  },
  {
    date: "14/02/2018",
    title: "Chính thức yêu nhau",
    description: 'Ngày em nói "Có" và chúng ta bắt đầu hành trình tình yêu...',
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 2",
    caption: "Chuyến du lịch đầu tiên",
    imageDescription:
      "Chuyến đi đầu tiên của hai đứa mình, An Giang và những kỹ niệm 🌈🌈🌈",
  },
  {
    date: "20/10/2018",
    title: "Kỷ niệm đáng nhớ",
    description: "Lần đầu tiên chúng ta cùng nhau đi xem phim...",
    icon: <Gift className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=500&width=500",
    alt: "Kỷ niệm 3",
    caption: "Sinh nhật đáng nhớ",
    imageDescription:
      "Sinh nhật em năm đó, anh đã chuẩn bị rất nhiều bất ngờ và niềm vui.",
  },
  {
    date: "01/05/2019",
    title: "Chuyến du lịch đầu tiên",
    description: "Chuyến đi đầu tiên của chúng ta đến...",
    icon: <Plane className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=800&width=600",
    alt: "Kỷ niệm 4",
    caption: "Ngày lễ giáng sinh đầu tiên",
    imageDescription: "Vào ngày lễ giáng sinh đầu",
  },
  {
    date: "14/02/2020",
    title: "Kỷ niệm 2 năm",
    description: "Hai năm bên nhau với bao nhiêu kỷ niệm đẹp...",
    icon: <Calendar className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 5",
    caption: "Dạo phố cùng nhau",
    imageDescription:
      "Những buổi chiều lang thang trên phố, tay trong tay không biết mệt.",
  },
  {
    date: "20/11/2022",
    title: "Khoảnh khắc đáng nhớ",
    description: "Cùng nhau chụp bộ ảnh kỷ niệm tuyệt đẹp...",
    icon: <Camera className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 6",
    caption: "Khoảnh khắc đáng nhớ",
    imageDescription:
      "Một trong những khoảnh khắc đáng nhớ nhất của chúng ta, đơn giản nhưng đầy ý nghĩa.",
  },
];

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<
    (typeof timelineEvents)[0] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const openLightbox = (image: (typeof timelineEvents)[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex =
      (currentIndex - 1 + timelineEvents.length) % timelineEvents.length;
    setSelectedImage(timelineEvents[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % timelineEvents.length;
    setSelectedImage(timelineEvents[newIndex]);
    setCurrentIndex(newIndex);
  };

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
              className="timeline-item cursor-pointer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              onClick={() => openLightbox(event, index)}
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

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                key={selectedImage.src}
                className="relative glass-card overflow-hidden rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/3 aspect-[4/3]">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>

                  <div className="p-6 md:w-1/3 bg-white/90 backdrop-blur-sm">
                    <h3 className="text-2xl font-dancing gradient-text mb-3">
                      {selectedImage.caption}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {selectedImage.imageDescription}
                    </p>

                    <div className="flex justify-between mt-auto">
                      <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPrevious();
                        }}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="text-gray-500">
                        {currentIndex + 1} / {timelineEvents.length}
                      </span>
                      <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNext();
                        }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
