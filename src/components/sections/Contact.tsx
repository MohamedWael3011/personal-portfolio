import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Mail, MessageCircle, Linkedin, Send, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "../../data/links";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
      | string
      | undefined;
    if (!accessKey) {
      setSubmitMessage(
        "Missing Web3Forms access key. Set VITE_WEB3FORMS_ACCESS_KEY."
      );
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      if (data?.success) {
        setSubmitMessage("Thanks! Your message has been sent.");
        formElement.reset();
      } else {
        setSubmitMessage(
          data?.message || "Something went wrong. Please try again later."
        );
      }
    } catch (_error) {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      const el = sectionRef.current as HTMLElement | null;
      if (!el) return;

      const title = el.querySelector(".section_title");
      const card = el.querySelector(".contact_card");
      const inputs = el.querySelectorAll(
        ".contact_card input, .contact_card textarea, .contact_card button"
      );

      gsap.from([title, card], {
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

      gsap.from(inputs, {
        y: 12,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.08,
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
      id="contact"
      ref={sectionRef}
      className="my-24 md:my-28 max-w-[1080px] px-4 m-auto"
    >
      <h2 className="section_title">Contact</h2>

      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-4">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <p className="text-sm md:text-lg text-indigo-600 dark:text-indigo-400">
          Let’s talk about anything — ideas, collabs, memes, or your next big
          thing.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-md p-5 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="mailto:mohamedwael573011@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors hover:text-indigo-600 hover:border-indigo-600 dark:hover:text-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-50"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors hover:text-indigo-600 hover:border-indigo-600 dark:hover:text-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-50"
            >
              <MessageCircle className="w-4 h-4" /> Discord
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors hover:text-indigo-600 hover:border-indigo-600 dark:hover:text-indigo-600 dark:hover:border-indigo-600"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 contact_card rounded-md p-5 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Or drop a message below and I’ll get back to you.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="px-3 py-2 rounded-md border outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Your name"
                name="name"
                required
              />
              <input
                className="px-3 py-2 rounded-md border outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Email address"
                type="email"
                name="email"
                required
              />
              <textarea
                className="px-3 py-2 rounded-md border outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 sm:col-span-2"
                rows={4}
                placeholder="What shall we build?"
                name="message"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:col-span-2 justify-self-start inline-flex items-center gap-2 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
            {submitMessage && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
