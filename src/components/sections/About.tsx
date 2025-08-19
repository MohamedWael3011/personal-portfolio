import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROFILE } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const BASE_URL = import.meta.env.BASE_URL;
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = sectionRef.current as HTMLElement | null;
      if (!el) return;

      const title = el.querySelector(".section_title");
      const image = el.querySelector(".about_img");
      const data = el.querySelector(".about_data");

      gsap.from([title, image, data], {
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
      id="about"
      ref={sectionRef}
      className="my-24 md:my-28 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">About Me</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <div className="about_img flex-shrink-0">
          <img
            src={`${BASE_URL}assets/aboutme.webp`}
            alt="Mohamed Wael"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
            loading="lazy"
          />
        </div>

        <div className="about_data bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300 flex-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {PROFILE.name}
              </h3>
              <p className="text-lg text-indigo-600 dark:text-purple-500 font-medium mb-4">
                {PROFILE.role}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {PROFILE.summaryOne}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {PROFILE.summaryTwo}
              </p>
            </div>

            <div className="pt-4">
              <a
                href={PROFILE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
