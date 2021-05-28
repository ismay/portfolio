import c from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.css";

export default function Navigation() {
  const { pathname } = useRouter();
  const isWorkActive = pathname === "/" || pathname.startsWith("/work");
  const isAboutActive = pathname === "/about";

  const workClass = c(s.link, {
    [s.active]: isWorkActive,
  });
  const aboutClass = c(s.link, {
    [s.active]: isAboutActive,
  });

  return (
    <nav>
      <Link href="/">
        <a className={workClass} title="Work">
          Work
        </a>
      </Link>
      <Link href="/about">
        <a className={aboutClass} title="About">
          About
        </a>
      </Link>
    </nav>
  );
}
