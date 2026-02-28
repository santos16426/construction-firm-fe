import { motion } from "framer-motion";
import React from "react";

const SectionHeading = ({
  subtitle,
  title,
  dark = false,
  center = false,
}: {
  subtitle: string;
  title: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) => (
  <div
    className={`mb-16 overflow-hidden ${center ? "text-center flex flex-col items-center" : ""}`}
  >
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      className="flex items-center gap-3 mb-4"
    >
      <span className="w-8 h-[1px] bg-amber-600" />
      <span className="text-amber-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
        {subtitle}
      </span>
      {center && <span className="w-8 h-[1px] bg-amber-600" />}
    </motion.div>
    <motion.h2
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] ${dark ? "text-white" : "text-slate-950"}`}
    >
      {title}
    </motion.h2>
  </div>
);

export default SectionHeading;
