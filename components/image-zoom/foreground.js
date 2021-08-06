import useLayoutEffect from "@react-hook/passive-layout-effect";
import usePrevious from "@react-hook/previous";
import c from "classnames";
import T from "prop-types";
import { useRef, useState } from "react";
import { calculateScale, calculateX, calculateY } from "./calculate";
import s from "./foreground.module.css";

export default function Foreground({
  children,
  getBaseRect,
  isZoomed,
  margin,
  setZoomedSize,
}) {
  const foregroundRef = useRef(null);
  const prevZoomed = usePrevious(isZoomed);
  const [isUnzooming, setIsUnzooming] = useState(false);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [ts, setTs] = useState(1);
  const style = {
    "--ts": ts,
    "--tx": tx,
    "--ty": ty,
  };

  /**
   * Handle zooming and unzooming
   */

  useLayoutEffect(() => {
    if (prevZoomed && !isZoomed) {
      setIsUnzooming(true);
      setTx(0);
      setTy(0);
      setTs(1);
    }

    if (!prevZoomed && isZoomed) {
      const baseRect = getBaseRect();

      if (!baseRect) {
        return;
      }

      const scale = calculateScale({ baseRect, margin });
      const x = calculateX({ baseRect, scale });
      const y = calculateY({ baseRect, scale });

      setTx(`${x}px`);
      setTy(`${y}px`);
      setTs(scale);
    }
  }, [prevZoomed, isZoomed, getBaseRect, margin]);

  /**
   * Handle post-animation updates
   */

  const handleTransitionEnd = () => {
    if (isZoomed) {
      if (!foregroundRef.current) {
        return;
      }

      const rect = foregroundRef.current.getBoundingClientRect();
      setZoomedSize(Math.round(rect.width));
    } else {
      setIsUnzooming(false);
    }
  };

  /**
   * Trigger the animations
   */

  const foregroundClass = c(s.unzoomed, {
    [s.unzooming]: isUnzooming,
    [s.zoomed]: isZoomed,
  });

  return (
    <div
      className={foregroundClass}
      ref={foregroundRef}
      style={style}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  );
}

Foreground.propTypes = {
  children: T.node.isRequired,
  getBaseRect: T.func.isRequired,
  isZoomed: T.bool.isRequired,
  margin: T.number.isRequired,
  setZoomedSize: T.func.isRequired,
};
