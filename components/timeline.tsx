"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Cake,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  MapPin,
  ShieldAlert,
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
    date: "04/05/2020",
    title: "Đón sinh nhật của em",
    description:
      "Món quà là một chiếc cặp siêu cute. Người yêu thấy mình mua mắc tiền quá nên la mình một chập, mà nhìn cái mặt thì khoái lắm nha 🤣🤣🤣.",
    icon: <Cake className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 4",
    caption: "Đón sinh nhật của em",
    imageDescription:
      "Mình đã chuẩn bị một món quà bất ngờ cho người yêu, và người yêu cũng đã chuẩn bị một món quà rất đặc biệt cho mình. Đó là... 😚 Trời ơi, lúc đó phải nói là tim mình muốn rớt ra ngoài luôn á! Quá bất ngờ nên tui phải chết lặng thật lâu 🤭🤭🤭",
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
    date: "29/10/2020",
    title: "Kỷ niệm 1 năm",
    description:
      "Một năm bên nhau — một năm đầy ắp kỷ niệm và những khoảnh khắc đáng nhớ. Dần dần, cả hai đã trưởng thành hơn, yêu thương nhau nhiều hơn, thấu hiểu nhau hơn. Dù có cãi nhau, nhưng chúng mình chưa bao giờ từ bỏ.",
    icon: <Calendar className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 5",
    caption: "Kỷ niệm 1 năm",
    imageDescription:
      "Một năm bên nhau — một năm đầy ắp kỷ niệm và những khoảnh khắc đáng nhớ. Dần dần, cả hai đã trưởng thành hơn, yêu thương nhau nhiều hơn, thấu hiểu nhau hơn. Dù có cãi nhau, nhưng chúng mình chưa bao giờ từ bỏ.",
  },
  {
    date: "04/05/2021",
    title: "Đón sinh nhật của em lần 2",
    description:
      " Món quà là bộ đồ ngủ siêu siêu dễ thương cũng anh ngiu siêu cute 💑.",
    icon: <Cake className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 6",
    caption: "Khoảnh khắc đáng nhớ",
    imageDescription:
      "Khoảng thời gian này thật sự là một thử thách cực kỳ lớn đối với mình. Kỳ thi tốt nghiệp THPT Quốc Gia đang đến gần, nhưng nhờ có em — nguồn động lực to lớn — khiến mình không thể gục ngã.",
  },
  {
    date: "09/07/2021",
    title: "Chung mình kết thúc kỳ thi tốt nghiệp",
    description:
      "Kỳ thi tốt nghiệp THPT Quốc Gia đã kết thúc, và chúng mình đã cùng nhau trải qua những ngày tháng đầy căng thẳng và áp lực. Nhưng giờ đây, chúng mình đã có thể thở phào nhẹ nhõm và tận hưởng những khoảnh khắc vui vẻ bên nhau.",
    icon: <Calendar className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 7",
    caption: "Kết thúc chặng đường cấp 3",
    imageDescription:
      "Thật lòng thì mình đã từng nghĩ mình sẽ không thể vượt qua kỳ thi tốt nghiệp. Nhưng nhờ có em luôn ở bên — cùng nhau cố gắng, cùng nhau nỗ lực, cùng nhau vượt qua những khó khăn — anh đã có thêm niềm tin và động lực. Em chính là động lực lớn nhất của anh, là lý do để anh cố gắng mỗi ngày. Cảm ơn em đã cùng anh hoàn thiện bức tranh thanh xuân này✨✨✨.",
  },
  {
    date: "2022",
    title: "Cùng nhau đón đại dịch Covid",
    description:
      "Đại dịch Covid đã khiến chúng mình phải xa nhau một thời gian dài, nhưng cũng chính trong khoảng thời gian này, chúng mình đã học được cách yêu thương và trân trọng nhau hơn bao giờ hết. Dù có xa cách, nhưng tình yêu của chúng mình vẫn luôn bền chặt.",
    icon: <ShieldAlert className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=800&width=600",
    alt: "Kỷ niệm 8",
    caption: "Cùng nhau đón đại dịch Covid",
    imageDescription:
      "Đại dịch Covid đã khiến chúng mình phải xa nhau một thời gian dài, nhưng cũng chính trong khoảng thời gian này, chúng mình đã học được cách yêu thương và trân trọng nhau hơn bao giờ hết. Dù có xa cách, nhưng tình yêu của chúng mình vẫn luôn bền chặt.",
  },
  {
    date: "04/05/2022",
    title: "Đón sinh nhật của em lần 3",
    description:
      " Cùng nhua đi xem phim, ăn uống và chụp hình. Anh thật sự rất vui khi có em bên cạnh trong ngày đặc biệt này. Sinh nhật cuối cùng của em trước khi bước vào một chương mới trong cuộc đời.",
    icon: <Cake className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=800&width=600",
    alt: "Kỷ niệm 8",
    caption: "Sinh nhật đáng nhớ",
    imageDescription:
      "Món quà là một chiếc nhẫn xinh xắn mà 2 đứa cùng đi mua. Thật hạnh phúc khi thấy em trân món quà này.",
  },
  {
    date: "20/11/2022",
    title: "Lần giận nhau nhiêu nhất",
    description:
      "Lần đầu tiên chúng mình cãi nhau thật sự, và cũng là lần đầu tiên mình cảm thấy lo lắng về tình cảm của chúng mình. Nhưng sau đó, chúng mình đã cùng nhau vượt qua và hiểu nhau hơn.",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 9",
    caption: "Lần giận nhau nhiều nhất",
    imageDescription:
      "Lỗi lần này là do mình, quá trẻ con và bồng bột. Qua lần này nha nhận ra rằng bản thân mình cần phải trưởng thành hơn, cần phải biết kiềm chế cảm xúc của mình hơn. Mình đã học được cách yêu thương và trân trọng nhau hơn bao giờ hết.",
  },
  {
    date: "Tết 2023",
    title: "Tết của yêu thương",
    description:
      "Mõi ngày nào chúng mình cũng gặp nhau, đi chơi, đi ăn, đi chúc tết và chụp hình. Mỗi bước chân điều có nhau. Tết năm đó 2 đứa được lì xì nhiều lắm nha 🤣🤣🤣.",
    icon: <MapPin className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 10",
    caption: 'Tết đẹp nhất "2025"',
    imageDescription:
      "Tết đầu tiên, hai đứa cùng đi ngắm pháo hoa ở Cờ Đỏ nè. Nhưng tết năm đó mình lại mắc một lỗi nghiêm trọng khiến người yêu giận. Đến giờ nghĩ lại, mình vẫn thấy bản thân thật nguuuu. Nhưng người yêu vẫn tha thứ cho mình, nhưng mình không thể nào tha thứ cho bản thân — một bài học mà mình sẽ không bao giờ quên.",
  },

  {
    date: "25/042023",
    title: "Chuyến đi An Giang",
    description:
      "Chuyến đi An Giang vội vã, nhưng lại là chuyến đi đáng nhớ nhất chúng mình. Thật sự rất vui, những cũng rất buồn vì sau chuyến đi này, tui mình sẽ bắt đầu một hành trình mới — hành trình yêu xa.",
    icon: <MapPin className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 11",
    caption: "Chuyến đi An Giang",
    imageDescription:
      "Mỗi khoảnh khắc đều đáng nhớ, mỗi kỷ niệm đều đáng trân trọng. ",
  },
  {
    date: "30/4/2023",
    title: "Hành trình yêu xa",
    description:
      "Ngày hôm đó, cả hai cùng nhau lên Sài Gòn, cùng đi chơi, cùng đi ăn. Nhưng khi trở về, cả hai đều không thể nào ngừng khóc. Đó thật sự là một ngày rất buồn. Hành trình yêu xa bắt đầu từ đây.",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 12",
    caption: "Hành trình yêu xa",
    imageDescription:
      "Hôm đó, khi nhìn em bước qua cánh cổng an ninh sân bay, lòng anh như thắt lại. Hình bóng em dần khuất sau dòng người. Khoảnh khắc chia ly ấy buồn đến nghẹn lòng. Trên chuyến xe trở về hôm ấy, chỉ còn lại anh và sự trống vắng kéo dài vô tận.",
  },
  {
    date: "06/01/2024",
    title: "Ngiu bất ngờ về",
    description:
      "Sau một thời gian yêu xa, người yêu mình đã bất ngờ về mạng theo bao nhớ thương. Khoản khác mẹ gọi xuống nhà lấy đồ và từ xa mình đã thấy bóng dáng người yêu mình. Mình đã rất bất ngờ, cứ như là mơ vậy, cho đến khi em gọi mình và ôm lấy mình, mình mới biết là thật. Bao nhiêu thương nhớ, bao nhiêu mong chờ đều được đền đáp trong khoảnh khắc đó.",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 13",
    caption: "Ngiu bất ngờ về",
    imageDescription:
      "Khoản khắc mãi không thể nào quên. Mình đã rất bất ngờ, cứ như là mơ vậy.",
  },
  {
    date: "27/01/2024",
    title: "Em trở lại Đài Loan",
    description:
      "Thời gian trôi qua thật nhanh, chỉ mới hôm nào còn bên nhau, giờ đây lại phải chia xa. Nhưng mình biết rằng, tình yêu của chúng mình sẽ vượt qua mọi khoảng cách. Hành trình yêu xa lại bắt đầu. Hẹn gặp lại em trong những kỷ niệm đẹp nhất. ",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 14",
    caption: "Em trở lại Đài Loan",
    imageDescription:
      "Vì lần trước em về đã tạo cho anh một bất ngờ, nên lần này khi em bay, anh lén trốn lên Sài Gòn tiễn em như một ‘món trả thù’ nho nhỏ 🤣. Nhưng không ngờ, hôm đó lại trở thành một ngày thật buồn… Cảm xúc lúc ấy chẳng khác gì lần tiễn em ra sân bay sang Đài Loan. Trên chuyến xe trở về, mọi thứ bỗng trở nên thật dài, thật lặng, và đầy khoảng trống... 😔",
  },
  {
    date: "23/01/2025",
    title: "Ngiu trở về nước",
    description:
      "Lần đầu là 8 tháng, nhưng lần này là một năm. Một năm yêu xa, một năm không được gặp nhau. Khoảnh khắc nhìn thấy em bước ra từ cánh cổng an ninh sân bay, dường như mọi nỗi nhớ, mọi mong chờ trong anh đều được vỡ òa. Anh đã chờ đợi khoảnh khắc ấy quá lâu… Và khi ôm em vào lòng, anh không thể kìm nén được cảm xúc của mình nữa. Em đã trở về",
    icon: <Heart className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=600&width=400",
    alt: "Kỷ niệm 15",
    caption: "Ngiu trở về nước",
    imageDescription:
      "Một năm yêu xa, Có những lúc chúng mình dường như đã đến bên bờ vực chia tay. Ngày sinh nhật của em, anh đã không thể ở bên cạnh em, ngày lễ tình nhân cũng vậy. Ngày kỹ niệm lại càng không thể. Tuy khó khăn là vậy, chúng mình càng cảm thấy trân trọng những khoảnh khắc bên nhau hơn. Những lần video call, những tin nhắn, những cuộc gọi bất ngờ đều trở thành những kỷ niệm đẹp trong hành trình yêu xa của chúng mình.",
  },
  {
    date: "20/04/2025",
    title: "Kỷ niệm 2000 ngày yêu nhau",
    description:
      "Một kỷ niệm đáng nhớ trong hành trình yêu nhau của chúng mình. 2000 ngày bên nhau, 2000 ngày đầy ắp kỷ niệm và những khoảnh khắc đáng nhớ. Dù có cãi nhau, nhưng chúng mình chưa bao giờ từ bỏ.",
    icon: <Calendar className="h-6 w-6 text-white" />,
    src: "/love-anniversary/placeholder.svg?height=400&width=600",
    alt: "Kỷ niệm 16",
    caption: "Kỷ niệm 2000 ngày yêu nhau",
    imageDescription:
      "Hành trình yêu xa vãn chưa kết thúc. Chúng mình đã cùng nhau vượt qua rất nhiều khó khăn và thử thách trong tình yêu. Tình yêu của chúng mình đã trở nên mạnh mẽ hơn bao giờ hết. và chúng mình sẽ chấm dứt hành trình này bằng một đám cưới. Mình cùng nhau viết tiếp câu chuyện tình yêu của chúng mình.",
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
