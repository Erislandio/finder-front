import React, { useEffect, useState } from "react";
import "./home.css";
import {
  MdMyLocation,
  MdExitToApp,
  MdLocalPhone,
  MdAddAPhoto
} from "react-icons/md";
import { MapComponent } from "./map";
import { FilterItem } from "./filterItem";
import { options } from "./options";
import cookie from "js-cookie";
import { IoIosArrowForward } from "react-icons/io";
import { userProvider } from "./userProvider";

const MapContainer = ({ history }) => {
  const [location, setLocation] = useState({
    center: [0, 0],
    zoom: 14
  });

  const [userLocation, setUserLocation] = useState([0, 0]);
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({ ...location, center: [latitude, longitude] });
        setUserLocation([latitude, longitude]);
      }
    );
  };

  const onViewportChanged = viewport => {
    setLocation({ viewport });
  };

  useEffect(() => {
    getLocation();
  });

  const handleFilter = e => {
    setFilter(e.target.value);
    // buscar na api de serach por filtro
  };

  const handleLogout = () => {
    cookie.remove("user");
    history.push("/");
  };

  const left = open ? "0px" : "-100%";

  return (
    <section>
      <div className="app">
        <span className="search">
          <FilterItem
            options={options}
            handleFilter={handleFilter}
            filter={filter}
            setOpen={setOpen}
            open={open}
          />
          <button
            className="user-marker"
            style={{ right: open ? "-100%" : "13px" }}
          >
            <MdMyLocation size="50" color="#fff" />
          </button>
          <div className="dropbar" style={{ left }}>
            <div className="banner">
              <MdAddAPhoto
                className="banner-change"
                color="#fff"
                opacity="0.8"
                size={30}
              />
              <div className="user-logo"></div>
            </div>
            <div className="user-description">
              <h2>Erislandio soares</h2>
              <h3>
                <MdLocalPhone color="#2ecc71" />
                11 942676399
              </h3>
            </div>
            <div className="button-container">
              <button className="see-more">
                Ver mais
                <IoIosArrowForward size={15} color="#fff" />
              </button>
              <button className="logout" onClick={handleLogout}>
                Sair
                <MdExitToApp size={20} color="#fff" />
              </button>
            </div>
          </div>
        </span>
      </div>
      <MapComponent
        location={location}
        userLocation={userLocation}
        onViewportChanged={onViewportChanged}
      />
    </section>
  );
};

export default userProvider(MapContainer);
