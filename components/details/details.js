import c from "classnames";
import T from "prop-types";
import s from "./details.module.css";

export default function Details({
  date,
  dimensions,
  isRightAligned,
  medium,
  title,
}) {
  const containerClass = c(s.container, { [s.containerRight]: isRightAligned });

  /**
   * Graphcms returns an ISO 8601 date, formatted YYYY-MM-DD
   * https://graphcms.com/docs/schema/field-types#date
   */
  const year = date.slice(0, 4);

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
  isRightAligned: false,
  medium: "",
};

Details.propTypes = {
  date: T.string.isRequired,
  dimensions: T.string,
  isRightAligned: T.bool,
  medium: T.string,
  title: T.string.isRequired,
};
