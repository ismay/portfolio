import Link from "next/link";
import T from "prop-types";
import s from "./undecorated-link.module.css";

export default function UndecoratedLink({ children, href, title }) {
  return (
    <Link href={href}>
      <a className={s.link} title={title}>
        {children}
      </a>
    </Link>
  );
}

UndecoratedLink.propTypes = {
  children: T.node.isRequired,
  href: T.string.isRequired,
  title: T.string.isRequired,
};
