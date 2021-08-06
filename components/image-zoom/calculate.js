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

export const calculateX = ({ baseRect, scale }) => {
  const { innerWidth: windowWidth } = window;
  const { left: baseLeft, width: baseWidth } = baseRect;

  const windowCenterX = windowWidth / 2;
  const baseCenterX = baseLeft + baseWidth / 2;
  const x = windowCenterX - baseCenterX;

  return x / scale;
};

export const calculateY = ({ baseRect, scale }) => {
  const { innerHeight: windowHeight } = window;
  const { height: baseHeight, top: baseTop } = baseRect;

  const windowCenterY = windowHeight / 2;
  const baseCenterY = baseTop + baseHeight / 2;
  const y = windowCenterY - baseCenterY;

  return y / scale;
};
