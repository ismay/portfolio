export const calculatePosition = ({ baseRect }) => {
  const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
  const {
    height: baseHeight,
    left: baseLeft,
    top: baseTop,
    width: baseWidth,
  } = baseRect;

  const windowCenterX = windowWidth / 2;
  const windowCenterY = windowHeight / 2;
  const baseCenterX = baseLeft + baseWidth / 2;
  const baseCenterY = baseTop + baseHeight / 2;
  const x = windowCenterX - baseCenterX;
  const y = windowCenterY - baseCenterY;

  return { x, y };
};

export const calculateScale = ({ baseRect, margin }) => {
  const { innerHeight, innerWidth } = window;
  const { height: baseHeight, width: baseWidth } = baseRect;

  // Account for the margin
  const windowHeight = Math.max(innerHeight - 2 * margin, 0);
  const windowWidth = Math.max(innerWidth - 2 * margin, 0);

  const baseRatio = baseHeight / baseWidth;
  const windowRatio = windowHeight / windowWidth;
  const zoomedWidth =
    baseRatio > windowRatio
      ? (baseWidth * windowHeight) / baseHeight
      : windowWidth;
  const scale = zoomedWidth / baseWidth;

  return scale;
};
