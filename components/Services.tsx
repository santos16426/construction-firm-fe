import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Home,
  Box,
  CheckCircle2,
  ClipboardCheck,
  Hammer,
} from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
interface Service {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  specs: string[];
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.9, 1, 1, 0.95],
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0],
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      className="sticky top-[10vh] w-full h-[80vh] flex items-center justify-center mb-[20vh]"
      style={{
        perspective: "2000px",
        top: `calc(10vh + ${index * 35}px)`,
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        style={{
          scale: scrollScale,
          opacity: scrollOpacity,
          transformStyle: "preserve-3d",
        }}
        className="bg-[#002B54] rounded-sm p-6 md:p-12 flex flex-col md:flex-row gap-8 items-stretch shadow-[0_100px_200px_-50px_rgba(0,0,0,0.9)] border border-white/20 w-full relative overflow-hidden group/card"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-4 left-4 text-[8px] font-mono text-white/40 uppercase">
            Layer: PH_SPEC_{service.code}
          </div>
          <div className="absolute top-4 right-4 text-[8px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500 animate-ping" />{" "}
            QC_PASSED_2025
          </div>
          <motion.div
            style={{ x: mouseX }}
            className="absolute inset-y-0 w-px bg-white/10 hidden md:block"
          />
          <motion.div
            style={{ y: mouseY }}
            className="absolute inset-x-0 h-px bg-white/10 hidden md:block"
          />
        </div>

        <div className="flex-[1.4] relative z-10 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/5 border border-white/20 text-amber-500">
              {service.icon}
            </div>
            <div className="h-px flex-1 bg-white/10" />
            <div className="font-mono text-[10px] text-white/40">
              CODE_{service.id}
            </div>
          </div>

          <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.85]">
            {service.title}
          </h3>

          <p className="text-white/60 text-lg leading-relaxed font-mono mb-10 border-l-4 border-amber-500 pl-6 py-2">
            {service.description}
          </p>

          <div className="grid grid-cols-2 gap-y-4 mb-12">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={12} className="text-amber-500 mt-1" />
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  {f}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById("contact")?.offsetTop,
                  behavior: "smooth",
                });
              }}
              className="flex-1 py-5 bg-amber-500 text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              Get Quote <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-950/50 border border-white/10 overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="w-full h-[2px] bg-amber-500/50 shadow-[0_0_15px_#f59e0b] animate-scanline" />
          </div>

          <Image
            width={1200}
            height={1200}
            src={service.image}
            className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale contrast-150"
            alt={service.title}
          />

          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                {service.specs.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur px-2 py-1 text-[8px] font-mono text-white/60 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-amber-500" /> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase">
                <span>Structural Integrity</span>
                <span>99.8%</span>
              </div>
              <div className="h-1 bg-white/10 w-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "99.8%" }}
                  className="h-full bg-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(800px); opacity: 0; }
        }
        .animate-scanline { animation: scanline 4s linear infinite; }
      `}</style>
    </div>
  );
};
const Services = () => {
  const SERVICES = [
    {
      id: "D&B-01",
      code: "PH_DB",
      icon: <Home />,
      title: "Residential Design & Build",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      description:
        "Full-cycle turnkey solutions for homeowners. We manage architectural plans, city hall permits, and full construction finishing.",
      features: [
        "LGU Building Permits",
        "Bank Financing Support",
        "Structural Analysis",
        "Custom Interiors",
      ],
      specs: ["PCAB_CAT: B_MIN", "CONC: 3000-4000_PSI", "STEEL: PNS_CERTIFIED"],
    },
    {
      id: "COM-02",
      code: "PH_FIT",
      icon: <Building2 />,
      title: "Commercial Fit-out",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      description:
        "Professional interior construction for retail spaces, BPO offices, and restaurants with strict adherence to mall/building guidelines.",
      features: [
        "MEPF Engineering",
        "BFP/FDAS Compliance",
        "Acoustic Solutions",
        "Rapid Mobilization",
      ],
      specs: [
        "OHS: DOLE_COMPLIANT",
        "ELEC: PEC_STANDARDS",
        "FIRE: NFPA_ALIGNED",
      ],
    },
    {
      id: "REN-03",
      code: "PH_RENO",
      icon: <Hammer />,
      title: "Renovation & Extension",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
      description:
        "Comprehensive home improvements and vertical/horizontal expansions. We ensure seamless integration with your existing structure.",
      features: [
        "Structural Retrofitting",
        "Waterproofing Systems",
        "Interior Remodeling",
        "Electrical Audits",
      ],
      specs: [
        "SEAL: MULTI_LAYER",
        "MAT: PREMIUM_GRADE",
        "AUDIT: CAPACITY_TEST",
      ],
    },
    {
      id: "PMC-04",
      code: "PH_PM",
      icon: <ClipboardCheck />,
      title: "Project Management",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
      description:
        "Third-party technical oversight for large-scale developments. We protect your investment through quality and cost control.",
      features: [
        "Quantity Surveying",
        "QA/QC Management",
        "Safety Supervision",
        "Procurement Audit",
      ],
      specs: [
        "REPORTS: WEEKLY_SYNC",
        "BUDGET: LEDGER_LOCKED",
        "KPI: ON_TIME_DEL",
      ],
    },
    {
      id: "MOD-05",
      code: "PH_MOD",
      icon: <Box />,
      title: "Modular Quick-Build",
      image:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200",
      description:
        "High-speed construction using light-gauge steel framing. Perfect for vacation houses, staff dorms, and temporary commercial pods.",
      features: [
        "25-Day Erection",
        "Galvanized Frames",
        "Typhoon Resilient",
        "Eco-Friendly Mats",
      ],
      specs: ["FRAME: LGS_G550", "WIND: 280KPH_RATED", "WEIGHT: ULTRA_LIGHT"],
    },
  ];
  return (
    <section
      id="services"
      className="py-32 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
    >
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
