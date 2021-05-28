import T from "prop-types";
import s from "./main.module.css";

export default function Main({ children }) {
  return <main className={s.container}>{children}</main>;
}

Main.propTypes = {
  children: T.node.isRequired,
};
