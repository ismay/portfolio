import useLayoutEffect from "@react-hook/passive-layout-effect";
import usePrevious from "@react-hook/previous";
import c from "classnames";
import T from "prop-types";
import { useState } from "react";
import s from "./background.module.css";

export default function Background({ zoomed }) {
  const prevZoomed = usePrevious(zoomed);
  const [isUnzooming, setIsUnzooming] = useState(false);

  useLayoutEffect(() => {
    if (prevZoomed && !zoomed) {
      setIsUnzooming(true);
    }
  }, [prevZoomed, zoomed]);

  const handleTransitionEnd = () => {
    if (!zoomed) {
      setIsUnzooming(false);
    }
  };

  const backgroundClass = c(s.unzoomed, {
    [s.unzooming]: isUnzooming,
    [s.zoomed]: zoomed,
  });

  return (
    <div className={backgroundClass} onTransitionEnd={handleTransitionEnd} />
  );
}

Background.propTypes = {
  zoomed: T.bool.isRequired,
};
