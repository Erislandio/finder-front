import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./home.css";

const MapContainer = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    zoom: 14
  });

  const [userLocation, setUserLocation] = useState([0, 0]);

  const [search, setSearch] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({ ...location, lat: latitude, lng: longitude });
        setUserLocation([latitude, longitude]);
      }
    );
  };

  useEffect(() => {
    getLocation();
  });

  const position = [location.lat, location.lng];
  console.log(userLocation, position);

  return (
    <Map center={position} zoom={location.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userLocation}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapContainer;
