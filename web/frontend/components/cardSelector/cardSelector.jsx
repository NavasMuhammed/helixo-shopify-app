import React, { useEffect, useState } from "react";
import { Image, Button } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import "./cardSelector.css";
import { useAuthenticatedFetch } from "../../hooks";

const CardSelector = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fetch = useAuthenticatedFetch();
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        await fetch("/api/badges")
          .then((response) => response.json())
          .then((data) => {
            setSelectedImages(data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBadges();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch("/api/badges", {
        method: "POST",
        body: JSON.stringify(selectedImages),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(response);
        // Alert the user that the badges were saved
        alert("Badges are saved");
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      console.log(err);
    }
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
