import React, { useEffect, useState } from "react";
import { Image, Button } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import "./cardSelector.css";
import { imageUrlObject } from "./data";

const CardSelector = () => {
  const [selectedImages, setSelectedImages] = useState({});

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/badges",
        selectedImages
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    console.log(selectedImages);
  };

  return (
    <div className="badge--container">
      <div>
        {imageUrlObject.map((item, index) => (
          <Image
            key={index}
            className={`badge--image ${item.state ? "selected" : ""}`}
            source={item.url}
            alt="badge"
            onClick={() => {
              item.state = !item.state;
              setSelectedImages({ ...selectedImages, [item.name]: item });
            }}
          />
        ))}
      </div>
      <Button primary onClick={handleClick}>
        SAVE
      </Button>
      <div>
        {Object.values(selectedImages).map((item, index) => (
          <div key={index}>
            <span>{JSON.stringify(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSelector;
