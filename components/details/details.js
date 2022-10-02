import c from "classnames";
import T from "prop-types";
import s from "./details.module.css";

export default function Details({ date, isRightAligned, title }) {
  const containerClass = c(s.container, {
    [s["container-right"]]: isRightAligned,
  });

  /**
   * Graphcms returns an ISO 8601 date, formatted YYYY-MM-DD
   * https://graphcms.com/docs/schema/field-types#date
   */
  const year = date.slice(0, 4);

  return (
    <div className={containerClass}>
      <span className={s.title}>{title}</span>
      <span className={s.date}>, {year}</span>
    </div>
  );
}

Details.defaultProps = {
  isRightAligned: false,
};

Details.propTypes = {
  date: T.string.isRequired,
  isRightAligned: T.bool,
  title: T.string.isRequired,
};
