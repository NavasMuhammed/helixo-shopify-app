import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        await fetch("http://localhost:58693/api/badges")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSelectedImages(data);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBadges();
  }, []);
  return (
    <div className="trust-badge-container">
      {loading && <div className="loader">Loading...</div>}
      {selectedImages &&
        loading === false &&
        selectedImages.length > 0 &&
        selectedImages.map((item, index) => {
          return (
            item.state && (
              <img
                className="trust--badge"
                key={index}
                src={item.url}
                alt="api"
              />
            )
          );
        })}
    </div>
  );
}

export default App;
