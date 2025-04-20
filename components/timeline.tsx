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
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Dữ liệu timeline
const timelineEvents = [
  {
    date: "05/08/2019",
    title: "Ngày đầu gặp gỡ",
    description:
      "Lần đầu tiên chúng mình gây ấn tượng với nhau là vào ngày tựu trường năm lớp 11. Thật ra, trước đó đã từng vô tình gặp nhau một lần khi đi ăn rồi. Người yêu mình nhớ đến mình vì lúc đó mình trông rất cao, ốm như cây sào và có phong cách ăn mặc... rất là lập dị 😅😅😅.",
    icon: <MapPin className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 1",
    caption: "Ngày đầu gặp gỡ",
    imageDescription:
      "Vào ngày tựu trường đó, mình đã bị ấn tượng bởi người yêu mình — với nụ cười xinh, giọng nói đặc trưng rất dễ nghe và dễ thương nữa nha.",
  },
  {
    date: "29/10/2019",
    title: "Chính thức yêu nhau",
    description:
      "Đây phải nói là một dấu mốc quan trọng trong cuộc đời mình — từ một người bạn thân thiết trở thành người yêu thương nhau. Chúng mình đã cùng nhau trải qua rất nhiều kỷ niệm đẹp và những khoảnh khắc đáng nhớ từ đó đến nay.",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 2",
    caption: "Chính thức yêu nhau",
    imageDescription:
      "Chúng mình cũng đã có một thời gian tìm hiểu nhau, thấu hiểu nhau trước khi bước chung đường đến bây giờ. Mình tỏ tình thành công bằng đoạn tin nhắn tỏ tình còn dang dở (mình đã chuẩn bị một đoạn văn khá dài từ khá lâu 🤣). Cho đến hôm đó, chúng mình lần đầu cãi nhau (cái này là lỗi của mình 😅), và để cứu lấy tình cảm đã chôn giấu bấy lâu, mình quyết định gửi đoạn tin nhắn tỏ tình còn dang dở đó, lấy hết can đảm để thổ lộ tình cảm của mình. Và thế là... hai trái tim đã cùng nhịp đập🥰🥰🥰",
  },
  {
    date: "11/12/2019",
    title: "Kỷ niệm đáng nhớ",
    description:
      "Đó là ngày sinh nhật của mình, người ngiu tặng mình một ly nước ép, một cái áo chính tay lựa cho mình, một cái ôm ấp áp và ... 😊🥰😙",
    icon: <Gift className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=500&width=500",
    alt: "Kỷ niệm 3",
    caption: "Sinh nhật đáng nhớ",
    imageDescription:
      "Thật ra, ngay cả mình cũng bất ngờ vì... mình không nhớ hôm đó là sinh nhật của mình! Mình đã rất vui khi nhận được món quà bất ngờ từ người yêu. Đó là một chiếc áo rất đẹp, và mình vẫn giữ đến tận bây giờ mặc dù đã không còn mặc vừa nữa 😅. Mình cảm thấy rất hạnh phúc và biết ơn vì có người yêu bên cạnh trong ngày đặc biệt này. Món quà ngọt ngào nhất luôn đó 🥰😘😘.",
  },
  {
    date: "18/07/2020",
    title: "Chuyến du lịch đầu tiên",
    description:
      "Chuyến đi chơi xa đầu tiên của chúng mình là đến xứ sở thần tiên An Giang cùng những người bạn, dù chỉ một ngày nhưng toàn bộ chuyến đi là những kỷ niệm đẹp của chúng mình. khép lại năm 11 với những kỷ niệm đẹp.",
    icon: <MapPin className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=800&width=600",
    alt: "Kỷ niệm 4",
    caption: "Chuyến du lịch đầu tiên",
    imageDescription:
      "Dù kế hoạch có chút thay đổi nhưng không sao cả — hôm đó là một ngày đẹp trời, những bức ảnh thật tuyệt và đầy ắp kỷ niệm. Tất cả như một sự chuẩn bị cho năm lớp 12 cuối cấp đầy thử thách.",
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
