import React from "react";
import { backendSocket } from "../../../websocket";

const Bedroom = () => {
  const getBedroom = () => {
    console.log("get Bedroom clicked");
    const payload = {
      api: "Polaris",
      method: "GetBedroom",
    };
    const requestPayload = JSON.stringify(payload);
    if (backendSocket.readyState === 1) {
      backendSocket.send(requestPayload);
    } else {
      alert("backend socket is closed, cannot send message");
    }
  };
  return <button onClick={getBedroom}>Get Bedroom</button>;
};

export default Bedroom;
