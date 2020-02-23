import React, { useEffect, useState } from "react";
import "./home.css";
import { MdMyLocation } from "react-icons/md";
import { MapComponent } from "./map";
import { FilterItem } from "./filterItem";
import { options } from "./options";

import { userProvider } from "./userProvider";
import { Sidebar } from "./sidebar";

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
            <Sidebar history={history} />
          </div>
        </span>
      </div>
      <MapComponent
        setOpen={setOpen}
        location={location}
        userLocation={userLocation}
        onViewportChanged={onViewportChanged}
      />
    </section>
  );
};

export default userProvider(MapContainer);
