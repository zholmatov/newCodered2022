import React from "react";
import { backendSocket } from "../../../websocket";

const LivingRoomSets = () => {
  const getLivingRoomSets = () => {
    console.log("get Living room sets clicked");

    const payload = {
      api: "Polaris",
      method: "GetLivingRoomSets",
    };
    const requestPayload = JSON.stringify(payload);
    if (backendSocket.readyState === 1) {
      backendSocket.send(requestPayload);
    } else {
      alert("backend socket is closed, cannot send message");
    }
  };
  return <button onClick={getLivingRoomSets}>Get Living Room Sets</button>;
};

export default LivingRoomSets;
