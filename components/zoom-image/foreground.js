import useLayoutEffect from "@react-hook/passive-layout-effect";
import usePrevious from "@react-hook/previous";
import c from "classnames";
import T from "prop-types";
import { useRef, useState } from "react";
import { calculateScale, calculateX, calculateY } from "./calculate";
import s from "./foreground.module.css";

const Foreground = ({
  children,
  getBaseRect,
  margin,
  setZoomedSize,
  zoomed,
}) => {
  const foregroundRef = useRef(null);
  const prevZoomed = usePrevious(zoomed);
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
    if (prevZoomed && !zoomed) {
      setIsUnzooming(true);
      setTx(0);
      setTy(0);
      setTs(1);
    }

    if (!prevZoomed && zoomed) {
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
  }, [prevZoomed, zoomed, getBaseRect, margin]);

  /**
   * Handle post-animation updates
   */

  const handleTransitionEnd = () => {
    if (zoomed) {
      if (!foregroundRef.current) {
        return;
      }

      const rect = foregroundRef.current.getBoundingClientRect();
      setZoomedSize(rect.width);
    } else {
      setIsUnzooming(false);
    }
  };

  /**
   * Trigger the animations
   */

  const foregroundClass = c(s.unzoomed, {
    [s.unzooming]: isUnzooming,
    [s.zoomed]: zoomed,
  });

  return (
    <div
      ref={foregroundRef}
      className={foregroundClass}
      onTransitionEnd={handleTransitionEnd}
      style={style}
    >
      {children}
    </div>
  );
};

Foreground.propTypes = {
  children: T.node.isRequired,
  getBaseRect: T.func.isRequired,
  margin: T.number.isRequired,
  setZoomedSize: T.func.isRequired,
  zoomed: T.bool.isRequired,
};

export default Foreground;
