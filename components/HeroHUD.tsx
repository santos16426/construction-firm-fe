"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const HeroHUD = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      <motion.div
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="w-10 h-10 border border-amber-500/50 rounded-full flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-amber-500 rounded-full" />
      </motion.div>
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-8 opacity-20">
        <div className="h-64 w-[1px] bg-white" />
        <span className="text-[10px] font-mono text-white rotate-90 origin-left tracking-[1em]">
          PRECISION_SCAN_ACTIVE
        </span>
      </div>
    </div>
  );
};
export default HeroHUD;
