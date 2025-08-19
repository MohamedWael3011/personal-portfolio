import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ThemeToggle from "./ui/ThemeToggle";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function SideBar() {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const targetIdRef = useRef<string | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink(activeId: string) {
      const navLinks =
        document.querySelectorAll<HTMLAnchorElement>(".nav_link");
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${activeId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    updateActiveLink("home");

    sections.forEach((section) => {
      const id = section.getAttribute("id");
      if (!id) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          if (!isAnimatingRef.current) updateActiveLink(id);
        },
        onEnterBack: () => {
          if (!isAnimatingRef.current) updateActiveLink(id);
        },
      });
    });

    const allNavLinks =
      document.querySelectorAll<HTMLAnchorElement>(".nav_link");
    const handleClick = (e: Event) => {
      e.preventDefault();
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (!href) return;
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      updateActiveLink(targetId);

      isAnimatingRef.current = true;
      targetIdRef.current = targetId;

      const yOffset =
        targetId === "contact" ? "max" : targetSection.offsetTop - 100;

      gsap.to(window, {
        duration: 0.9,
        scrollTo: { y: yOffset, autoKill: false },
        ease: "power2.inOut",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
            targetIdRef.current = null;
          }, 100);
        },
      });

      setMobileOpen(false);
    };

    allNavLinks.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      allNavLinks.forEach((link) =>
        link.removeEventListener("click", handleClick)
      );
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    if (isMobileOpen) {
      scrollYRef.current = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    } else {
      const top = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      if (top) {
        const y = parseInt(top || "0") * -1;
        window.scrollTo(0, y || 0);
      }
    }
    return () => {
      // Cleanup on unmount
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        aria-label="Open navigation"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <nav
        className={
          "md:hidden fixed inset-y-0 left-0 z-50  bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 " +
          (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="h-full flex flex-col py-8 px-4">
          <div className="mx-auto mb-auto">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 grid place-items-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 px-2">
            <Link
              to="/terminal"
              onClick={() => setMobileOpen(false)}
              aria-label="Open terminal view"
              className="group relative"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <TerminalIcon className="w-6 h-6" />
              </div>
            </Link>
            <a href="#home" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-blue-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </a>

            <a href="#about" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-green-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </a>

            <a href="#experience" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-purple-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
            </a>

            <a href="#education" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-yellow-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
            </a>

            <a href="#skills" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-red-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </a>

            <a href="#projects" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-indigo-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </a>

            <a href="#contact" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center transition-all duration-300 group-[.active]:bg-pink-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </a>
          </div>

          <div className="mx-auto mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav
        ref={sidebarRef}
        className="hidden md:block fixed left-0 top-0 z-40 h-screen w-[110px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <div className="flex flex-col items-center justify-center h-full py-8">
          <ReactTyped
            strings={["Try me!"]}
            typeSpeed={100}
            backSpeed={100}
            className="text-xs text-indigo-600 dark:text-purple-500 font-terminal mb-1"
            loop
          />

          <div className="mb-10">
            <Link
              to="/terminal"
              aria-label="Open terminal view"
              className="group relative animate-pulse"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <TerminalIcon className="w-6 h-6" />
              </div>
            </Link>
          </div>
          <div className="nav_list">
            <a href="#home" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-blue-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </a>

            <a href="#about" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-green-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </a>

            <a href="#experience" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-purple-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
            </a>

            <a href="#education" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-yellow-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
            </a>

            <a href="#skills" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-red-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </a>

            <a href="#projects" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-indigo-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </a>

            <a href="#contact" className="nav_link group relative">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-[.active]:bg-pink-500 group-[.active]:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </a>
          </div>

          {/* Theme Toggle */}
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
