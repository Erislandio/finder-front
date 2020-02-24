import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { UserContext } from "./userProvider";
import { ProfileMarker } from "./profileMarker";

export const MapComponent = ({
  location,
  onViewportChanged,
  userLocation,
  providers
}) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { image, name, lastname } = user;

  const userImage = image
    ? `data:image/png;base64,${image}`
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
          <ProfileMarker
            name={name}
            lastname={lastname}
            userImage={userImage}
          />
        </Popup>
      </Marker>
      {providers.map(provider => {
        return (
          <Marker key={provider._id} position={provider.location.coordinates.reverse()}>
            <Popup>{provider.fancyName}</Popup>
          </Marker>
        );
      })}
    </Map>
  );
};
