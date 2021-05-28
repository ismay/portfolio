import { motion } from "framer-motion";
import T from "prop-types";
import s from "./background.module.css";

export default function Background({ animate }) {
  const variants = {
    normal: {
      cursor: "auto",
      opacity: 0,
      pointerEvents: "none",
      transitionEnd: {
        zIndex: "auto",
      },
    },
    zoomed: {
      cursor: "zoom-out",
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 1,
    },
  };

  return (
    <motion.div
      animate={animate}
      className={s.background}
      initial={false}
      variants={variants}
    />
  );
}

Background.propTypes = {
  animate: T.string.isRequired,
};
