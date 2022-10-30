import React, { useCallback, useEffect } from "react";

import {
  addBackendMessageHandler,
  removeBackendMessageHandler,
} from "../../../websocket";

const GetAccessoriesHandlers = () => {
  const mainHandler = useCallback(() => {
    const getAccessoriesHandler = (message) => {
      const response = JSON.parse(message);
      if (response.api !== "Polaris" || response.method !== "GetAccessories") {
        return;
      }
      console.log(response);
    };
    addBackendMessageHandler(getAccessoriesHandler);
    return () => {
      removeBackendMessageHandler(getAccessoriesHandler);
    };
  }, []);
  useEffect(() => {
    mainHandler();
  }, [mainHandler]);
  return <></>;
};

export default GetAccessoriesHandlers;
