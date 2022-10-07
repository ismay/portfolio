import Image from "next/image";
import T from "prop-types";
import { useState } from "react";

export default function GalleryImage({
  alt,
  blurDataURL,
  height,
  sizes,
  src,
  width,
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      data-next-image
      alt={alt}
      blurDataURL={blurDataURL}
      data-loading={isLoading}
      height={height}
      layout="responsive"
      placeholder={blurDataURL ? "blur" : undefined}
      sizes={`${sizes}px`}
      src={src}
      width={width}
      onLoadingComplete={() => {
        setIsLoading(false);
      }}
    />
  );
}

GalleryImage.defaultProps = {
  blurDataURL: "",
};

GalleryImage.propTypes = {
  alt: T.string.isRequired,
  blurDataURL: T.string,
  height: T.number.isRequired,
  sizes: T.number.isRequired,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
