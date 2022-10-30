import React, { useCallback, useEffect } from "react";

import {
  addBackendMessageHandler,
  removeBackendMessageHandler,
} from "../../../websocket";

const GetBedroomHandlers = () => {
  const mainHandler = useCallback(() => {
    const getBedroomHandler = (message) => {
      const response = JSON.parse(message);
      if (response.api !== "Polaris" || response.method !== "GetBedroom") {
        return;
      }
      console.log(response);
    };
    addBackendMessageHandler(getBedroomHandler);
    return () => {
      removeBackendMessageHandler(getBedroomHandler);
    };
  }, []);
  useEffect(() => {
    mainHandler();
  }, [mainHandler]);
  return <></>;
};

export default GetBedroomHandlers;
