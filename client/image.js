const imageUrlToDataUrl = async (url, mimeType) => {
  // Fetch is automatically polyfilled server-side with next.js
  const response = await fetch(url);

  // A method unique to node-fetch, so this will only work server-side
  const buffer = await response.buffer();

  return `data:${mimeType};base64,${buffer.toString("base64")}`;
};

export default imageUrlToDataUrl;
