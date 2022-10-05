import Image from "next/image";
import T from "prop-types";
import { useState } from "react";
import calculateSizes from "./gallery-sizes";

export default function GalleryImage({
  alt,
  amount,
  blurDataURL,
  height,
  index,
  overrideSizes,
  src,
  width,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const sizes = calculateSizes({ amount, index });

  return (
    <Image
      data-next-image
      alt={alt}
      blurDataURL={blurDataURL}
      data-loading={isLoading}
      height={height}
      layout="responsive"
      placeholder={blurDataURL ? "blur" : undefined}
      sizes={overrideSizes ? `${overrideSizes}px` : sizes}
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
  overrideSizes: 0,
};

GalleryImage.propTypes = {
  alt: T.string.isRequired,
  amount: T.number.isRequired,
  blurDataURL: T.string,
  height: T.number.isRequired,
  index: T.number.isRequired,
  overrideSizes: T.number,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
