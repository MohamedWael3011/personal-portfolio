import { useContext, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILL_BUBBLES } from "../../data/content";
import StackIcon from "tech-stack-icons";
import { ThemeContext } from "../../contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const theme = useContext(ThemeContext);
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = sectionRef.current as HTMLElement | null;
      if (!el) return;

      const items = el.querySelectorAll("ul > li");
      gsap.from(items, {
        y: -24,
        opacity: 0,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="pb-8 pt-30 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">Skills</h2>

      <div className="flex items-center justify-center py-6">
        <ul className="grid grid-cols-3 sm:grid-cols-6 gap-6 place-items-center">
          {SKILL_BUBBLES.map((skill) => (
            <li key={skill.label} className="flex flex-col items-center">
              <div
                className="skill-bubble w-16 h-16 sm:w-20 sm:h-20 rounded-full grid place-items-center bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2"
                style={{ borderColor: skill.color }}
                title={skill.label}
              >
                <StackIcon
                  name={skill.content}
                  className="w-10 h-10"
                  variant={theme?.theme}
                />
              </div>
              <span className="mt-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                {skill.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
