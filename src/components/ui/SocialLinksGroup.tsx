import { BsDiscord, BsInstagram } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { SOCIAL_LINKS } from "../../data/links";
import { FaGithub } from "react-icons/fa";

export default function SocialLinksGroup() {
  return (
    <section className="flex gap-3 my-6">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noreferrer"
        className="home_social_link "
      >
        <BsInstagram />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        className="home_social_link "
      >
        <FiLinkedin />
      </a>
      <a
        href={SOCIAL_LINKS.discord}
        target="_blank"
        rel="noreferrer"
        className="home_social_link "
        title="Discord"
      >
        <BsDiscord />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noreferrer"
        className="home_social_link "
        title="GitHub"
      >
        <FaGithub />
      </a>
    </section>
  );
}
