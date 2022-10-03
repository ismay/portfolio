import { getPlaiceholder } from "plaiceholder";

const imageUrlToDataUrl = async (url) => {
  const { base64 } = await getPlaiceholder(url);

  return base64;
};

export default imageUrlToDataUrl;
