import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map = ({ hospitals }) => {
  const [currentLocation, setCurrentLocation] = useState([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <MapContainer
      center={currentLocation}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <ChangeView center={currentLocation} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {hospitals.map((hospital) =>
        hospital.location && hospital.location.coordinates ? (
          <Marker
            key={hospital._id}
            position={[
              hospital.location.coordinates[1],
              hospital.location.coordinates[0],
            ]}
          >
            <Popup>
              <h2>{hospital.name}</h2>
              <p>{hospital.address}</p>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default Map;
