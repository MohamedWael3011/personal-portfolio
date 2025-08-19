import ME from "/assets/Me.png";
import SocialLinksGroup from "../ui/SocialLinksGroup";
import SVGShapes from "../SVGShapes";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(true);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!arrowRef.current) return;
      const tween = gsap.to(arrowRef.current, {
        y: 6,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
      });
      return () => tween.kill();
    },
    { scope: sectionRef }
  );

  const goToAbout = () => {
    const about = document.getElementById("about");
    if (!about) return;
    gsap.to(window, {
      duration: 0.9,
      ease: "power2.out",
      scrollTo: { y: about, autoKill: true },
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center"
    >
      <div className="max-w-[540px] flex flex-col items-center">
        <img
          src={ME}
          alt=""
          className="rounded-full w-32 h-32 object-cover mb-6"
        />
        <h1 className="mb-2">Mohamed Wael</h1>
        {/* Make it with Typed */}
        <span></span>
        <SocialLinksGroup />

        <button
          aria-label="Scroll to About"
          onClick={goToAbout}
          className="group absolute bottom-14 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 shadow ring-1 ring-black/5 hover:scale-105 transition overflow-hidden"
        >
          <ArrowDown
            ref={arrowRef}
            className="w-5 h-5 text-[var(--title-color)] group-hover:text-indigo-600 mb-1"
          />
        </button>
      </div>
      <SVGShapes active={isInView} />
    </section>
  );
}
