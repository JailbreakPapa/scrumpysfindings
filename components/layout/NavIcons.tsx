import Image from "next/image";
import { Win96Button } from "../ui/win96";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-2">
      <Win96Button
        as="a"
        href="https://github.com/JailbreakPapa"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-2 py-1"
      >
        <Image
          src="/github.svg"
          alt="Link to Mikael's gitHub profile"
          width={16}
          height={16}
          className="invert dark:invert-0"
        />
        <span className="hidden text-xs md:inline">GitHub</span>
      </Win96Button>

      <Win96Button
        as="a"
        href="https://www.linkedin.com/in/mikael-aboagye-77215225b/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-2 py-1"
      >
        <Image
          src="/linkedin.svg"
          alt="Link to Mikael's linkedin profile"
          width={16}
          height={16}
          className="invert dark:invert-0"
        />
        <span className="hidden text-xs md:inline">LinkedIn</span>
      </Win96Button>
    </div>
  );
};
export default NavIcons;
