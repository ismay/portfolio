import useLayoutEffect from "@react-hook/passive-layout-effect";
import usePrevious from "@react-hook/previous";
import c from "classnames";
import T from "prop-types";
import { useState } from "react";
import s from "./background.module.css";

export default function Background({ isZoomed }) {
  const prevZoomed = usePrevious(isZoomed);
  const [isUnzooming, setIsUnzooming] = useState(false);

  useLayoutEffect(() => {
    if (prevZoomed && !isZoomed) {
      setIsUnzooming(true);
    }
  }, [prevZoomed, isZoomed]);

  const handleTransitionEnd = () => {
    if (!isZoomed) {
      setIsUnzooming(false);
    }
  };

  const backgroundClass = c(s.unzoomed, {
    [s.unzooming]: isUnzooming,
    [s.zoomed]: isZoomed,
  });

  return (
    <div className={backgroundClass} onTransitionEnd={handleTransitionEnd} />
  );
}

Background.propTypes = {
  isZoomed: T.bool.isRequired,
};
