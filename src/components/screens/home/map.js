import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { UserContext } from "./userProvider";

export const MapComponent = ({
  location,
  onViewportChanged,
  userLocation,
  setOpen
}) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { image, name, lastname } = user;

  const userImage = image
    ? `https://whispering-headland-58237.herokuapp.com${image}`
    : "https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg";

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
          <div className="user-marker-image">
            <img src={userImage} alt={name} />
            <h3>
              {name} {lastname}
            </h3>
          </div>
        </Popup>
      </Marker>
    </Map>
  );
};
