import { useDebounceCallback } from "@react-hook/debounce";
import T from "prop-types";
import { useRef, useState } from "react";
import BoxShadow from "../box-shadow";
import ResponsiveImage from "../responsive-image";
import Background from "./background";
import Foreground from "./foreground";
import useWindowListener from "./window-listener";

export default function ZoomImage({ alt, height, margin, src, width }) {
  const baseRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomedSize, setZoomedSize] = useState(0);
  const style = {
    "--transitionDuration": "300ms",
    "--transitionTimingFunction": "ease-in-out",
  };

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

  // Unzoom whenever something happens that could invalidate the calculations
  useWindowListener("scroll", debouncedUnzoom, { enabled: zoomed });
  useWindowListener("resize", debouncedUnzoom, { enabled: zoomed });
  useWindowListener("orientationchange", debouncedUnzoom, { enabled: zoomed });

  return (
    <div
      ref={baseRef}
      onClick={toggleZoom}
      onKeyDown={handleKeyDown}
      role="button"
      style={style}
      tabIndex="0"
    >
      <Background zoomed={zoomed} />
      <Foreground
        getBaseRect={getBaseRect}
        margin={margin}
        setZoomedSize={setZoomedSize}
        zoomed={zoomed}
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
