import Counter from "@/components/counter";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import HeartButton from "@/components/heart-button";
import HeartCursor from "@/components/heart-cursor";
import HeartModel from "@/components/heart-model";
import Hero from "@/components/hero";
import LoveLetter from "@/components/love-letter";
import MusicPlayer from "@/components/music-player";
import Promises from "@/components/promises";
import SpecialMoments from "@/components/special-moments";
import Timeline from "@/components/timeline";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Background particles */}
      {/* <TsParticlesHearts /> */}

      {/* Heart cursor effect */}
      <HeartCursor />

      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <Counter />
        <div className="relative py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="absolute z-9999 top-[870px] right-20 hidden lg:block r ">
            <HeartModel />
          </div>
          <Gallery />
          <Timeline />
        </div>
        <Promises />
        <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <SpecialMoments />
          <LoveLetter />
          <div className="flex flex-col items-center mt-20 mb-10 space-y-8">
            <HeartButton />
            {/* <MessageForm /> */}
          </div>
        </div>
        <MusicPlayer />
        <Footer />
      </div>
    </main>
  );
}
