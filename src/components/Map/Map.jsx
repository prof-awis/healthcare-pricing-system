import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import Paginate from "react-paginate";
import { Col, Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Map = ({ onPointSelected }) => {
  const [value, setValue] = useState(null);
  const [input, setInput] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState({ lat: -1.2921, lng: 36.8219 });
  const [directions, setDirections] = useState(null);
  const [distantHospitals, setDistantHospitals] = useState([]);

  const changeValueHandler = async (val) => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Update the center and zoom level
      setCenter(currentLocation);
      setZoom(18.5); // or any other zoom level you prefer, up to 21

      const addresses = await geocodeByAddress(val);
      const destination = await getLatLng(addresses[0]);

      // Create a DirectionsService object
      const directionsService = new window.google.maps.DirectionsService();

      // Calculate directions from the current location to the searched place
      directionsService.route(
        {
          origin: currentLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections([result]);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      // Fetch the nearest hospitals within a 10km radius
      const response = await fetch(
        `http://localhost:5050/hospitals/search?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&radius=10000`
      );
      const data = await response.json();
      setDistantHospitals(data);
    });
  };

  const searchHandler = async () => {
    const response = await fetch(
      `http://localhost:5050/hospitals/search?latitude=${value.lat}&longitude=${value.lng}`
    );
    const data = await response.json();
    console.log(data);
  };

  // Define the number of hospitals per page
  const HOSPITALS_PER_PAGE = 5;
  const PER_PAGE = 5;

  // Create a state variable for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last hospital on the current page
  const indexOfLastHospital = currentPage * HOSPITALS_PER_PAGE;
  const indexOfFirstHospital = indexOfLastHospital - HOSPITALS_PER_PAGE;

  // Get the hospitals on the current page
  const currentHospitals = distantHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  // Create a function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const offset = currentPage * PER_PAGE;

  // Sort hospitals by distance
  const sortedHospitals = [...hospitals].sort(
    (a, b) => a.distance - b.distance
  );

  const currentPageData = sortedHospitals
    .slice(offset, offset + PER_PAGE)
    .map((hospital, hospitalIndex) => (
      <div key={hospital._id}>
        <h2>{hospital.title}</h2>
        <p>{hospital.address}</p>
        <p>{hospital.distance} Kms away</p>
      </div>
    ));

  const pageCount = Math.ceil(hospitals.length / PER_PAGE);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const nextPage = () => setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  const prevPage = () => setCurrentPage((prevPageNumber) => prevPageNumber - 1);

  const onMapClick = (event) => {
    setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setZoom(18); // or any other zoom level you prefer
  };

  return (
    <Container className="container-fluid ">
      <Row className="py-3 min-vw-100  ">
        <Col className="col-sm-12 col-md-6 justify-content-center align-align-items-center ">
          <PlacesAutocomplete
            value={input}
            onChange={(e) => {
              setInput(e);
            }}
            onSelect={(val) => {
              changeValueHandler(val);
            }}
            searchOptions={{
              // types: ["(cities)"],
              componentRestrictions: { country: "ke" },
            }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="py-1 px-5">
                <div className="d-flex px-sm-2  px-md-5 ">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "location-search-input form-control shadow-none w-100 p-2",
                    })}
                  />
                  <button className="btn btn-primary" onClick={searchHandler}>
                    Search
                  </button>
                </div>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          {currentHospitals.map((hospital, index) => (
            <div key={index} className="px-5">
              <div className="accordion p-2 " id={`accordionExample${index}`}>
                <div className="accordion-item ">
                  <div
                    className="accordion-header text-center "
                    id={`heading${index}`}
                  >
                    <button
                      className="accordion-button btn  btn-block w-100 shadow-none d-flex flex-column "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                    >
                      <h2>{hospital.title}</h2>
                      <p>{hospital.address}</p>
                      <p>
                        {hospital.distance.toFixed(2)} km away from your
                        location
                      </p>
                    </button>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse show"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent={`#accordionExample${index}`}
                  >
                    <div className="card-body">
                      <p>Services:</p>
                      {hospital.services.map((service, serviceIndex) => (
                        <div key={serviceIndex}>
                          <p>
                            {service.name}: Kshs. {service.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Paginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link shadow-none"}
            nextLinkClassName={"page-link shadow-none"}
            pageClassName={"page-item"} // add this line
            pageLinkClassName={"page-link"} // add this line
            activeClassName={"active"}
            breakLabel={"..."}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
          {/* Custom Pagination */}
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ← Previous
            </button>
            {Array(pageCount)
              .fill()
              .map((_, index) => (
                <button key={index} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
            <button
              disabled={currentPage === pageCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next →
            </button>
            <p>
              Page {currentPage} of {pageCount}
            </p>
          </div>
        </Col>
        <Col className="px-3 col-12 col-md-6 ">
          <h6 className="text-center text-info fst-italic py-4 ">
            {" "}
            See Directions
          </h6>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={zoom} // zoom level that shows the whole of Kenya
            onClick={onMapClick}
            onLoad={(map) => {
              const bounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(-4.6796, 33.9099),
                new window.google.maps.LatLng(5.033, 41.8991)
              );
              map.setOptions({
                restriction: {
                  latLngBounds: bounds,
                  strictBounds: true,
                },
              });
            }}
          >
            {directions &&
              directions.map((direction, index) => (
                <DirectionsRenderer key={index} directions={direction} />
              ))}
            {currentPageData.map((hospital) =>
              hospital.location && hospital.location.coordinates ? (
                <Marker
                  key={hospital.id} // using hospital id as key
                  position={{
                    lat: hospital.location.coordinates[1],
                    lng: hospital.location.coordinates[0],
                  }}
                />
              ) : null
            )}
          </GoogleMap>
        </Col>
      </Row>
    </Container>
  );
};

export default Map;
