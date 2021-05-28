const isServer = typeof window === "undefined";

// Only mock the server-side requests
if (isServer) {
  const { server } = require("./server");
  server.listen();
}
