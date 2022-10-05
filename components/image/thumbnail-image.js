import Image from "next/image";
import T from "prop-types";
import { useState } from "react";
import calculateSizes from "./thumbnail-sizes";

export default function ThumbnailImage({
  alt,
  amount,
  blurDataURL,
  height,
  index,
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
      sizes={sizes}
      src={src}
      width={width}
      onLoadingComplete={() => {
        setIsLoading(false);
      }}
    />
  );
}

ThumbnailImage.defaultProps = {
  blurDataURL: "",
};

ThumbnailImage.propTypes = {
  alt: T.string.isRequired,
  amount: T.number.isRequired,
  blurDataURL: T.string,
  height: T.number.isRequired,
  index: T.number.isRequired,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
