import React from "react";
import { backendSocket } from "../../../websocket";

const Accessories = () => {
  const getAccessories = () => {
    console.log("get accessories clicked");
    const payload = {
      api: "Polaris",
      method: "GetAccessories",
    };
    const requestPayload = JSON.stringify(payload);
    if (backendSocket.readyState === 1) {
      backendSocket.send(requestPayload);
    } else {
      alert("backend socket is closed, cannot send message");
    }
  };
  return <button onClick={getAccessories}>Get Accessories</button>;
};

export default Accessories;
