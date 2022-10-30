import React, { useCallback, useEffect } from "react";

import {
  addBackendMessageHandler,
  removeBackendMessageHandler,
} from "../../../websocket";

const GetSectionalHandlers = () => {
  const mainHandler = useCallback(() => {
    const getSectionalHandler = (message) => {
      const response = JSON.parse(message);
      if (response.api !== "Polaris" || response.method !== "GetSectional") {
        return;
      }
      console.log(response);
    };
    addBackendMessageHandler(getSectionalHandler);
    return () => {
      removeBackendMessageHandler(getSectionalHandler);
    };
  }, []);
  useEffect(() => {
    mainHandler();
  }, [mainHandler]);
  return <></>;
};

export default GetSectionalHandlers;
