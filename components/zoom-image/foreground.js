import { motion } from "framer-motion";
import T from "prop-types";
import { forwardRef } from "react";
import { calculatePosition, calculateScale } from "./calculate";

const Foreground = forwardRef(
  ({ animate, children, getBaseRect, margin, onAnimationComplete }, ref) => {
    const variants = {
      normal: {
        cursor: "zoom-in",
        position: "relative",
        scale: 1,
        transitionEnd: {
          position: "static",
          zIndex: "auto",
        },
        x: 0,
        y: 0,
        zIndex: 1,
      },
      zoomed: () => {
        const baseRect = getBaseRect();

        if (!baseRect) {
          return {};
        }

        const { x, y } = calculatePosition({ baseRect });
        const scale = calculateScale({ baseRect, margin });

        return {
          cursor: "zoom-out",
          position: "relative",
          scale,
          x,
          y,
          zIndex: 1,
        };
      },
    };

    return (
      <motion.div
        ref={ref}
        animate={animate}
        initial={false}
        onAnimationComplete={onAnimationComplete}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }
);

Foreground.propTypes = {
  animate: T.string.isRequired,
  children: T.node.isRequired,
  getBaseRect: T.func.isRequired,
  margin: T.number.isRequired,
  onAnimationComplete: T.func.isRequired,
};

export default Foreground;
