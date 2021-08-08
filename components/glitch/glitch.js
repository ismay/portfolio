import T from "prop-types";
import s from "./glitch.module.css";

export default function Glitch({ children }) {
  return <div className={s.container}>{children}</div>;
}

Glitch.propTypes = {
  children: T.node.isRequired,
};
