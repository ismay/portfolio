import c from "classnames";
import T from "prop-types";
import s from "./loading-indicator.module.css";

export default function LoadingIndicator({ isLoading }) {
  const containerClass = c(s.container, {
    [s.show]: isLoading,
  });

  return (
    <div className={containerClass}>
      <div className={s.icon} />
    </div>
  );
}

LoadingIndicator.propTypes = {
  isLoading: T.bool.isRequired,
};
