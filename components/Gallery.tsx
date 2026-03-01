import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  HardHat,
  MapPin,
  Maximize2,
  MoveRight,
  Scale,
  ShieldCheck,
  X,
  Zap,
  Leaf,
} from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";

type Category = "All" | "Townhouse" | "Subdivision" | "Luxury";

interface ProjectMetric {
  label: string;
  value: string;
  icon: "Zap" | "Leaf" | "ShieldCheck" | "HardHat" | "Scale" | "Clock";
}

interface ProjectTimelineItem {
  phase: string;
  date: string;
}

interface Project {
  id: string;
  title: string;
  category: Category;
  image: string;
  location: string;
  area: string;
  light: string;
  status: string;
  description: string;
  longDescription?: string;
  features?: string[];
  gallery?: string[];
  specs?: Record<string, string>;
  metrics?: ProjectMetric[];
  timeline?: ProjectTimelineItem[];
}

const METRIC_ICONS: Record<ProjectMetric["icon"], React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Leaf,
  ShieldCheck,
  HardHat,
  Scale,
  Clock,
};

function IconRenderer({
  name,
  size = 18,
  className = "",
}: {
  name: ProjectMetric["icon"];
  size?: number;
  className?: string;
}) {
  const IconComponent = METRIC_ICONS[name];
  return IconComponent ? (
    <IconComponent size={size} className={className} />
  ) : null;
}

function ProjectDetailView({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const description = project.longDescription ?? project.description;
  const features =
    project.features ?? [
      "Premium Finishes",
      "Sustainable Sourcing",
      "Seismic Compliance",
    ];
  const gallery = project.gallery ?? [project.image];
  const specs = project.specs ?? {};
  const metrics = project.metrics ?? [];
  const timeline = project.timeline ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] overflow-y-auto bg-white"
    >
      <div className="relative flex min-h-screen flex-col">
        <nav className="fixed top-0 z-[220] flex w-full items-center justify-between px-6 py-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 font-bold uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-md transition-colors hover:bg-amber-500 text-[10px]"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/90 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-amber-500"
          >
            <X size={20} />
          </button>
        </nav>

        <div className="relative flex h-[65vh] w-full items-end overflow-hidden md:h-[80vh]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-sm bg-amber-500 px-3 py-1 font-black uppercase tracking-widest text-slate-950 text-[10px]">
                  {project.category}
                </span>
                <span className="h-[1px] w-8 bg-white/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {project.id}
                </span>
              </div>

              <h1 className="mb-8 font-black uppercase leading-[0.85] tracking-tighter text-white text-5xl md:text-9xl">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-12 border-t border-white/10 pt-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-amber-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-widest text-white/50 text-[9px]">
                      Location
                    </p>
                    <p className="text-lg font-medium text-white">
                      {project.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-amber-500">
                    <Maximize2 size={18} />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-widest text-white/50 text-[9px]">
                      Scope
                    </p>
                    <p className="text-lg font-medium text-white">
                      {project.area}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
              <div className="space-y-12 lg:col-span-7">
                <div className="space-y-6">
                  <span className="font-black uppercase tracking-[0.4em] text-amber-600 text-[10px]">
                    Project Narrative
                  </span>
                  <h2 className="font-black uppercase leading-tight tracking-tighter text-slate-950 text-3xl md:text-4xl">
                    Redefining Residential Resilience.
                  </h2>
                  <p className="border-l-4 border-amber-500 pl-8 text-xl font-medium italic leading-relaxed text-slate-600 md:text-2xl">
                    &ldquo;{description}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                  {features.map((feat) => (
                    <div
                      key={feat}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:border-amber-200"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="font-bold uppercase tracking-widest text-slate-800 text-[11px]">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="sticky top-32 rounded-[2.5rem] bg-slate-950 p-10 text-white md:p-12">
                  <h3 className="mb-10 font-black uppercase tracking-[0.3em] text-amber-500 text-xs">
                    Impact &amp; Performance
                  </h3>
                  <div className="space-y-8">
                    {metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between border-b border-white/10 pb-6 last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="opacity-60 text-amber-500">
                            <IconRenderer name={m.icon} />
                          </div>
                          <span className="font-bold uppercase tracking-widest text-white/60 text-[10px]">
                            {m.label}
                          </span>
                        </div>
                        <span className="font-black text-2xl text-amber-500">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="mb-4 font-mono text-[9px] uppercase leading-relaxed text-white/40">
                      Construction Lifecycle Status:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      <span className="font-bold uppercase tracking-widest text-white text-[11px]">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {Object.keys(specs).length > 0 && (
            <div className="border-y border-slate-100 bg-slate-50 py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                  <div className="max-w-xl">
                    <span className="mb-4 block font-black uppercase tracking-[0.4em] text-amber-600 text-[10px]">
                      Technical Details
                    </span>
                    <h2 className="font-black uppercase tracking-tighter text-slate-950 text-4xl md:text-5xl">
                      Materials &amp; Specs.
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                    >
                      <p className="mb-3 font-black uppercase tracking-widest text-amber-600 text-[9px]">
                        {key}
                      </p>
                      <p className="text-lg font-bold leading-tight text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
              <div className="space-y-12 lg:col-span-4">
                {timeline.length > 0 && (
                  <div>
                    <span className="mb-4 block font-black uppercase tracking-[0.4em] text-amber-600 text-[10px]">
                      Milestones
                    </span>
                    <h2 className="mb-10 font-black uppercase tracking-tighter text-slate-950 text-4xl">
                      Project Timeline.
                    </h2>

                    <div className="relative space-y-0">
                      <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-100" />
                      {timeline.map((t) => (
                        <div
                          key={t.phase}
                          className="relative pl-10 pb-12 last:pb-0"
                        >
                          <div className="absolute left-0 top-1 z-10 h-4 w-4 rounded-full border-2 border-amber-500 bg-white" />
                          <p className="mb-1 font-mono text-[10px] text-slate-400">
                            {t.date}
                          </p>
                          <p className="font-black uppercase tracking-widest text-slate-900 text-sm">
                            {t.phase}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-[2rem] bg-amber-500 p-8 text-slate-950">
                  <Clock className="mb-6" size={24} />
                  <h4 className="mb-4 font-black uppercase leading-none tracking-tighter text-xl">
                    Accelerated Delivery.
                  </h4>
                  <p className="text-sm font-medium leading-relaxed opacity-80">
                    Utilizing BIM modeling and pre-fabricated structural
                    components, this project maintained a 15% faster timeline
                    than industry averages.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <span className="mb-8 block font-black uppercase tracking-[0.4em] text-amber-600 text-[10px]">
                  Site Imagery
                </span>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100"
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 transition-colors group-hover:bg-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-10 font-black uppercase leading-none tracking-tighter text-white text-4xl md:text-6xl">
              Interested in <span className="text-amber-500">Scaling</span> with
              us?
            </h2>
            <button
              type="button"
              className="rounded-full bg-amber-500 px-12 py-5 font-black uppercase tracking-[0.2em] text-slate-950 transition-colors hover:bg-white text-xs"
            >
              Request Project Briefing
            </button>
          </div>
        </div>

        <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/5 bg-slate-950 px-6 py-12 font-mono uppercase tracking-[0.3em] text-white/40 md:flex-row text-[9px]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            © 2024 UNIT_ARCHITECTURE // GLOBAL_OPERATIONS
          </div>
          <div className="flex gap-8">
            <span className="cursor-pointer text-white transition-colors hover:text-amber-500">
              BIM_DATA_SHEET
            </span>
            <span className="cursor-pointer text-white transition-colors hover:text-amber-500">
              QA_COMPLIANCE
            </span>
            <span>Technical_Sheet_{project.id}</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

const ProjectCard = forwardRef<
  HTMLDivElement,
  { project: Project; index: number; onClick?: (project: Project) => void }
>(({ project, index, onClick }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      // once: false ensures it triggers when scrolling UP as well
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.4 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(project)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(project);
              }
            }
          : undefined
      }
      className={`relative group mb-24 cursor-pointer lg:mb-32 ${index % 2 === 1 ? "lg:mt-48" : ""}`}
    >
      <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4] bg-zinc-900 shadow-2xl">
        <motion.div
          className="absolute inset-0 z-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            width={1200}
            height={1200}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px]" />
          </div>
        </motion.div>

        <div className="absolute left-8 top-8 z-20">
          <span className="rounded-full border border-white/10 bg-white/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
            {project.status}
          </span>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-2xl">
            <Maximize2 size={24} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between px-4">
        <div>
          <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-widest text-amber-600">
            {`0${index + 1} // ${project.category}`}
          </span>
          <motion.h3
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black uppercase leading-none tracking-tighter text-slate-950 transition-colors group-hover:text-amber-600 lg:text-5xl"
          >
            {project.title}
          </motion.h3>
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-slate-400">
            {project.location}
          </p>
        </div>
        <motion.div
          animate={{ x: isHovered ? 10 : 0, rotate: isHovered ? -45 : 0 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-all group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white"
        >
          <MoveRight className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Gallery = () => {
  const CATEGORIES: Category[] = ["All", "Townhouse", "Subdivision", "Luxury"];
  const RESIDENTIAL_PORTFOLIO: Project[] = [
    {
      id: "RS-101",
      title: "Pineglades Townhouse",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1200",
      location: "GSIS Village, Project 8, Quezon City",
      area: "297 SQM",
      light: "85%",
      status: "Completed",
      description:
        "Modern three-bedroom townhouse in Quezon City with open-plan living, natural light, and DPWH-compliant structural design.",
      longDescription:
        "A shift towards sustainable urban living in Metro Manila, featuring a double-height atrium that maximizes natural ventilation and daylight. The structure utilizes high-performance glazing to maintain thermal comfort in the tropical climate while providing views of the Quezon City skyline.",
      features: [
        "Solar-Ready Roof",
        "Low-E Double Pane Glazing",
        "Smart Home Ready",
        "Rainwater Harvesting",
      ],
      specs: {
        concrete: "Grade 40 High-Strength (DPWH)",
        glazing: "Low-E Double Pane",
        flooring: "Engineered Narra / Oak",
        insulation: "R-38 Bio-based Batts",
      },
      metrics: [
        { label: "Energy Savings", value: "32%", icon: "Zap" },
        { label: "Carbon Footprint", value: "-15%", icon: "Leaf" },
        { label: "Safety Rating", value: "A+", icon: "ShieldCheck" },
      ],
      timeline: [
        { phase: "Groundbreaking", date: "Jan 2023" },
        { phase: "Structural Topping", date: "Aug 2023" },
        { phase: "Finishing & Turnover", date: "Dec 2023" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "RS-102",
      title: "Hana Heights Subdivision",
      category: "Subdivision",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200",
      location: "Trece Martires City, Cavite",
      area: "42 Units",
      light: "92%",
      status: "Pre-Selling",
      description:
        "Family-friendly subdivision in Cavite with tree-lined streets, pocket parks, and easy access to Manila and Tagaytay.",
      longDescription:
        "A master-planned community in Cavite focused on social connectivity and pedestrian safety. Every unit is designed with a private garden and access to shared amenities, emphasizing a village-in-the-city concept within reach of Metro Manila.",
      features: [
        "24/7 Security",
        "Central Park & Playground",
        "Underground Utilities",
        "Fiber Optic Ready",
      ],
      specs: {
        pavement: "Permeable Interlocking Pavers",
        lighting: "LED Smart Streetlights",
        drainage: "Zero-Runoff Bio-swales",
        security: "AI-Integrated Perimeter",
      },
      metrics: [
        { label: "Green Space", value: "40%", icon: "Leaf" },
        { label: "Walkability Score", value: "92", icon: "HardHat" },
        { label: "Property Value Est.", value: "+18%", icon: "Scale" },
      ],
      timeline: [
        { phase: "Land Development", date: "Mar 2024" },
        { phase: "Utility Laying", date: "June 2024" },
        { phase: "Phase 1 Turnover", date: "Q1 2025" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "RS-103",
      title: "Nuvali Bungalow",
      category: "Luxury",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      location: "Nuvali, Santa Rosa, Laguna",
      area: "390 SQM",
      light: "100%",
      status: "In Progress",
      description:
        "Single-storey luxury bungalow in Nuvali with indoor-outdoor living, covered terraces, and resort-style amenities.",
      longDescription:
        "Designed for the ultimate retreat south of Manila, the Nuvali Bungalow blurs the lines between interior and exterior, utilizing seamless glass and locally-sourced materials suited to the Philippine tropical climate.",
      features: [
        "Infinity Pool",
        "Garden View Deck",
        "Privacy Landscaping",
        "Outdoor Kitchen",
      ],
      specs: {
        cladding: "Honed Capiz Shell / Stone",
        roofing: "Standing Seam Metal",
        automation: "Control4 Integration",
        HVAC: "Inverter Split + Natural Ventilation",
      },
      metrics: [
        { label: "Daylight Factor", value: "100%", icon: "Zap" },
        { label: "Seismic Rating", value: "Zone 4", icon: "ShieldCheck" },
        { label: "Local Materials", value: "65%", icon: "Leaf" },
      ],
      timeline: [
        { phase: "Site Excavation", date: "Sept 2024" },
        { phase: "Superstructure", date: "In Progress" },
        { phase: "Final Handover", date: "Aug 2025" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "RS-104",
      title: "Mandala Residences",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200",
      location: "Mandaluyong City, Metro Manila",
      area: "195 SQM",
      light: "70%",
      status: "Planning",
      description:
        "Contemporary townhomes in Mandaluyong designed for growing families and professionals, with walkable access to BGC and Ortigas.",
      longDescription:
        "Urban density reimagined in the heart of Metro Manila with vertical gardens and modular interior walls that adapt to the changing needs of professional inhabitants.",
      features: [
        "Walkability Score: 98",
        "Rooftop Garden",
        "Modular Interiors",
        "Bike & Motorcycle Storage",
      ],
      specs: {
        concrete: "Grade 40 (DPWH)",
        glazing: "Low-E Double Pane",
        flooring: "Porcelain / Engineered Wood",
        insulation: "R-30 Batts",
      },
      metrics: [
        { label: "Transit Proximity", value: "5 min", icon: "HardHat" },
        { label: "Green Certification", value: "BERDE Ready", icon: "Leaf" },
        { label: "Safety Rating", value: "A+", icon: "ShieldCheck" },
      ],
      timeline: [
        { phase: "Permits & ECC", date: "Q2 2025" },
        { phase: "Groundbreaking", date: "Q4 2025" },
        { phase: "Target Turnover", date: "2027" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "RS-105",
      title: "Twin Oaks Duplex",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      location: "General Trias, Cavite",
      area: "288 SQM",
      light: "95%",
      status: "Completed",
      description:
        "Side-by-side duplex in Cavite ideal for multi-generational living or rental income, each with private entry and parking.",
      longDescription:
        "A symmetrical architectural study in privacy and light in one of Cavite's fastest-growing corridors, providing independent living quarters without sacrificing shared aesthetic cohesion.",
      features: [
        "Dual Entry",
        "Soundproof Party Walls",
        "Independent HVAC",
        "Rental-Optimized Layout",
      ],
      specs: {
        concrete: "Grade 40 (DPWH)",
        roofing: "Long-Span Metal",
        flooring: "Tiles / Engineered Wood",
        insulation: "R-38 Batts",
      },
      metrics: [
        { label: "Energy Savings", value: "28%", icon: "Zap" },
        { label: "Seismic Zone", value: "4", icon: "ShieldCheck" },
        { label: "Rental Yield Est.", value: "6.5%", icon: "Scale" },
      ],
      timeline: [
        { phase: "Groundbreaking", date: "Feb 2023" },
        { phase: "Structural Topping", date: "Oct 2023" },
        { phase: "Turnover", date: "Mar 2024" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687940-477a6373990b?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      id: "RS-106",
      title: "Cerulean Estate",
      category: "Subdivision",
      image:
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80&w=1200",
      location: "General Trias City, Cavite",
      area: "96 Homes",
      light: "88%",
      status: "Phase 1 Ready",
      description:
        "Master-planned house-and-lot community in Cavite with walking paths, shared green spaces, and clubhouse amenities.",
      longDescription:
        "Expansive residential landscape in Cavite designed to integrate with the natural typography of the corridor, preserving green belts and offering a 25-hectare premium development within reach of Metro Manila.",
      features: [
        "Lake & Park Access",
        "Preserved Green Belts",
        "Community Center",
        "Underground Drainage",
      ],
      specs: {
        pavement: "Concrete & Permeable Pavers",
        lighting: "LED Streetlights",
        drainage: "Separate Storm & Sewer",
        security: "Gated 24/7",
      },
      metrics: [
        { label: "Green Space", value: "35%", icon: "Leaf" },
        { label: "Walkability", value: "90", icon: "HardHat" },
        { label: "Phase 1 Units", value: "96", icon: "Scale" },
      ],
      timeline: [
        { phase: "Land Dev. Complete", date: "2024" },
        { phase: "Phase 1 Construction", date: "In Progress" },
        { phase: "Phase 1 Turnover", date: "2026" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
      ],
    },
  ];
  const [filter, setFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered =
    filter === "All"
      ? RESIDENTIAL_PORTFOLIO
      : RESIDENTIAL_PORTFOLIO.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative bg-white py-32 lg:py-40"
    >
      <div className="absolute top-0 right-0 -z-10 hidden h-full w-1/3 bg-slate-50 lg:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-32">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-amber-500" />
              <span className="font-black uppercase tracking-[0.4em] text-amber-600 text-[10px]">
                Portfolio // Index 2024
              </span>
            </div>
            <h2 className="font-black uppercase leading-[0.8] tracking-tighter text-slate-950 text-6xl md:text-8xl">
              Advanced
              <br />
              Living.
            </h2>
            <p className="mt-8 max-w-sm font-medium uppercase leading-relaxed tracking-widest text-slate-500 text-[11px]">
              Synthesizing architectural vision with engineering precision to
              deliver spaces of enduring value across Metro Manila and Luzon.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full border px-8 py-4 font-mono text-[10px] uppercase tracking-widest transition-all ${
                  filter === c
                    ? "border-slate-950 bg-slate-950 font-bold text-white shadow-xl shadow-slate-950/20"
                    : "border-slate-200 bg-white text-slate-400 shadow-sm hover:border-slate-950 hover:text-slate-950"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2 lg:gap-x-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
