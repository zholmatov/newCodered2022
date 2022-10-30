import React, { useCallback, useEffect } from "react";

import {
  addBackendMessageHandler,
  removeBackendMessageHandler,
} from "../../../websocket";

const GetLivingRoomSetsHandlers = () => {
  const mainHandler = useCallback(() => {
    const getLivingRoomSetsHandler = (message) => {
      const response = JSON.parse(message);
      if (response.api !== "Polaris" || response.method !== "GetLivingRoomSets") {
        return;
      }
      console.log(response);
    };
    addBackendMessageHandler(getLivingRoomSetsHandler);
    return () => {
      removeBackendMessageHandler(getLivingRoomSetsHandler);
    };
  }, []);
  useEffect(() => {
    mainHandler();
  }, [mainHandler]);
  return <></>;
};

export default GetLivingRoomSetsHandlers;
