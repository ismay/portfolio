import Link from "next/link";
import T from "prop-types";
import s from "./image-link.module.css";

export default function ImageLink({ children, href, title }) {
  return (
    <Link href={href}>
      <a className={s.link} title={title}>
        {children}
      </a>
    </Link>
  );
}

ImageLink.propTypes = {
  children: T.node.isRequired,
  href: T.string.isRequired,
  title: T.string.isRequired,
};
