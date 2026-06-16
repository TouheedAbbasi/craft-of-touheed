import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/touheed-hero.asset.json";
import socialImg from "@/assets/touheed-social.png.asset.json";
import auraStudio from "@/assets/aura-studio.asset.json";
import neoncode from "@/assets/neoncode.asset.json";
import estate from "@/assets/estate.asset.json";
import voyages from "@/assets/voyages.asset.json";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

type Project = {
  no: string;
  title: string;
  desc: string;
  url: string;
  img: string;
  tags: string[];
};

const projects: Project[] = [
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

const stack = [
  "HTML5", "CSS3", "JavaScript", "GSAP", "React",
  "Tailwind CSS", "PHP", "TypeScript", "Framer Motion", "Three.js",
];

const projectLayouts = [
  "col-span-12 lg:col-span-8 lg:col-start-1",
  "col-span-12 lg:col-span-5 lg:col-start-8",
  "col-span-12 lg:col-span-7 lg:col-start-2",
  "col-span-12 lg:col-span-9 lg:col-start-3",
];

const socials = [
  {
    label: "Direct Wire Connection",
    sub: "WhatsApp Concierge · +92 323 216 4783",
    href: "https://wa.me/923232164783",
    code: "01",
  },
  {
    label: "Instagram Archive",
    sub: "@still_touheed",
    href: "https://www.instagram.com/still_touheed?igsh=MXJ6bnlwcW16OHN3bA==",
    code: "02",
  },
  {
    label: "Facebook Instance",
    sub: "Personal Network",
    href: "https://www.facebook.com/profile.php?id=100082503683967",
    code: "03",
  },
];

/* ─── Custom cursor (desktop only) ─────────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let rx = 0, ry = 0, x = 0, y = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      }
    };

    // ring follows with easing
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = t.closest('a,button,[data-cursor="hover"]');
      ring.current?.classList.toggle("is-hover", !!hover);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ─── Reveal-on-scroll observer ────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Primitives ───────────────────────────────────────────────── */
function HeroTitle() {
  const words = ["TOUHEED", "ABBASI"];
  let charIndex = 0;

  return (
    <h1 className="flex flex-wrap gap-x-[2vw] gap-y-0 font-head uppercase tracking-tight text-[9vw] leading-[0.9] sm:text-[11vw] md:text-[10vw]">
      {words.map((word, wi) => (
        <span key={wi} className="whitespace-nowrap">
          {word.split("").map((c, i) => (
            <span
              key={i}
              className="letter"
              style={{ animationDelay: `${0.25 + charIndex++ * 0.06}s` }}
            >
              {c}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-6px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`tilt ${className}`}>
      {children}
    </div>
  );
}

const Tick = ({ pos }: { pos: string }) => <span className={`tick ${pos}`} aria-hidden />;

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative border border-border bg-surface ${className}`}
      style={{ background: "var(--surface)" }}
    >
      <Tick pos="-top-[5px] -left-[5px]" />
      <Tick pos="-top-[5px] -right-[5px]" />
      <Tick pos="-bottom-[5px] -left-[5px]" />
      <Tick pos="-bottom-[5px] -right-[5px]" />
      {children}
    </div>
  );
}

/* ─── Sections ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div
          className="flex items-center justify-between border border-border px-5 py-3 backdrop-blur-xl"
          style={{ background: "rgba(8,8,8,0.55)" }}
        >
          <a href="#top" className="font-display text-2xl italic tracking-tight">
            T<span style={{ color: "var(--gold)" }}>·</span>A
          </a>

          <nav className="hidden items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            <a href="#work" className="transition-colors hover:text-[var(--gold)]">Work</a>
            <a href="#about" className="transition-colors hover:text-[var(--gold)]">About</a>
            <a href="#connect" className="transition-colors hover:text-[var(--gold)]">Connect</a>
          </nav>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
            <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-green-400" />
            <span className="hidden sm:inline">Available for Work</span>
            <span className="sm:hidden">Open</span>
            <span style={{ color: "var(--gold)" }}>✦</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroMeta() {
  return (
    <div
      className="grid grid-cols-12 items-end gap-x-4 gap-y-6 font-mono text-[11px] uppercase tracking-[0.2em]"
      style={{ color: "var(--gold)" }}
    >
      <div className="col-span-6 flex flex-col gap-1 md:col-span-3">
        <span className="text-[var(--muted)]">[ Issue ]</span>
        <span>Vol.01 / MMXXVI</span>
      </div>
      <div className="col-span-6 flex flex-col gap-1 md:col-span-3">
        <span className="text-[var(--muted)]">[ Locus ]</span>
        <span>KHI · 24°51′N · 67°00′E</span>
      </div>
      <div className="col-span-3 hidden flex-col gap-1 md:flex">
        <span className="text-[var(--muted)]">[ Practitioner ]</span>
        <span className="text-[var(--foreground)]">Touheed Abbasi · Æ 18</span>
      </div>
      <div className="col-span-3 hidden flex-col items-end gap-1 md:flex">
        <span className="text-[var(--muted)]">[ Discipline ]</span>
        <span className="text-[var(--foreground)]">Design × Engineering</span>
      </div>
    </div>
  );
}

function HeroPortrait() {
  return (
    <Frame className="p-3">
      <div
        className="mb-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--gold)" }}
      >
        <span>FIG · 001</span>
        <span className="text-[var(--muted)]">PORTRAIT / FILM</span>
      </div>

      <div className="relative overflow-hidden">
        <img
          src={portrait.url}
          alt="Portrait of Touheed Abbasi"
          className="aspect-[3/4] w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ background: "linear-gradient(180deg, transparent 60%, #080808)" }}
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
          <span>Touheed / Karachi</span>
          <span style={{ color: "var(--gold)" }}>MMXXVI</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <div className="border-t border-border pt-2">
          <div className="text-sm text-[var(--foreground)]">04</div>Years
        </div>
        <div className="border-t border-border pt-2">
          <div className="text-sm text-[var(--foreground)]">47+</div>Builds
        </div>
        <div className="border-t border-border pt-2">
          <div className="text-sm text-[var(--foreground)]">∞</div>Pixels
        </div>
      </div>
    </Frame>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <HeroMeta />

        <div className="mt-10 grid grid-cols-12 gap-4 md:mt-14 md:gap-6">
          <div className="relative col-span-12 lg:col-span-8">
            <div className="flex flex-col gap-2 md:gap-4">
              <p
                className="font-display text-[8vw] italic leading-[0.85] text-balance md:text-[7.2vw]"
                style={{ color: "var(--foreground)" }}
              >
                Next<span style={{ color: "var(--gold)" }}>—</span>Gen
              </p>

              <HeroTitle />

              <p className="pl-[6vw] font-display text-[8vw] italic leading-[0.85] md:pl-[14vw] md:text-[7.2vw]">
                <span
                  className="mr-3 align-middle font-head text-[4vw] not-italic md:text-[3.4vw]"
                  style={{ color: "var(--gold)" }}
                >
                  §
                </span>
                Craftsmanship.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-12 items-start gap-4">
              <div className="col-span-12 md:col-span-5">
                <p className="max-w-md text-sm leading-relaxed text-[var(--foreground)]/80 md:text-base">
                  A private studio of one — sculpting bespoke, magazine-grade interfaces for brands that refuse to look like anyone else.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-3 border border-[var(--violet)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all hover:bg-[var(--violet)]"
                  >
                    View Lookbook
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href="#connect"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[var(--gold)] underline-offset-4"
                  >
                    Commission
                  </a>
                </div>
              </div>

              <div className="col-span-3 col-start-9 hidden font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[var(--muted)] md:block">
                <div className="border-t border-border pt-3">
                  <div>Folio №</div>
                  <div className="mt-1 text-base text-[var(--gold)]">004 / 047</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <article
      className={`reveal group ${projectLayouts[i]}`}
      style={{ animationDelay: `${i * 80}ms` }}
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span style={{ color: "var(--gold)" }}>{p.no}</span>
        <span className="text-[var(--muted)]">{String(i + 1).padStart(2, "0")} / 04</span>
      </div>

      <Tilt>
        <Frame className="p-3">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden bg-black">
              <img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div
              className="absolute left-4 top-4 border border-[var(--gold)]/40 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm"
              style={{ color: "var(--gold)" }}
            >
              ● LIVE
            </div>
          </a>
        </Frame>
      </Tilt>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7">
          <h3 className="font-display text-4xl italic leading-[0.95] md:text-6xl">{p.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
            {p.tags.map((t) => (
              <span key={t} className="border border-border px-2 py-1 text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-12 flex flex-col justify-between gap-4 md:col-span-5">
          <p className="text-sm leading-relaxed text-[var(--foreground)]/75 md:text-[15px]">
            {p.desc}
          </p>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-between gap-3 border border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-all hover:border-[var(--violet)] hover:bg-[var(--violet)]/10"
          >
            <span>Visit Live Site</span>
            <span
              className="transition-transform group-hover/btn:translate-x-1"
              style={{ color: "var(--gold)" }}
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Work() {
  useReveal();

  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: "var(--gold)" }}
            >
              § Lookbook / Selected Artifacts
            </p>
            <h2 className="mt-4 font-display text-5xl italic leading-[0.95] md:text-7xl">
              Recent <span className="font-head uppercase not-italic">Builds</span>
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] md:block">
            <div>Scroll · ↓</div>
            <div className="mt-1 text-[var(--foreground)]">04 of 04</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section id="about" className="overflow-hidden border-y border-border py-24 md:py-32">
      <div className="marquee relative">
        <div className="marquee-track flex gap-16 whitespace-nowrap will-change-transform">
          {/* tripled for seamless loop */}
          {[...stack, ...stack, ...stack].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-16 font-display text-[14vw] italic leading-none md:text-[10vw]"
            >
              {s}
              <span className="font-head text-[6vw] not-italic text-[var(--gold)] md:text-[4vw]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1600px] grid-cols-12 gap-8 px-5 md:px-10">
        <div
          className="col-span-12 font-mono text-[11px] uppercase tracking-[0.25em] md:col-span-3"
          style={{ color: "var(--gold)" }}
        >
          § Manifesto / 01
        </div>
        <p className="col-span-12 font-display text-3xl italic leading-[1.15] text-balance md:col-span-9 md:text-5xl">
          18-year-old developer{" "}
          <span className="font-head uppercase not-italic text-[var(--foreground)]">sculpting</span>{" "}
          luxury aesthetics on the web —{" "}
          <span style={{ color: "var(--gold)" }}>from Karachi, Pakistan</span>.
        </p>
      </div>
    </section>
  );
}

function SocialIcon({ i }: { i: number }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-[var(--gold)]",
  };

  if (i === 0)
    return (
      <svg {...common}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.6-5.7A8.38 8.38 0 0 1 3.5 11.5a8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );

  if (i === 1)
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );

  return (
    <svg {...common}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Connect() {
  return (
    <section id="connect" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid grid-cols-12 gap-6">
          <p
            className="col-span-12 font-mono text-[11px] uppercase tracking-[0.25em] md:col-span-3"
            style={{ color: "var(--gold)" }}
          >
            § Communications Hub
          </p>
          <h2 className="col-span-12 font-display text-5xl italic leading-[0.9] md:col-span-9 md:text-8xl">
            Let's build something{" "}
            <span className="font-head uppercase not-italic">unforgettable.</span>
          </h2>
        </div>

        <Frame className="p-3 md:p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="relative overflow-hidden">
              <img
                src={socialImg.url}
                alt="Touheed Abbasi — Creative Portrait"
                className="aspect-square w-full object-cover md:aspect-[4/5]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.65) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                <span>Fig · 002</span>
                <span style={{ color: "var(--gold)" }}>Social Identity</span>
              </div>
            </div>

            <div className="flex flex-col">
              {socials.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-1 flex-col justify-between gap-6 p-6 transition-all hover:bg-[var(--violet)]/8 md:p-8 ${
                    i !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                    <span style={{ color: "var(--gold)" }}>CH · {l.code}</span>
                    <span className="text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="font-head text-lg uppercase leading-tight tracking-[0.18em] md:text-xl">
                        {l.label}
                      </div>
                      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                        {l.sub}
                      </div>
                    </div>
                    <div className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100">
                      <SocialIcon i={i} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Frame>

        <div className="mt-20 grid grid-cols-12 items-end gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <div className="col-span-6 md:col-span-3">© MMXXVI · Touheed Abbasi</div>
          <div className="col-span-6 md:col-span-3">Karachi · Pakistan · UTC+5</div>
          <div className="col-span-3 hidden md:block" style={{ color: "var(--gold)" }}>
            Folio Vol.01 — All Rights Reserved
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <a
              href="#top"
              className="underline decoration-[var(--gold)] underline-offset-4"
            >
              ↑ Return to top
            </a>
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
