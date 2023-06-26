function loadScript(URL, loaded = () => {}) {
  const element = document.createElement("script");
  element.src = URL;
  element.type = "text/javascript";
  element.onload = function () {
    loaded();
  };
  document.getElementsByTagName("head")[0].appendChild(element);
}

const scriptURL = "http://localhost:50193/build/static/js/main.62510361.js";
loadScript(scriptURL, () => {
  // Script loaded callback
  console.log("Script loaded!");
});

