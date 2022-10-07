import Image from "next/image";
import T from "prop-types";
import { useState } from "react";
import { useRect } from "react-use-rect";

export default function ThumbnailImage({
  alt,
  blurDataURL,
  height,
  src,
  width,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [containerRect, setContainerRect] = useState({});
  const [containerRectRef] = useRect(setContainerRect, { resize: true });

  const sizes = containerRect.width
    ? `${Math.round(containerRect.width)}px`
    : "100vw";

  return (
    <div ref={containerRectRef}>
      <Image
        data-next-image
        alt={alt}
        blurDataURL={blurDataURL}
        data-loading={isLoading}
        height={height}
        layout="responsive"
        placeholder={blurDataURL ? "blur" : undefined}
        sizes={sizes}
        src={src}
        width={width}
        onLoadingComplete={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

ThumbnailImage.defaultProps = {
  blurDataURL: "",
};

ThumbnailImage.propTypes = {
  alt: T.string.isRequired,
  blurDataURL: T.string,
  height: T.number.isRequired,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
