import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { UserContext } from "./userProvider";
import { ProfileMarker } from "./profileMarker";
import { Link } from "react-router-dom";

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
    ? image
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
        const banner = provider.banner
          ? `url(${provider.banner})`
          : "https://www.bigprintinglasvegas.com/wp-content/uploads/2017/04/large-photo-placeholder-dark-gray-blue-1.png";

        return (
          <Marker
            key={provider._id}
            position={provider.location.coordinates.reverse()}
          >
            <Popup>
              <Link to={`/details/${provider._id}`}>
                <div
                  className="provider-card"
                  style={{ backgroundImage: banner }}
                  onClick={() => console.log(provider._id)}
                ></div>
                <h3>{provider.fancyName}</h3>
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};
