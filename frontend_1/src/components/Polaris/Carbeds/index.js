import React from "react";
import { backendSocket } from "../../../websocket";

const Carbeds = () => {
  const getCarbeds = () => {
    console.log("get carbeds clicked");

    const payload = {
      api: "Polaris",
      method: "GetCarbeds",
    };
    const requestPayload = JSON.stringify(payload);
    if (backendSocket.readyState === 1) {
      backendSocket.send(requestPayload);
    } else {
      alert("backend socket is closed, cannot send message");
    }
  };
  return <button onClick={getCarbeds}>Get carbeds</button>;
};

export default Carbeds;
