import Image from "next/image";
import T from "prop-types";
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
  const sizes = calculateSizes({ amount, index });

  return (
    <Image
      alt={alt}
      blurDataURL={blurDataURL}
      height={height}
      layout="responsive"
      placeholder={blurDataURL ? "blur" : undefined}
      sizes={sizes}
      src={src}
      width={width}
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
