import React, { useCallback, useEffect } from "react";

import {
  addBackendMessageHandler,
  removeBackendMessageHandler,
} from "../../../websocket";

const GetCarbedsHandlers = () => {
  const mainHandler = useCallback(() => {
    const getCarbedsHandler = (message) => {
      const response = JSON.parse(message);
      if (response.api !== "Polaris" || response.method !== "GetCarbeds") {
        return;
      }
      console.log(response);
    };
    addBackendMessageHandler(getCarbedsHandler);
    return () => {
      removeBackendMessageHandler(getCarbedsHandler);
    };
  }, []);
  useEffect(() => {
    mainHandler();
  }, [mainHandler]);
  return <></>;
};

export default GetCarbedsHandlers;
