import T from "prop-types";
import s from "./vimeo.module.css";

export default function Vimeo({ height, id, title, width }) {
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
        src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`}
        title={title}
        width={width}
      />
    </div>
  );
}

Vimeo.propTypes = {
  height: T.number.isRequired,
  id: T.string.isRequired,
  title: T.string.isRequired,
  width: T.number.isRequired,
};
