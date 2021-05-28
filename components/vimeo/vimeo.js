import T from "prop-types";
import s from "./vimeo.module.css";

export default function Vimeo({ height, vimeo, width }) {
  // This forces the correct aspect ratio
  const ratio = `calc(${height} / ${width} * 100%)`;

  return (
    <div className={s.container}>
      <div className={s.ratio} style={{ paddingBottom: ratio }} />
      <iframe
        allowFullScreen
        className={s.content}
        frameBorder="0"
        height={height}
        src={`https://player.vimeo.com/video/${vimeo}?title=0&byline=0&portrait=0`}
        title={vimeo}
        width={width}
      />
    </div>
  );
}

Vimeo.propTypes = {
  height: T.number.isRequired,
  vimeo: T.string.isRequired,
  width: T.number.isRequired,
};
