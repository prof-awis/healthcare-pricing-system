import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const DraggableMarker = () => {
    const [position, setPosition] = React.useState(currentLocation);
    const markerRef = React.useRef(null);
    const eventHandlers = React.useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span>You are here</span>
        </Popup>
      </Marker>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <MapContainer
            center={currentLocation}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
            whenCreated={(mapInstance) => {
              const searchControl = new GeoSearchControl({
                provider: new OpenStreetMapProvider(),
                showMarker: true,
                retainZoomLevel: true,
              });
              mapInstance.addControl(searchControl);
              L.control.locate().addTo(mapInstance);
              L.control.scale().addTo(mapInstance);
              L.control.fullscreen().addTo(mapInstance);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker />
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
        </div>
      </div>
    </div>
  );
};

export default Map;
