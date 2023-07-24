import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Icon } from "leaflet";

function App() {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  // markers
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

  return (
    <>
      <MapContainer center={[52.2297, 21.0122]} zoom={12}>
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
    </>
  );
}

export default App;
