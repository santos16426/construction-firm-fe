import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Building2, Warehouse, Drill } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
}

const StackingCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const containerRef = useRef(null);

  // 1. Scroll-based stacking and tilting logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale down slightly as it stacks to show the card underneath
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 0.95],
  );
  // Tilt the card backward as it gets covered by the next one
  const scrollRotateX = useTransform(scrollYProgress, [0.5, 1], [0, -15]);
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0.8],
  );

  // 2. Mouse-based 3D tilt logic (Interactivity)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const hoverRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"],
  );
  const hoverRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="sticky top-[15vh] w-full h-[75vh] flex items-center justify-center mb-[10vh]"
      style={{
        perspective: "2000px",
        // Stagger the sticky positioning slightly for better stacking visibility
        top: `calc(15vh + ${index * 20}px)`,
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          scale: scrollScale,
          rotateX: scrollRotateX, // Combines scroll tilt
          opacity: scrollOpacity,
          transformStyle: "preserve-3d",
        }}
        className={`${service.color} rounded-[3rem] p-8 md:p-20 flex flex-col md:flex-row gap-16 items-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5 w-full relative overflow-hidden group/card`}
      >
        {/* Child motion div for Mouse Interaction to avoid transform conflicts with scrollRotateX */}
        <motion.div
          style={{
            rotateX: hoverRotateX,
            rotateY: hoverRotateY,
            transformStyle: "preserve-3d",
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
          className="pointer-events-none"
        />

        {/* Dynamic Glare Overlay */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        <div
          className="flex-1 relative z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="text-amber-500 mb-8 inline-flex items-center gap-4">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              {service.icon}
            </div>
            <div className="h-px w-12 bg-white/10" />
            <span className="font-mono text-[10px] text-white/40">
              0{index + 1} {"// SERVICE"}
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]">
            {service.title}
          </h3>
          <p className="text-white/80 text-lg leading-relaxed max-w-md mb-10">
            {service.description}
          </p>
          <button className="px-10 py-4 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-500 transition-all rounded-full flex items-center gap-4 group">
            Request a Consultation{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div
          className="flex-1 w-full h-full min-h-[350px] bg-slate-900/60 rounded-[2rem] overflow-hidden relative border border-white/5"
          style={{ transform: "translateZ(100px)" }}
        >
          <Image
            src={service.image}
            className="w-full h-full  opacity-60 group-hover/card:scale-110 group-hover/card:opacity-90 transition-all duration-1000"
            alt={service.title}
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <div className="absolute top-6 left-6 flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
const Services = () => {
  const SERVICES = [
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "Commercial Development",
      color: "bg-zinc-900",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      description:
        "Ground‑up commercial buildings that balance design, durability, and efficient layouts tailored to your business.",
    },
    {
      icon: <Warehouse className="w-12 h-12" />,
      title: "Industrial Logistics",
      color: "bg-slate-900",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
      description:
        "Warehouses and light‑industrial facilities designed for smooth operations, safe workflows, and future expansion.",
    },
    {
      icon: <Drill className="w-12 h-12" />,
      title: "Civil Infrastructure",
      color: "bg-amber-600",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      description:
        "Foundations, access roads, and supporting works that keep your project stable, compliant, and built to last.",
    },
  ];
  return (
    <section className="py-32 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <SectionHeading
            subtitle="Services"
            title={
              <>
                What We
                <br />
                Build.
              </>
            }
          />
          <div className="md:w-1/3 text-slate-500 font-mono text-[10px] leading-loose uppercase tracking-[0.2em] pt-4">
            Reliable timelines, clear budgets, and one team guiding you from
            first sketch to final handover.
          </div>
        </div>
        <div className="relative">
          {SERVICES.map((s, i) => (
            <StackingCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
