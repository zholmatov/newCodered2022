const helper = require("./getInfos");

const livingRoomSets = async function () {
  const page1 = "https://www.polarisfurniture.com/collections/living-room-sets";
  const page2 =
    "https://www.polarisfurniture.com/collections/living-room-sets?page=2";

  const firstPageInfo = await helper.getInfos(page1);
  const secondPageInfo = await helper.getInfos(page2);

  const allInfo = firstPageInfo.concat(secondPageInfo);

  return allInfo;
};

exports.livingRoomSets = livingRoomSets;
