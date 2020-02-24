import React, { useState, useEffect, createRef } from "react";
import { Container } from "../../utils/container/container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../service/api";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { IoIosArrowBack } from "react-icons/io";

export const AddressStep = ({ history }) => {
  const refmarker = createRef();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [locationMap, setLocationMap] = useState({
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 14,
    marker: {
      lat: 0,
      lng: 0
    },
    draggable: true
  });
  const { addToast } = useToasts();

  const handleSubmit = async e => {
    cookie.remove("user");
    e.preventDefault();
    try {
    } catch (error) {
      return addToast("Não foi possível fazer o cadastro momento", {
        appearance: "error"
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocationMap({
          ...locationMap,
          center: {
            lat: latitude,
            lng: longitude
          },
          marker: {
            lat: latitude,
            lng: longitude
          }
        });
        setLoading(false);
      }
    );
  };

  const right = showMap ? "0px" : "-100%";

  const toggleDraggable = () => {
    setLocationMap({ ...locationMap, draggable: !locationMap.draggable });
    setShowButton(false);
  };

  const updatePosition = () => {
    setShowButton(true);
    const marker = refmarker.current;
    if (marker != null) {
      setLocationMap({
        ...locationMap,
        marker: marker.leafletElement.getLatLng()
      });
    }
  };

  const positionCenter = [locationMap.center.lat, locationMap.center.lng];
  const markerPosition = [locationMap.marker.lat, locationMap.marker.lng];

  console.log(showButton);

  return (
    <>
      <Container id="login" className="signin">
        <main className="main-login">
          <div className="title">
            <span
              className="logo"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h1>FINDER</h1>
              <FaMapMarkerAlt size="40" />
            </span>
          </div>
          <h2>Definir endereço</h2>
          <p>Estamos quase lá :-)</p>
          {loading ? (
            <div style={{ minHeight: "300px" }}>
              <Loader type="TailSpin" color="#f9b411" height={18} width={18} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="button-address" onClick={() => setShowMap(true)}>
                <ButtonDefault>Definir no mapa?</ButtonDefault>
                <p>ou</p>
                <ButtonDefault onClick={getLocation}>
                  Pegar localização atual?
                </ButtonDefault>
              </div>
            </form>
          )}
        </main>
      </Container>
      <div className="map-step" style={{ right }}>
        <span onClick={() => setShowMap(false)}>
          <IoIosArrowBack color="#f9b411" size={30} />
          Voltar
        </span>
        {loading ? (
          <div style={{ minHeight: "100vh" }}>
            <Loader type="TailSpin" color="#f9b411" height={18} width={18} />
          </div>
        ) : (
          <Map center={positionCenter} zoom={locationMap.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              draggable={locationMap.draggable}
              onDragend={updatePosition}
              position={markerPosition}
              ref={refmarker}
            >
              <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                  {locationMap.draggable ? "DRAG MARKER" : "MARKER FIXED"}
                </span>
              </Popup>
            </Marker>
          </Map>
        )}
        <div className="btn-save-address">
          <ButtonDefault>
            {loadingData ? (
              <Loader type="TailSpin" color="#f9b411" height={18} width={18} />
            ) : (
              "Definir local"
            )}
          </ButtonDefault>
        </div>
      </div>
    </>
  );
};
