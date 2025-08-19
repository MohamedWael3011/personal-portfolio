import { BriefcaseBusiness } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPERIENCE_ITEMS } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const color = "#FF4C60"; // accent color for experience
  const lineColor = "rgba(255,76,96,0.25)";
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = sectionRef.current as HTMLElement | null;
      if (!el) return;

      const items = el.querySelectorAll("li");
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "sine.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="my-24 md:my-28 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">Experience</h2>
      <div className="rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
        <ul className="relative">
          <span
            className="absolute left-[40px] top-6 bottom-6 w-[2px]"
            style={{ backgroundColor: lineColor }}
          />

          {EXPERIENCE_ITEMS.map((item, idx) => (
            <li key={idx} className="relative pl-20 pb-14 last:pb-0">
              <span
                className="absolute left-[40px] -translate-x-1/2 top-0 w-10 h-10 rounded-lg grid place-items-center bg-white dark:bg-gray-700 shadow-lg"
                style={{
                  border: `2px solid ${color}`,
                }}
              >
                <BriefcaseBusiness size={18} color={color} />
              </span>

              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.period}
                </span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-[80ch]">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
