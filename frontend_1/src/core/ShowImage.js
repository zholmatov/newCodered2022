import React from "react";

const ShowImage = ({ item, url }) => (
  <div className="product-img" style={{ height: "250px" }}>
    <a href={item.photo} target="_blank">
      <img
        src={item.photo}
        alt={item.name}
        className="mb-3"
        style={{
          objectFit: "contain",
          height: "100%",
          width: "100%",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </a>
  </div>
);

export default ShowImage;
