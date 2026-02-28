import {
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Zap size={24} className="text-slate-950 fill-current" />
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter">
                Construction Firm
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              Pioneering sustainable infrastructure and high-performance
              residential developments since 1998. Engineering the future, one
              site at a time.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-8 text-amber-500">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Residential Design",
                "Commercial Build",
                "Structural Engineering",
                "Renovations",
                "Project Management",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-8 text-amber-500">
              Resources
            </h4>
            <ul className="space-y-4">
              {[
                "Case Studies",
                "Process",
                "Safety Standards",
                "Materials Guide",
                "Careers",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-8 text-amber-500">
              Contact
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm">
                  452 Industrial Parkway,
                  <br />
                  Suite 200, Seattle, WA 98101
                </p>
              </li>
              <li className="flex gap-4">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm">+1 (555) 000-1234</p>
              </li>
              <li className="flex gap-4">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm">
                  contact@constructionfirm.com
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Construction Firm. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-amber-500 text-xs font-mono uppercase tracking-widest transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
