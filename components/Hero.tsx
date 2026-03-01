import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Wipe logic: 100% (hidden) to 0% (fully revealed)
  const wipeValue = useTransform(scrollY, [0, 600], [100, 0]);
  const imgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);

  const headlineClass =
    "text-[12vw] md:text-[9.5rem] font-black leading-[0.8] tracking-tighter flex flex-col uppercase select-none";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100vh] bg-zinc-950 overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* BASE LAYER: The "Blueprint" (Static Background) */}
        <div className="absolute inset-0 z-0 bg-[#001529]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover mix-blend-luminosity opacity-30 grayscale blur-[1px]"
            alt="Blueprint Base"
          />

          {/* Static Background Text (The Gold Outline) */}
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div style={{ y: textY }} className="max-w-4xl opacity-50">
                <h1
                  className={`${headlineClass} text-transparent stroke-text-gold`}
                >
                  <span className="block">YOUR VISION</span>
                  <span className="block">BUILT TO LAST.</span>
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* REVEAL LAYER: The "Reality" (Clipped Over Top) */}
        <motion.div
          style={{
            clipPath: useTransform(wipeValue, (v) => `inset(0 ${v}% 0 0)`),
            scale: imgScale,
          }}
          className="absolute inset-0 z-20 overflow-hidden bg-zinc-950"
        >
          {/* Actual Realistic Image */}
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Realized Building"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

          {/* Realistic Text (Solid White - Revealing in sync with image) */}
          <div className="absolute inset-0 flex items-center px-6 md:px-12 z-30">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div style={{ y: textY }} className="max-w-4xl">
                <h1 className={`${headlineClass} text-white`}>
                  <span className="block">YOUR VISION</span>
                  <span className="block">BUILT TO LAST.</span>
                </h1>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Static HUD/UI Elements (Always Visible) */}
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-end pb-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-amber-500 font-mono text-[10px] font-black uppercase tracking-[0.3em]">
                  Now Accepting New Projects
                </span>
              </div>
            </motion.div>

            <motion.div
              // style={{ opacity: useTransform(scrollY, [0, 400], [0.3, 1]) }}
              className="flex flex-wrap gap-6 items-center pointer-events-auto"
            >
              <button
                onClick={() => {
                  window.scrollTo({
                    top: document.getElementById("contact")?.offsetTop,
                    behavior: "smooth",
                  });
                }}
                className="px-10 py-5 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-4 group hover:bg-white transition-all rounded-full shadow-2xl"
              >
                Get Quote{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="text-white/60 font-mono text-[10px] uppercase tracking-widest">
                Scroll to explore our services
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .stroke-text-gold {
          -webkit-text-stroke: 1.5px #f59e0b;
        }
      `}</style>
    </section>
  );
};
export default Hero;
