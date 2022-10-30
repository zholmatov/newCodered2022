const carbed = require("../polaris/carBeds");
const bedroom = require("../polaris/bedroom");
const livingRoom = require("../polaris/livingRoomSets")
const accessories = require("../polaris/accessories")
const sectional = require("../polaris/sectional")

const handleRequest = async function (ws, requestString) {
  const request = JSON.parse(requestString);

  if (request.api === "Polaris" && request.method === "GetCarbeds") {
    const data = await carbed.getCarBedsInfo();
    const messageBack = {
      api: "Polaris",
      method: "GetCarbeds",
      data: data,
    };

    const back = JSON.stringify(messageBack);
    ws.send(back);
  }

  if (request.api === "Polaris" && request.method === "GetBedroom") {
    const data = await bedroom.getBedroomsInfo();
    const messageBack = {
      api: "Polaris",
      method: "GetBedroom",
      data: data,
    };

    const back = JSON.stringify(messageBack);
    ws.send(back);
  }

  if (request.api === "Polaris" && request.method === "GetLivingRoomSets") {
    const data = await livingRoom.livingRoomSets();
    const messageBack = {
      api: "Polaris",
      method: "GetLivingRoomSets",
      data: data,
    };

    const back = JSON.stringify(messageBack);
    ws.send(back);
  }

  if (request.api === "Polaris" && request.method === "GetAccessories") {
    const data = await accessories.getAccessories();
    const messageBack = {
      api: "Polaris",
      method: "GetAccessories",
      data: data,
    };

    const back = JSON.stringify(messageBack);
    ws.send(back);
  }

  if (request.api === "Polaris" && request.method === "GetSectional") {
    const data = await sectional.getSectional();
    const messageBack = {
      api: "Polaris",
      method: "GetSectional",
      data: data,
    };

    const back = JSON.stringify(messageBack);
    ws.send(back);
  }
};

exports.handleRequest = handleRequest;
