export const DEBUG_MODE = import.meta.env.VITE_DEBUG;
export const PI_MODE = import.meta.env.VITE_PI;
export const HOST = import.meta.env.VITE_HOST;
export const SOCKET_PORT = import.meta.env.VITE_SOCKET_PORT;
export const NODE_PORT = import.meta.env.VITE_NODE_SERVER_PORT;
export const VITE_MODE = import.meta.env.MODE;

console.log({
  DEBUG_MODE,
  PI_MODE,
  HOST,
  SOCKET_PORT,
  NODE_PORT,
  VITE_MODE,
});
