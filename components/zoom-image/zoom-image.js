import { useDebounceCallback } from "@react-hook/debounce";
import T from "prop-types";
import { useRef, useState } from "react";
import BoxShadow from "../box-shadow";
import ResponsiveImage from "../responsive-image";
import Background from "./background";
import Foreground from "./foreground";
import useWindowListener from "./window-listener";
import s from "./zoom-image.module.css";

export default function ZoomImage({ alt, height, margin, src, width }) {
  const baseRef = useRef(null);
  const foregroundRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomedSize, setZoomedSize] = useState(0);

  // Allow retrieving the base size from within a child component
  const getBaseRect = () => {
    if (!baseRef.current) {
      return undefined;
    }

    return baseRef.current.getBoundingClientRect();
  };

  /**
   * Handlers
   */

  const toggleZoom = () => setZoomed(!zoomed);
  const unzoom = () => setZoomed(false);
  const handleClick = toggleZoom;

  // Update zoomed size when the foreground animation is done
  const handleAnimationComplete = () => {
    if (!foregroundRef.current) {
      return;
    }

    const rect = foregroundRef.current.getBoundingClientRect();
    setZoomedSize(Math.round(rect.width));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        if (zoomed) {
          e.preventDefault();
          unzoom();
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        toggleZoom();
        break;
      default:
        break;
    }
  };

  /**
   * Listeners
   */

  const debouncedUnzoom = useDebounceCallback(unzoom, 300, true);
  const enabled = zoomed;

  // Unzoom whenever something happens that could invalidate the calculations
  useWindowListener("scroll", debouncedUnzoom, { enabled });
  useWindowListener("resize", debouncedUnzoom, { enabled });
  useWindowListener("orientationchange", debouncedUnzoom, { enabled });

  // The two animation types
  const animate = zoomed ? "zoomed" : "normal";

  return (
    <div
      ref={baseRef}
      className={s.container}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <Background animate={animate} />
      <Foreground
        ref={foregroundRef}
        animate={animate}
        getBaseRect={getBaseRect}
        margin={margin}
        onAnimationComplete={handleAnimationComplete}
      >
        <BoxShadow>
          <ResponsiveImage
            alt={alt}
            height={height}
            sizes={zoomedSize}
            src={src}
            width={width}
          />
        </BoxShadow>
      </Foreground>
    </div>
  );
}

ZoomImage.defaultProps = {
  margin: 0,
};

ZoomImage.propTypes = {
  alt: T.string.isRequired,
  height: T.number.isRequired,
  margin: T.number,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
