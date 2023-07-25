import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

import { Icon } from "leaflet";

function App() {
  const [placeName, setPlaceName] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  const markers = [
    {
      geocode: [52.2572312, 20.962743],
      popUp: {
        name: "DEIMOS SOFTWARE MARCIN ZIEMEK",
        street: "Bolkowska 1/32",
        city: "01-466 Warszawa",
      },
    },
  ];

  useEffect(() => {
    setPlaceName("Warszawa");
  }, []);

  useEffect(() => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      placeName
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const latitude = parseFloat(result.lat);
          const longitude = parseFloat(result.lon);
          setCoordinates({ lat: latitude, lng: longitude });
        } else {
          console.log("Nie znaleziono wyników dla podanej nazwy miejsca.");
          setCoordinates({ lat: null, lng: null }); // Ustawienie koordynatów na null, aby nie renderować mapy
        }
      })
      .catch((error) => {
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, [placeName]);

  return (
    <>
      {coordinates.lat !== null && coordinates.lng !== null ? (
        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h5>{marker.popUp.name}</h5>
                <p>{marker.popUp.street}</p>
                <p>{marker.popUp.city}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
