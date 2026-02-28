import { AnimatePresence, motion } from "framer-motion";
import { MapPin, MoveRight } from "lucide-react";
import { forwardRef, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

type Category = "All" | "Townhouse" | "Subdivision" | "Luxury";

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
}

const ProjectCard = forwardRef<
  HTMLDivElement,
  { project: Project; index: number }
>(({ project, index }, ref) => {
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
      className={`relative group mb-24 lg:mb-32 ${index % 2 === 1 ? "lg:mt-48" : ""}`}
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

        <div className="absolute top-8 left-8 z-20">
          <div className="flex gap-2 items-center text-[10px] font-mono text-white mb-2">
            <span className="w-8 h-[1px] bg-amber-500/50" />
            {project.id} --- {project.category.toUpperCase()}
          </div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-end"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                  maskImage: "linear-gradient(to top, black, transparent)",
                }}
              />

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-[8px] uppercase tracking-widest text-white mb-1"
                    >
                      Living Area
                    </motion.p>
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0, transition: { delay: 0.1 } }}
                      className="text-sm font-mono text-white"
                    >
                      {project.area}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-[8px] uppercase tracking-widest text-white mb-1"
                    >
                      Lux Level
                    </motion.p>
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0, transition: { delay: 0.1 } }}
                      className="text-sm font-mono text-white"
                    >
                      {project.light}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-[8px] uppercase tracking-widest text-white mb-1"
                    >
                      Status
                    </motion.p>
                    <motion.p
                      initial={{ y: 20 }}
                      animate={{ y: 0, transition: { delay: 0.1 } }}
                      className="text-sm font-mono text-amber-500"
                    >
                      {project.status}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-start mb-4">
          <motion.h3
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tighter group-hover:text-amber-500 transition-colors"
          >
            {project.title}
          </motion.h3>
          <motion.div
            animate={{ x: isHovered ? 10 : 0, rotate: isHovered ? -45 : 0 }}
            className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-900 group-hover:border-amber-500 group-hover:text-amber-500 transition-all"
          >
            <MoveRight className="w-5 h-5" />
          </motion.div>
        </div>
        <p className="text-slate-600 text-sm font-light leading-relaxed max-w-sm">
          {project.description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-amber-500 font-mono text-[10px] uppercase tracking-widest">
          <MapPin className="w-3 h-3" /> {project.location}
        </div>
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
      title: "Nova Townhouse",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1200",
      location: "Northside, Aurora Heights",
      area: "3,200 SQFT",
      light: "85%",
      status: "Completed",
      description:
        "Modern three‑bedroom townhouse with open‑plan living, generous natural light, and energy‑efficient glazing.",
    },
    {
      id: "RS-102",
      title: "Helix Subdivision",
      category: "Subdivision",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200",
      location: "Helix Park, West Ridge",
      area: "42 Homes",
      light: "92%",
      status: "Pre‑Selling",
      description:
        "Family‑friendly subdivision with tree‑lined streets, pocket parks, and easy access to daily conveniences.",
    },
    {
      id: "RS-103",
      title: "Quartz Bungalow",
      category: "Luxury",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      location: "Harborline, Coastal Ridge",
      area: "4,200 SQFT",
      light: "100%",
      status: "In Progress",
      description:
        "Single‑storey coastal bungalow with indoor‑outdoor living, covered terraces, and a focus on relaxed entertaining.",
    },
    {
      id: "RS-104",
      title: "Echo Residences",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200",
      location: "Echo Row, City Center",
      area: "2,100 SQFT",
      light: "70%",
      status: "Planning",
      description:
        "Collection of contemporary townhomes in a walkable neighborhood, designed for growing families and professionals.",
    },
    {
      id: "RS-105",
      title: "Prism Duplex",
      category: "Townhouse",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      location: "Twinline, West Side",
      area: "3,100 SQFT",
      light: "95%",
      status: "Completed",
      description:
        "Side‑by‑side duplex ideal for multi‑generational living or rental income, each with its own private entry and parking.",
    },
    {
      id: "RS-106",
      title: "Borealis Estate",
      category: "Subdivision",
      image:
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80&w=1200",
      location: "North Lake District",
      area: "96 Homes",
      light: "88%",
      status: "Phase 1 Ready",
      description:
        "Master‑planned community featuring walking paths, shared green spaces, and thoughtfully planned residential streets.",
    },
  ];
  const [filter, setFilter] = useState<Category>("All");
  const filtered =
    filter === "All"
      ? RESIDENTIAL_PORTFOLIO
      : RESIDENTIAL_PORTFOLIO.filter((p) => p.category === filter);

  return (
    <section className="py-40  bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <SectionHeading
            subtitle="Featured Projects"
            title={
              <>
                Recent
                <br />
                Homes.
              </>
            }
          />
          <div className="md:w-1/3 text-slate-500 font-mono text-[10px] leading-loose uppercase tracking-[0.2em] pt-4">
            Single‑family homes, townhouses, and subdivisions delivered with clear communication and reliable timelines.
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} // Triggers on scroll up too
          className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12"
        >
          <div className="max-w-xl overflow-hidden">
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-8 py-3 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${filter === c ? "bg-amber-500 border-amber-500 text-black font-bold scale-105" : "bg-transparent border-black text-black hover:border-black"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
