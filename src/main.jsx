import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Import our custom CSS
import "./scss/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
//for leafletmaps
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
