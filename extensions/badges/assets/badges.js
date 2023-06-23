import { useAuthenticatedFetch } from "../../../web/frontend/hooks/useAuthenticatedFetch.js";

// JavaScript code
var apiUrl = "/api/badges"; // Replace with your API endpoint
var imageContainer = document.getElementById("image-container");

useAuthenticatedFetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  })
  .then(function (data) {
    data.forEach(function (item) {
      if (item.state === true) {
        var imageUrl = item.url;

        if (imageUrl) {
          var imageElement = document.createElement("img");
          imageElement.src = imageUrl;
          imageElement.alt = "API Image";
          imageContainer.appendChild(imageElement);
        } else {
          var noImageElement = document.createElement("p");
          noImageElement.textContent = "No image found";
          imageContainer.appendChild(noImageElement);
        }
      }
    });
  })
  .catch(function (error) {
    console.error("Request failed:", error);
  });

{
  /* <script>
    // JavaScript code
    var apiUrl = 'http://localhost:3001/api/badges'; // Replace with your API endpoint
    var imageContainer = document.getElementById("image-container");
  
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then(function(data) {
        data.forEach(function(item) {
          if (item.state === true) {
            var imageUrl = item.url; // Replace with the appropriate property in your API response
  
            if (imageUrl) {
              var imageElement = document.createElement('img');
              imageElement.src = imageUrl;
              imageElement.alt = 'API Image';
              imageContainer.appendChild(imageElement);
            } else {
              var noImageElement = document.createElement('p');
              noImageElement.textContent = 'No image found';
              imageContainer.appendChild(noImageElement);
            }
          }
        });
      })
      .catch(function(error) {
        console.error('Request failed:', error);
      });
  </script> */
}
