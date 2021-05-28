import T from "prop-types";
import s from "./grid.module.css";

export default function Grid({ children }) {
  return <div className={s.grid}>{children}</div>;
}

Grid.propTypes = {
  children: T.node.isRequired,
};
