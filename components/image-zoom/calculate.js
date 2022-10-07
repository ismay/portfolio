export const calculateScale = ({
  height: containerHeight,
  margin,
  width: containerWidth,
}) => {
  const { innerHeight, innerWidth } = window;

  // Account for the margin
  const windowHeight = Math.max(innerHeight - 2 * margin, 0);
  const windowWidth = Math.max(innerWidth - 2 * margin, 0);

  const containerRatio = containerHeight / containerWidth;
  const windowRatio = windowHeight / windowWidth;
  const zoomedWidth =
    containerRatio > windowRatio
      ? (containerWidth * windowHeight) / containerHeight
      : windowWidth;
  const scale = zoomedWidth / containerWidth;

  return scale;
};

export const calculateX = ({
  left: containerLeft,
  scale,
  width: containerWidth,
}) => {
  const { innerWidth: windowWidth } = window;

  const windowCenterX = windowWidth / 2;
  const containerCenterX = containerLeft + containerWidth / 2;
  const x = windowCenterX - containerCenterX;

  return x / scale;
};

export const calculateY = ({
  height: containerHeight,
  scale,
  top: containerTop,
}) => {
  const { innerHeight: windowHeight } = window;

  const windowCenterY = windowHeight / 2;
  const containerCenterY = containerTop + containerHeight / 2;
  const y = windowCenterY - containerCenterY;

  return y / scale;
};
