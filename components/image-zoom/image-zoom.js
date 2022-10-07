import { useDebounceCallback } from "@react-hook/debounce";
import T from "prop-types";
import { useState } from "react";
import { useRect } from "react-use-rect";
import BoxShadow from "../box-shadow";
import { GalleryImage } from "../image";
import Background from "./background";
import Foreground from "./foreground";
import useWindowListener from "./window-listener";

export default function ImageZoom({
  alt,
  blurDataURL,
  height,
  margin,
  src,
  width,
}) {
  const [containerRect, setContainerRect] = useState({});
  const [containerRectRef] = useRect(setContainerRect);
  const [zoomedSize, setZoomedSize] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const style = {
    "--transition-duration": "300ms",
    "--transition-timing-function": "ease-in-out",
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

  const unzoomedWidth = containerRect.width
    ? Math.round(containerRect.width)
    : width;

  return (
    <div
      ref={containerRectRef}
      role="button"
      style={style}
      tabIndex="0"
      onClick={toggleZoom}
      onKeyDown={handleKeyDown}
    >
      <Background isZoomed={isZoomed} />
      <Foreground
        containerRect={containerRect}
        isZoomed={isZoomed}
        margin={margin}
        setZoomedSize={setZoomedSize}
      >
        <BoxShadow>
          <GalleryImage
            alt={alt}
            blurDataURL={blurDataURL}
            height={height}
            sizes={isZoomed && zoomedSize ? zoomedSize : unzoomedWidth}
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
  blurDataURL: T.string,
  height: T.number.isRequired,
  margin: T.number,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
