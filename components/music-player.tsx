"use client";

import { motion } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="music-player-container glass-card overflow-hidden"
        animate={{ width: isExpanded ? 250 : 50, height: 50 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <button
          className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-pink-500 hover:text-pink-600 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Music className="h-5 w-5" />
        </button>

        {isExpanded && (
          <div className="flex-1 flex items-center px-3">
            <div className="flex-1 truncate mr-2">
              <p className="text-sm font-medium text-gray-700 truncate">
                Tràn Bộ Nhớ
              </p>
              <p className="text-xs text-gray-500 truncate">Dương Domic</p>
            </div>

            <button
              className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </motion.div>

      {/* Replace with actual audio file */}
      <audio ref={audioRef} loop>
        <source src="/mp3/y2mate.com.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
