import React, { useEffect, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import "./home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { InputDefault } from "../../utils/input/inputDefault";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { authToken } from "../../../config/auth";
const accessToken = authToken;

function Map() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const [search, setSearch] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({ ...location, latitude, longitude });
        setUserLocation({ longitude, latitude });
      }
    );
  };

  useEffect(() => {
    getLocation();
  });

  return (
    <div className="app">
      <span className="search">
        <div>
          <span>
            <InputDefault
              type="text"
              id="search-input"
              required={false}
              placeholder="Buscar... exemplo: Moto taxi"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <ButtonDefault type="submit">
              <IoIosSearch color="#f9b411" size="26" />
            </ButtonDefault>
          </span>
          <ButtonDefault type="default">
            <IoIosMenu color="#fff" opacity="0.9" size="30" />
          </ButtonDefault>
        </div>
      </span>
      <div className="map">
        <MapGL
          {...location}
          mapStyle="mapbox://styles/erislandio/ck6dv1zra4l9d1isguxuk45fp"
          mapboxApiAccessToken={accessToken}
          onViewportChange={setLocation}
        >
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            zoom={20}
          >
            <FaMapMarkerAlt
              color="#f9b411"
              size="30"
              onClick={() => console.log("y")}
            />
          </Marker>
        </MapGL>
      </div>
    </div>
  );
}

const DimensionedMap = Dimensions()(Map);

const App = () => (
  <div className="map-container">
    <DimensionedMap />
  </div>
);

export default App;
