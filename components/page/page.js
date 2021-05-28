import T from "prop-types";
import s from "./page.module.css";

export default function Page({ children }) {
  return <div className={s.container}>{children}</div>;
}

Page.propTypes = {
  children: T.node.isRequired,
};
