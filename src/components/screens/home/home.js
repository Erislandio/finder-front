import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import { MdMyLocation } from "react-icons/md";
import { MapComponent } from "./map";
import { FilterItem } from "./filterItem";
import { options } from "./options";
import { userProvider, UserContext } from "./userProvider";
import { Sidebar } from "./sidebar";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const MapContainer = ({ history }) => {
  const {
    user: { token }
  } = useContext(UserContext);
  const [location, setLocation] = useState({
    center: [0, 0],
    zoom: 14
  });

  const { addToast } = useToasts();

  const [userLocation, setUserLocation] = useState([0, 0]);
  const [providers, setProviders] = useState([]);
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setFilter(e.target.value);
    axios
      .post("https://whispering-headland-58237.herokuapp.com/search/type", {
        type: e.target.value,
        latitude: userLocation[0],
        longitude: userLocation[1]
      })
      .then(({ data }) => {
        setProviders(data.providers);
      })
      .catch(err => {
        addToast("Não foi possível fazer a busca, tente novamente", {
          appearance: "error"
        });
      });
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
            onClick={() =>
              setLocation({ ...location, center: userLocation.reverse() })
            }
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
        providers={providers}
      />
    </section>
  );
};

export default userProvider(MapContainer);
