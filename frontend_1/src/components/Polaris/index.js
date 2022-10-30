import React from "react";
import Carbeds from "./Carbeds";
import Bedroom from "./Bedroom";
import LivingRoomSets from "./LivingRoomSets";
import Accessories from "./Accessories";
import Sectional from "./Sectional";

import GetCarbedsHandlers from "../../apiHandlers/polaris/getCarBedsHandler";
import GetBedroomHandlers from "../../apiHandlers/polaris/getBedroomHandler";
import GetLivingRoomSetsHandlers from "../../apiHandlers/polaris/getLivingRoomSetsHandler";
import GetAccessoriesHandlers from "../../apiHandlers/polaris/getAccessoriesHandler";
import GetSectionalHandlers from "../../apiHandlers/polaris/getSectionalHandler";

const Polaris = () => {
  return (
    <>
      <GetCarbedsHandlers />
      <GetBedroomHandlers />
      <GetLivingRoomSetsHandlers />
      <GetAccessoriesHandlers />
      <GetSectionalHandlers />
      <br />
      <br />
      <Carbeds />
      <br />
      <br />
      <Bedroom />
      <br />
      <br />
      <LivingRoomSets />
      <br />
      <br />
      <Accessories />
      <br />
      <br />
      <Sectional />
    </>
  );
};

export default Polaris;
