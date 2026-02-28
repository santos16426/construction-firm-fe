import { Quote, Star } from "lucide-react";
import React from "react";
import Image from "next/image";

const Testimonials = () => {
  const TESTIMONIALS = [
    {
      name: "Samantha Johnson",
      role: "CEO, Vanguard Spire",
      text: "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable partner.",
      avatar: "https://i.pravatar.cc/150?u=sam",
    },
    {
      name: "Isabella Rodriguez",
      role: "Co-founder, Ironbound",
      text: "Their ability to capture our brand essence in every structural project is unparalleled - an invaluable collaborator.",
      avatar: "https://i.pravatar.cc/150?u=isa",
    },
    {
      name: "John Peter",
      role: "Director, Monolith Tech",
      text: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    {
      name: "Natalie Martinez",
      role: "Lead Engineer, Urban Hub",
      text: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
      avatar: "https://i.pravatar.cc/150?u=nat",
    },
    {
      name: "Victoria Thompson",
      role: "VP of Dev, Riverside",
      text: "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended.",
      avatar: "https://i.pravatar.cc/150?u=vic",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold mb-8 shadow-lg shadow-zinc-200">
          <Star className="w-4 h-4 text-blue-500 fill-blue-500" /> Rated 4.9/5
          by over 200 developers
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-950">
          Words of praise from others <br /> about our presence.
        </h2>
      </div>

      {/* Row 1: Sliding Left to Right */}
      <div className="relative mb-6">
        <div className="flex gap-6 animate-infinite-scroll-reverse w-max hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={`row1-${i}`} className="w-[380px]">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Row 2: Sliding Right to Left */}
      <div className="relative">
        <div className="flex gap-6 animate-infinite-scroll w-max hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].reverse().map((t, i) => (
            <div key={`row2-${i}`} className="w-[380px]">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      <style>{`
      @keyframes infinite-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @keyframes infinite-scroll-reverse {
        from { transform: translateX(-50%); }
        to { transform: translateX(0); }
      }
      .animate-infinite-scroll {
        animation: infinite-scroll 45s linear infinite;
      }
      .animate-infinite-scroll-reverse {
        animation: infinite-scroll-reverse 45s linear infinite;
      }
    `}</style>
    </section>
  );
};

function TestimonialCard({
  name,
  role,
  text,
  avatar,
}: {
  name: string;
  role: string;
  text: string;
  avatar: string;
}) {
  return (
    <div className="bg-zinc-50/50 p-8 rounded-2xl border border-zinc-100 flex flex-col h-full shadow-sm">
      <Quote className="w-8 h-8 text-blue-600 mb-6 fill-blue-500 opacity-20" />
      <p className="text-slate-700 font-medium leading-relaxed mb-8 flex-1">
        {text}
      </p>
      <div className="flex items-center gap-4 mt-auto">
        <Image
          width={48}
          height={48}
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <h4 className="font-bold text-sm text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500 font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}

TestimonialCard.displayName = "TestimonialCard";

export default Testimonials;
