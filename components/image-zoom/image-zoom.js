import { useDebounceCallback } from "@react-hook/debounce";
import T from "prop-types";
import { useRef, useState } from "react";
import BoxShadow from "../box-shadow";
import { GalleryImage } from "../image";
import Background from "./background";
import Foreground from "./foreground";
import useWindowListener from "./window-listener";

export default function ImageZoom({
  alt,
  amount,
  blurDataURL,
  height,
  index,
  margin,
  src,
  width,
}) {
  const baseRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
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

  const zoom = () => {
    setIsZoomed(true);
  };
  const unzoom = () => {
    setIsZoomed(false);
    setZoomedSize(0);
  };
  const toggleZoom = () => {
    if (isZoomed) {
      unzoom();
    } else {
      zoom();
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        if (isZoomed) {
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
  useWindowListener("scroll", debouncedUnzoom, { enabled: isZoomed });
  useWindowListener("resize", debouncedUnzoom, { enabled: isZoomed });
  useWindowListener("orientationchange", debouncedUnzoom, {
    enabled: isZoomed,
  });

  return (
    <div
      ref={baseRef}
      role="button"
      style={style}
      tabIndex="0"
      onClick={toggleZoom}
      onKeyDown={handleKeyDown}
    >
      <Background isZoomed={isZoomed} />
      <Foreground
        getBaseRect={getBaseRect}
        isZoomed={isZoomed}
        margin={margin}
        setZoomedSize={setZoomedSize}
      >
        <BoxShadow>
          <GalleryImage
            alt={alt}
            amount={amount}
            blurDataURL={blurDataURL}
            height={height}
            index={index}
            overrideSizes={zoomedSize}
            src={src}
            width={width}
          />
        </BoxShadow>
      </Foreground>
    </div>
  );
}

ImageZoom.defaultProps = {
  blurDataURL: "",
  margin: 0,
};

ImageZoom.propTypes = {
  alt: T.string.isRequired,
  amount: T.number.isRequired,
  blurDataURL: T.string,
  height: T.number.isRequired,
  index: T.number.isRequired,
  margin: T.number,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
