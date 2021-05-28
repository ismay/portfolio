import { useEffect } from "react";

/**
 * Register a window Listener for a certain event type
 */

const useWindowListener = (type, cb, { enabled }) => {
  useEffect(() => {
    const isClient = typeof window !== "undefined";

    if (isClient && enabled) {
      window.addEventListener(type, cb);

      return () => {
        window.removeEventListener(type, cb);
      };
    }

    return undefined;
  }, [type, cb, enabled]);
};

export default useWindowListener;
