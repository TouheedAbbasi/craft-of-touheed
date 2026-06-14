import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/touheed-portrait.asset.json";
import socialImg from "@/assets/touheed-social.png.asset.json";
import auraStudio from "@/assets/aura-studio.asset.json";
import neoncode from "@/assets/neoncode.asset.json";
import estate from "@/assets/estate.asset.json";
import voyages from "@/assets/voyages.asset.json";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const projects = [
  {
    no: "ARTIFACT 01",
    title: "Aura Studio",
    desc: "Premium luxury e-commerce integrating real-time interactive 3D spatial models, 360° orbital dragging mechanics, and structural crosshair framing.",
    url: "https://aura-studio-core.lovable.app",
    img: auraStudio.url,
    tags: ["3D / R3F", "E-COMMERCE", "MMXXVI"],
  },
  {
    no: "ARTIFACT 02",
    title: "Neoncode Nexus",
    desc: "A cinematic, dark-mode exclusive AI creative studio landing page with advanced bento grids, micro-glow border accents, and typewriter terminal animations.",
    url: "https://neoncode-nexus.lovable.app",
    img: neoncode.url,
    tags: ["AI · STUDIO", "BENTO", "MOTION"],
  },
  {
    no: "ARTIFACT 03",
    title: "Estate Folio",
    desc: "High-end architectural portfolio and digital lookbook featuring staggered geometric grid structures, liquid ease transitions, and minimalist concierge intake forms.",
    url: "https://estate-folio-chic.lovable.app",
    img: estate.url,
    tags: ["ARCHITECTURE", "LOOKBOOK", "EDITORIAL"],
  },
  {
    no: "ARTIFACT 04",
    title: "Aura Voyages",
    desc: "Immersive luxury travel platform using faint topographic map backdrop lines, smooth parallax scrolling, and dynamic hover-reveal destination vectors.",
    url: "https://aura-voyage-dream.lovable.app",
    img: voyages.url,
    tags: ["TRAVEL", "PARALLAX", "ATLAS"],
  },
];

const stack = ["HTML5","CSS3","JavaScript","GSAP","React","Tailwind CSS","PHP","TypeScript","Framer Motion","Three.js"];

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a,button,[data-cursor="hover"]')) ring.current?.classList.add('is-hover');
      else ring.current?.classList.remove('is-hover');
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", over);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", over); };
  }, []);
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HeroTitle() {
  const words = ["TOUHEED", "ABBASI"];
  let charIndex = 0;
  return (
    <h1 className="font-head text-[9vw] sm:text-[11vw] md:text-[10vw] leading-[0.9] tracking-tight uppercase flex flex-wrap gap-x-[2vw] gap-y-0">
      {words.map((word, wi) => (
        <span key={wi} className="whitespace-nowrap">
          {word.split("").map((c, i) => {
            const delay = 0.25 + charIndex++ * 0.06;
            return (
              <span key={i} className="letter" style={{ animationDelay: `${delay}s` }}>
                {c}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-6px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`tilt ${className}`}>{children}</div>;
}

function Tick({ pos }: { pos: string }) { return <span className={`tick ${pos}`} aria-hidden />; }

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-surface border border-border ${className}`} style={{ background: "var(--surface)" }}>
      <Tick pos="-top-[5px] -left-[5px]" />
      <Tick pos="-top-[5px] -right-[5px]" />
      <Tick pos="-bottom-[5px] -left-[5px]" />
      <Tick pos="-bottom-[5px] -right-[5px]" />
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-[1600px] px-5 md:px-10`}>
        <div className="flex items-center justify-between rounded-none border border-border px-5 py-3 backdrop-blur-xl" style={{ background: "rgba(8,8,8,0.55)" }}>
          <a href="#top" className="font-display italic text-2xl tracking-tight">T<span style={{ color: "var(--gold)" }}>·</span>A</a>
          <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em]">
            <a href="#work" className="hover:text-[var(--gold)] transition-colors">Work</a>
            <a href="#about" className="hover:text-[var(--gold)] transition-colors">About</a>
            <a href="#connect" className="hover:text-[var(--gold)] transition-colors">Connect</a>
          </nav>
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]">
            <span className="relative inline-block w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span className="hidden sm:inline">Available for Work</span>
            <span className="sm:hidden">Open</span>
            <span style={{ color: "var(--gold)" }}>✦</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 px-5 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 items-end font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="text-[var(--muted)]">[ Issue ]</span>
            <span>Vol.01 / MMXXVI</span>
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="text-[var(--muted)]">[ Locus ]</span>
            <span>KHI · 24°51′N · 67°00′E</span>
          </div>
          <div className="hidden md:flex col-span-3 flex-col gap-1">
            <span className="text-[var(--muted)]">[ Practitioner ]</span>
            <span className="text-[var(--foreground)]">Touheed Abbasi · Æ 18</span>
          </div>
          <div className="hidden md:flex col-span-3 flex-col gap-1 items-end">
            <span className="text-[var(--muted)]">[ Discipline ]</span>
            <span className="text-[var(--foreground)]">Design × Engineering</span>
          </div>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="flex flex-col gap-2 md:gap-4">
              <p className="font-display italic text-[8vw] md:text-[7.2vw] leading-[0.85] text-balance" style={{ color: "var(--foreground)" }}>
                Next<span style={{ color: "var(--gold)" }}>—</span>Gen
              </p>
              <HeroTitle />
              <p className="font-display italic text-[8vw] md:text-[7.2vw] leading-[0.85] pl-[6vw] md:pl-[14vw]">
                <span className="font-head not-italic text-[4vw] md:text-[3.4vw] align-middle mr-3" style={{ color: "var(--gold)" }}>§</span>
                Craftsmanship.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-4 items-start">
              <div className="col-span-12 md:col-span-5">
                <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-relaxed max-w-md">
                  A private studio of one — sculpting bespoke, magazine-grade interfaces for brands that refuse to look like anyone else.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <a href="#work" className="group inline-flex items-center gap-3 px-5 py-3 border border-[var(--violet)] text-[var(--foreground)] font-mono text-[11px] uppercase tracking-[0.22em] transition-all hover:bg-[var(--violet)]">
                    View Lookbook
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#connect" className="font-mono text-[11px] uppercase tracking-[0.22em] underline underline-offset-4 decoration-[var(--gold)]">Commission</a>
                </div>
              </div>
              <div className="hidden md:block col-span-3 col-start-9 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] leading-relaxed">
                <div className="border-t border-border pt-3">
                  <div>Folio №</div>
                  <div className="text-[var(--gold)] text-base mt-1">004 / 047</div>
                </div>
              </div>
            </div>
          </div>

          {/* Portrait architectural frame */}
          <div className="col-span-12 lg:col-span-4">
            <Frame className="p-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] mb-3 px-1" style={{ color: "var(--gold)" }}>
                <span>FIG · 001</span>
                <span className="text-[var(--muted)]">PORTRAIT / FILM</span>
              </div>
              <div className="relative overflow-hidden">
                <img src={portrait.url} alt="Portrait of Touheed Abbasi" className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ background: "linear-gradient(180deg, transparent 60%, #080808)" }} />
                <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                  <span>Touheed / Karachi</span>
                  <span style={{ color: "var(--gold)" }}>MMXXVI</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                <div className="border-t border-border pt-2"><div className="text-[var(--foreground)] text-sm">04</div>Years</div>
                <div className="border-t border-border pt-2"><div className="text-[var(--foreground)] text-sm">47+</div>Builds</div>
                <div className="border-t border-border pt-2"><div className="text-[var(--foreground)] text-sm">∞</div>Pixels</div>
              </div>
            </Frame>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  useReveal();
  return (
    <section id="work" className="px-5 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>§ Lookbook / Selected Artifacts</p>
            <h2 className="mt-4 font-display italic text-5xl md:text-7xl leading-[0.95]">
              Recent <span className="font-head not-italic uppercase">Builds</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] text-right">
            <div>Scroll · ↓</div>
            <div className="mt-1 text-[var(--foreground)]">04 of 04</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8">
          {projects.map((p, i) => {
            const layouts = [
              "col-span-12 lg:col-span-8 lg:col-start-1",
              "col-span-12 lg:col-span-5 lg:col-start-8",
              "col-span-12 lg:col-span-7 lg:col-start-2",
              "col-span-12 lg:col-span-9 lg:col-start-3",
            ];
            return (
              <article key={p.title} className={`reveal ${layouts[i]} group`} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] mb-4">
                  <span style={{ color: "var(--gold)" }}>{p.no}</span>
                  <span className="text-[var(--muted)]">{String(i + 1).padStart(2, "0")} / 04</span>
                </div>
                <Tilt>
                  <Frame className="p-3">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden">
                      <div className="aspect-[16/10] overflow-hidden bg-black">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
                      </div>
                      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-[var(--gold)]/40 bg-black/40 backdrop-blur-sm" style={{ color: "var(--gold)" }}>● LIVE</div>
                    </a>
                  </Frame>
                </Tilt>
                <div className="mt-6 grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7">
                    <h3 className="font-display italic text-4xl md:text-6xl leading-[0.95]">{p.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-1 border border-border text-[var(--muted)]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-4">
                    <p className="text-sm md:text-[15px] text-[var(--foreground)]/75 leading-relaxed">{p.desc}</p>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center justify-between gap-3 px-4 py-3 border border-border hover:border-[var(--violet)] hover:bg-[var(--violet)]/10 transition-all font-mono text-[11px] uppercase tracking-[0.22em]">
                      <span>Visit Live Site</span>
                      <span className="transition-transform group-hover/btn:translate-x-1" style={{ color: "var(--gold)" }}>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section id="about" className="py-24 md:py-32 border-y border-border overflow-hidden">
      <div className="marquee relative">
        <div className="marquee-track flex gap-16 whitespace-nowrap will-change-transform">
          {[...stack, ...stack, ...stack].map((s, i) => (
            <span key={i} className="font-display italic text-[14vw] md:text-[10vw] leading-none flex items-center gap-16">
              {s}
              <span className="text-[var(--gold)] font-head not-italic text-[6vw] md:text-[4vw]">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 mt-20 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>§ Manifesto / 01</div>
        <p className="col-span-12 md:col-span-9 font-display italic text-3xl md:text-5xl leading-[1.15] text-balance">
          18-year-old developer <span className="font-head not-italic uppercase text-[var(--foreground)]">sculpting</span> luxury aesthetics on the web — <span style={{ color: "var(--gold)" }}>from Karachi, Pakistan</span>.
        </p>
      </div>
    </section>
  );
}

function Connect() {
  const links = [
    { label: "Direct Wire Connection", sub: "WhatsApp Concierge · +92 323 216 4783", href: "https://wa.me/923232164783", code: "01" },
    { label: "Instagram Archive", sub: "@still_touheed", href: "https://www.instagram.com/still_touheed?igsh=MXJ6bnlwcW16OHN3bA==", code: "02" },
    { label: "Facebook Instance", sub: "Personal Network", href: "https://www.facebook.com/profile.php?id=100082503683967", code: "03" },
  ];
  return (
    <section id="connect" className="px-5 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>§ Communications Hub</p>
          <h2 className="col-span-12 md:col-span-9 font-display italic text-5xl md:text-8xl leading-[0.9]">
            Let's build something <span className="font-head not-italic uppercase">unforgettable.</span>
          </h2>
        </div>

        <Frame className="p-3 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Portrait Panel */}
            <div className="relative overflow-hidden">
              <img
                src={socialImg.url}
                alt="Touheed Abbasi — Creative Portrait"
                className="w-full aspect-square md:aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.65) 100%)" }} />
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                <span>Fig · 002</span>
                <span style={{ color: "var(--gold)" }}>Social Identity</span>
              </div>
            </div>

            {/* Links Panel */}
            <div className="flex flex-col">
              {links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 transition-all hover:bg-[var(--violet)]/8 ${i !== 0 ? "border-t border-border" : ""}`}
                >
                  <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                    <span style={{ color: "var(--gold)" }}>CH · {l.code}</span>
                    <span className="text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                  </div>
                  <div>
                    <div className="font-head text-lg md:text-xl uppercase tracking-[0.18em] leading-tight">{l.label}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{l.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Frame>

        <div className="mt-20 grid grid-cols-12 gap-6 items-end font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <div className="col-span-6 md:col-span-3">© MMXXVI · Touheed Abbasi</div>
          <div className="col-span-6 md:col-span-3">Karachi · Pakistan · UTC+5</div>
          <div className="hidden md:block col-span-3" style={{ color: "var(--gold)" }}>Folio Vol.01 — All Rights Reserved</div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <a href="#top" className="underline underline-offset-4 decoration-[var(--gold)]">↑ Return to top</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <main className="relative">
      <Cursor />
      <Nav />
      <Hero />
      <Work />
      <Marquee />
      <Connect />
    </main>
  );
}
