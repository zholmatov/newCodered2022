export const backendSocket = new WebSocket("ws://localhost:8000");

export const backendMessageHandlers = new Set();

export function addBackendMessageHandler(handler) {
  backendMessageHandlers.add(handler);
}
export function removeBackendMessageHandler(handler) {
  backendMessageHandlers.delete(handler);
}

backendSocket.onmessage = (event) => {
  if (event.data !== undefined) {
    backendMessageHandlers.forEach((handler) => {
      handler(event.data);
    });
  }
};
