import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export const MapComponent = ({ location, onViewportChanged, userLocation }) => {
  return (
    <Map
      center={location.center}
      zoom={location.zoom}
      onViewportChanged={onViewportChanged}
    >
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
