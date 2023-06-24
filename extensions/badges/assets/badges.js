// Fetch data containing image URLs
fetch("https://helixo-backend.onrender.com/api/badges")
  .then(function (response) {
    return response.json();
  })
  .then(function (dataList) {
    // Get the image container element
    var imageContainer = document.getElementById("image-container");

    // Generate the HTML content with the images from the data list
    var content = "";
    dataList.forEach(function (data) {
      if (data.state === true) {
        content +=
          "<div>" +
          '<img class="small-image" src="' +
          data.url +
          '" alt="">' +
          "</div>";
      }
    });

    // Set the content inside the image container
    imageContainer.innerHTML = content;
  })
  .catch(function (error) {
    console.error("Error:", error);
  });
