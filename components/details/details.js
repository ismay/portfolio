import c from "classnames";
import date from "date-and-time";
import T from "prop-types";
import s from "./details.module.css";

export default function Details({
  date: published,
  dimensions,
  medium,
  right,
  title,
}) {
  const containerClass = c(s.container, { [s.containerRight]: right });
  const parsed = date.parse(published, "YYYY-MM-DD");
  const year = date.format(parsed, "YYYY");

  return (
    <div className={containerClass}>
      <div className={s.titleDateContainer}>
        <span className={s.title}>{title}</span>
        <span className={s.date}>, {year}</span>
      </div>
      {medium && <div>{medium}</div>}
      {dimensions && <div>{dimensions}</div>}
    </div>
  );
}

Details.defaultProps = {
  dimensions: "",
  medium: "",
  right: false,
};

Details.propTypes = {
  date: T.string.isRequired,
  dimensions: T.string,
  medium: T.string,
  right: T.bool,
  title: T.string.isRequired,
};
