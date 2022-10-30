import React, { useState } from "react";
import { backendSocket } from "../../../websocket";

const Sectional = () => {
  const [disabled, setDisabled] = useState(false);

  const getSectional = () => {
    setDisabled(true);
    console.log("get Sectional clicked");
    const payload = {
      api: "Polaris",
      method: "GetSectional",
    };
    const requestPayload = JSON.stringify(payload);
    if (backendSocket.readyState === 1) {
      backendSocket.send(requestPayload);
    } else {
      alert("backend socket is closed, cannot send message");
    }
  };
  return (
    <button onClick={getSectional} disabled={disabled}>
      Get Sectional
    </button>
  );
};

export default Sectional;
