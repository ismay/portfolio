import useSize from "@react-hook/size";
import Image from "next/image";
import T from "prop-types";
import { useRef } from "react";

export default function ResponsiveImage({
  alt,
  height,
  sizes: overrideSize,
  src,
  width,
}) {
  const target = useRef(null);
  const [measuredSize] = useSize(target);
  const sizes = Math.max(measuredSize, overrideSize);

  return (
    <div ref={target}>
      <Image
        alt={alt}
        height={height}
        layout="responsive"
        sizes={`${sizes}px`}
        src={src}
        width={width}
      />
    </div>
  );
}

ResponsiveImage.defaultProps = {
  sizes: 0,
};

ResponsiveImage.propTypes = {
  alt: T.string.isRequired,
  height: T.number.isRequired,
  sizes: T.number,
  src: T.string.isRequired,
  width: T.number.isRequired,
};
