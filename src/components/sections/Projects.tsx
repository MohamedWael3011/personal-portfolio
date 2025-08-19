import { Github } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../../data/content";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(section, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "sine.inOut",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // If images load later, recalc positions to avoid stuck triggers
      const images = section.querySelectorAll<HTMLImageElement>("img");
      images.forEach((img) => {
        if (img.complete) return;
        img.addEventListener(
          "load",
          () => {
            ScrollTrigger.refresh();
          },
          { once: true }
        );
      });
    },
    { scope: sectionRef }
  );

  const getCardMetrics = () => {
    const track = trackRef.current;
    if (!track) return { cardWidth: 360, gap: 16 };
    const card = track.querySelector<HTMLDivElement>("[data-card]");
    const cardWidth = card ? card.clientWidth : 360;
    const gap = 16;
    return { cardWidth, gap };
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const { cardWidth, gap } = getCardMetrics();
    const x = index * (cardWidth + gap);
    gsap.to(track, {
      duration: 0.5,
      ease: "sine.inOut",
      scrollTo: { x, autoKill: true },
      onComplete: () => setActiveIdx(index),
    });
  };

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { cardWidth, gap } = getCardMetrics();
    const idx = Math.round(track.scrollLeft / (cardWidth + gap));
    const safeIdx = Math.max(0, Math.min(PROJECTS.length - 1, idx));
    setActiveIdx(safeIdx);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll: EventListener = () => updateActiveIndex();
    const onResize: EventListener = () => updateActiveIndex();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateActiveIndex();
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateActiveIndex]);

  const showDots = PROJECTS.length > 1;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="my-24 md:my-28 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">Projects</h2>

      <div className="relative overflow-visible">
        <div
          ref={trackRef}
          className="w-full flex flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-1"
          style={{ scrollBehavior: "auto" }}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              data-card
              className="snap-start group w-[320px] sm:w-[360px] flex-shrink-0 rounded-xl p-5 bg-white dark:bg-gray-800 min-h-[260px] flex flex-col transition duration-300 hover:-translate-y-1 shadow-lg"
              style={{ willChange: "transform, opacity" }}
            >
              {project.imageUrl && (
                <div className="mb-3 -mt-1">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-36 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm text-gray-700 dark:text-gray-300 hover:text-white transition"
                  style={{
                    borderColor: "#e5e7eb",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "#111827";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "transparent";
                  }}
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              )}
            </div>
          ))}
        </div>

        {showDots && (
          <div className="flex justify-center mt-4 gap-2 md:hidden">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={
                  "h-2 rounded-full transition-all " +
                  (activeIdx === i
                    ? "w-5 bg-gray-800 dark:bg-gray-200"
                    : "w-2 bg-gray-300 dark:bg-gray-600")
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
