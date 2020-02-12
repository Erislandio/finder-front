import React, { useEffect, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import "./home.css";
import { FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import { InputDefault } from "../../utils/input/inputDefault";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { IoIosSettings, IoIosSearch, IoMdExit } from "react-icons/io";

function Map() {
  const accessToken =
    "pk.eyJ1IjoiZXJpc2xhbmRpbyIsImEiOiJjazZkdjE2aGExcmJ5M3FwYmg0MzBzaGd4In0._MoxaYScCdkosFswaDN-SQ";
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  const [search, setSearch] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({ ...location, latitude, longitude });
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
          <InputDefault
            type="text"
            id="search-input"
            required={false}
            placeholder="Buscar"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <ButtonDefault type="submit">
            <IoIosSearch color="#f9b411" size="26" />
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
          <Marker longitude={-46.5599117} latitude={-22.9183867} zoom={20}>
            <FaMapMarkerAlt
              color="#f9b411"
              size="30"
              onClick={() => console.log("y")}
            />
          </Marker>
        </MapGL>
      </div>
      <div className="submenu">
        <span>
          <IoMdExit size="30" />
          sair
        </span>
        <span>
          <IoIosSearch size="30" />
          buscar
        </span>
        <span>
          <IoIosSettings size="30" />
          conta
        </span>
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
