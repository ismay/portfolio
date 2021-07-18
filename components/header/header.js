import Link from "next/link";
import Logo from "../logo";
import Navigation from "../navigation";
import s from "./header.module.css";

export default function Header() {
  return (
    <header className={s.container}>
      <h1 className={s.heading}>
        <Link href="/">
          <a className={s.link} title="Superwolff">
            <Logo />
          </a>
        </Link>
      </h1>
      <Navigation />
    </header>
  );
}
