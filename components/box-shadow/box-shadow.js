import T from "prop-types";
import s from "./box-shadow.module.css";

export default function BoxShadow({ children }) {
  return <div className={s.shadow}>{children}</div>;
}

BoxShadow.propTypes = {
  children: T.node.isRequired,
};
