import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EDUCATION_ITEMS } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = sectionRef.current as HTMLElement | null;
      if (!el) return;

      const items = el.querySelectorAll("li");
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
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
      id="education"
      ref={sectionRef}
      className="my-24 md:my-28 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">Education</h2>
      <div className="rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
        <ul className="relative">
          <span className="absolute left-[40px] top-6 bottom-6 w-[2px] bg-gray-300 dark:bg-gray-600" />

          {EDUCATION_ITEMS.map((item, idx) => (
            <li key={idx} className="relative pl-20 pb-14 last:pb-0">
              <span className="absolute left-[40px] -translate-x-1/2 top-0 w-10 h-10 rounded-lg grid place-items-center bg-white dark:bg-gray-700 border-2 border-yellow-500 shadow-lg">
                <GraduationCap size={18} className="text-yellow-500" />
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
