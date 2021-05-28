import c from "classnames";
import T from "prop-types";
import s from "./cell.module.css";

export default function Cell({ children, columns }) {
  const cellClass = c(s.cell, {
    [s.two]: columns >= 2,
    [s.three]: columns >= 3,
  });

  return <div className={cellClass}>{children}</div>;
}

Cell.defaultProps = {
  columns: 1,
};

Cell.propTypes = {
  children: T.node.isRequired,
  columns: T.number,
};
