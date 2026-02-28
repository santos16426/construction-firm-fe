import { HardHat } from "lucide-react";

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => (
  <nav
    className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-black/95 backdrop-blur-xl py-4 border-b border-white/10" : "bg-transparent py-10"}`}
  >
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rounded-lg shadow-lg">
          <HardHat className="w-5 h-5 text-slate-900" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase">
          Construction<span className="text-amber-500">Firm</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-10">
        {["Services", "Projects", "About"].map((item) => (
          <a
            key={item}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-amber-500 cursor-pointer transition-colors"
          >
            {item}
          </a>
        ))}
        <button className="bg-amber-500 text-slate-900 px-8 py-3 font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg">
          Get Quote
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
