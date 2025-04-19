"use client";

import type React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Placeholder images - replace with actual photos
const images = [
  {
    id: 1,
    src: "/Gallery/StartDay.jpg?height=600&width=400",
    alt: "Kỷ niệm 1",
    caption: "Bức ảnh đầu tiên",
    description:
      "Bức ảnh đầu tiên của chúng ta, nơi mà mọi thứ bắt đầu 🥰🥰🥰.",
  },
  {
    id: 2,
    src: "/Gallery/AnGiang1.jpg?height=400&width=600",
    alt: "Kỷ niệm 2",
    caption: "Chuyến du lịch đầu tiên",
    description:
      "Chuyến đi đầu tiên của hai đứa mình, An Giang và những kỹ niệm 🌈🌈🌈",
  },
  {
    id: 3,
    src: "/love-anniversary/placeholder.svg?height=500&width=500",
    alt: "Kỷ niệm 3",
    caption: "Sinh nhật đáng nhớ",
    description:
      "Sinh nhật em năm đó, anh đã chuẩn bị rất nhiều bất ngờ và niềm vui.",
  },
  {
    id: 4,
    src: "/love-anniversary/placeholder.svg?height=800&width=600",
    alt: "Kỷ niệm 4",
    caption: "Ngày lễ giáng sinh đầu tiên",
    description: "Vào ngày lễ giáng sinh đầu ",
  },
  {
    id: 5,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 5",
    caption: "Dạo phố cùng nhau",
    description:
      "Những buổi chiều lang thang trên phố, tay trong tay không biết mệt.",
  },
  {
    id: 6,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 6",
    caption: "Khoảnh khắc đáng nhớ",
    description:
      "Một trong những khoảnh khắc đáng nhớ nhất của chúng ta, đơn giản nhưng đầy ý nghĩa.",
  },
  {
    id: 7,
    src: "/love-anniversary/placeholder.svg?height=500&width=700",
    alt: "Kỷ niệm 7",
    caption: "cái tết đầu tiên",
    description:
      "Tết đầu tiên bên nhau, những kỷ niệm vui vẻ và ấm áp bên nhau, khép lại năm đầu tiên của thanh xuân này.",
  },
  {
    id: 8,
    src: "/love-anniversary/placeholder.svg?height=600&width=600",
    alt: "Kỷ niệm 8",
    caption: "Cùng nhau nấu ăn",
    description:
      "Lần đầu tiên chúng ta cùng nhau vào bếp, mặc dù hơi lộn xộn nhưng rất vui.",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const openLightbox = (image: (typeof images)[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <section className="py-16 relative" id="gallery">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        ref={galleryRef}
      >
        <h2 className="text-3xl md:text-5xl font-dancing gradient-text text-center mb-12 section-title">
          Thư Viện Kỷ Niệm
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
          onKeyDown={handleKeyDown}
        >
          {images.map((image, index) => {
            // Determine if this image should span multiple columns or rows
            const isWide = 0;
            const isTall = 0;

            return (
              <motion.div
                key={image.id}
                className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 hover:shadow-xl
                  ${isWide ? "sm:col-span-2" : ""}
                  ${isTall ? "row-span-2" : ""}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => openLightbox(image, index)}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden group">
                  <Image
                    src={image.src || "/love-anniversary/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-xl font-dancing">{image.caption}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                key={selectedImage.id}
                className="relative glass-card overflow-hidden rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-2 right-2 z-20 flex gap-2"></div>

                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/3 aspect-[4/3]">
                    <Image
                      src={
                        selectedImage.src || "/love-anniversary/placeholder.svg"
                      }
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
                      {selectedImage.description}
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
                        {currentIndex + 1} / {images.length}
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
