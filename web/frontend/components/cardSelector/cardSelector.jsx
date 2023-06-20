import React, { useEffect, useState } from "react";
import { Image, Button } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import "./cardSelector.css";

const CardSelector = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/badges");
        const badges = response.data;
        setSelectedImages(badges);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBadges();
  }, []);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/badges",
        selectedImages
      );
      console.log(response);
      //alert the user that the badges were saved
      alert("Badges are saved");
    } catch (err) {
      console.log(err);
    }

    console.log(selectedImages);
  };

  return (
    <div className="badge--container">
      {selectedImages && selectedImages.length > 0 && (
        <div>
          {selectedImages.map((item, index) => (
            <Image
              key={index}
              className={`badge--image ${item.state ? "selected" : ""}`}
              source={item.url}
              alt="badge"
              onClick={() => {
                setSelectedImages((prevState) => {
                  const updatedImages = [...prevState];
                  updatedImages[index].state = !updatedImages[index].state;
                  return updatedImages;
                });
              }}
            />
          ))}
        </div>
      )}
      <Button primary onClick={handleClick}>
        SAVE
      </Button>
    </div>
  );
};

export default CardSelector;
