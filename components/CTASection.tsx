import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const CTASection = () => {
  const [formState, setFormState] = useState("idle"); // idle, sending, success

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate API call
    setTimeout(() => setFormState("success"), 1200);
  };

  return (
    <section className="py-40  bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Contact Info & Value Prop */}
          <div className="space-y-8">
            <SectionHeading
              subtitle="Get in Touch"
              title={<>Ready to Start Your Project?</>}
              center
            />

            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Whether you&apos;re looking for a free site inspection or a
              detailed consultation, our team is here to help you build
              something great.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+15550001234"
                className="flex items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-amber-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Call Now
                    </p>
                    <p className="font-bold text-slate-950">
                      +1 (555) 000-1234
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                />
              </a>

              <a
                href="https://wa.me/15550001234"
                className="flex items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      WhatsApp
                    </p>
                    <p className="font-bold text-slate-950">Chat with us</p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
                />
              </a>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-600 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Free Consultation
                  </p>
                  <p className="text-xs text-slate-500">
                    30-min strategy session
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-600 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Site Inspection
                  </p>
                  <p className="text-xs text-slate-500">
                    Zero-cost site visits
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Simple Contact Form */}
          <div className="relative">
            {/* Decorative background circle */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/5 rounded-full blur-3xl" />

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-slate-500 mb-8">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="text-amber-600 font-bold uppercase text-xs tracking-widest hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="space-y-2 text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                        Send a Message
                      </h3>
                      <p className="text-sm text-slate-500 font-medium tracking-tight">
                        Quick response guaranteed.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all resize-none"
                      />
                    </div>

                    <button
                      disabled={formState === "sending"}
                      className="w-full py-5 bg-amber-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-3 hover:bg-slate-950 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 group"
                    >
                      {formState === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          Send Message{" "}
                          <Send
                            size={16}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      <ShieldCheck size={12} className="text-emerald-500" />{" "}
                      Secure Data Encryption
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
