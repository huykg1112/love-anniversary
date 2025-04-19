"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const promises = [
  {
    id: 1,
    title: "Luôn bên em",
    content: "Anh hứa sẽ luôn ở bên cạnh em, dù là những lúc vui vẻ hay khó khăn.",
    icon: "💑",
  },
  {
    id: 2,
    title: "Yêu em mỗi ngày",
    content: "Anh hứa sẽ yêu em nhiều hơn mỗi ngày, không bao giờ để tình yêu phai nhạt.",
    icon: "💖",
  },
  {
    id: 3,
    title: "Lắng nghe em",
    content: "Anh hứa sẽ luôn lắng nghe em, chia sẻ mọi niềm vui nỗi buồn cùng em.",
    icon: "👂",
  },
  {
    id: 4,
    title: "Cùng em xây dựng tương lai",
    content: "Anh hứa sẽ cùng em xây dựng một tương lai tươi đẹp, vững chắc và tràn đầy hạnh phúc.",
    icon: "🏡",
  },
  {
    id: 5,
    title: "Làm em cười mỗi ngày",
    content: "Anh hứa sẽ làm em cười mỗi ngày, xua tan mọi buồn phiền và mệt mỏi.",
    icon: "😊",
  },
  {
    id: 6,
    title: "Tôn trọng em",
    content: "Anh hứa sẽ luôn tôn trọng em, tôn trọng quyết định và mong muốn của em.",
    icon: "🙏",
  },
]

export default function Promises() {
  const [activePromise, setActivePromise] = useState<number | null>(null)

  return (
    <section className="py-16 promises-gradient-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-full h-20 bg-white opacity-10"
          style={{ transform: "skewY(-3deg)" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-white opacity-10"
          style={{ transform: "skewY(3deg)" }}
        ></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-dancing gradient-text text-center mb-12 section-title">
          Những Lời Hứa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                className={`glass-card glass-card-hover h-full transition-all duration-300 ${
                  activePromise === promise.id ? "ring-2 ring-pink-400 shadow-lg" : ""
                }`}
                onClick={() => setActivePromise(activePromise === promise.id ? null : promise.id)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-4xl mb-4 text-center">{promise.icon}</div>
                  <h3 className="text-xl font-dancing gradient-text mb-3 text-center">{promise.title}</h3>
                  <p className="text-gray-600 text-center flex-grow">{promise.content}</p>
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePromise(activePromise === promise.id ? null : promise.id)
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 mr-1 transition-transform duration-300 ${
                          activePromise === promise.id ? "fill-pink-500 scale-110" : ""
                        }`}
                      />
                      <span>{activePromise === promise.id ? "Đã lưu vào tim" : "Lưu vào tim"}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
