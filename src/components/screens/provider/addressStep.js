import React, { useState, useEffect, createRef } from "react";
import { Container } from "../../utils/container/container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { IoIosArrowBack } from "react-icons/io";
import { api } from "../../../service/api";

export const AddressStep = ({ history }) => {
  const refmarker = createRef();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
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
    e.preventDefault();

    if (!cookie.get("user")) {
      return addToast("Não foi possível fazer o cadastro momento", {
        appearance: "error"
      });
    }

    setLoadingData(true);

    try {
      const hash = cookie.get("user").replace(/%22/g, '"');
      const auth = JSON.parse(hash);

      const userId = auth.id;

      api
        .patch(`/provider/coordinates`, {
          id: userId,
          lat: locationMap.marker.lat,
          lon: locationMap.marker.lng
        })
        .then(({ data }) => {
          if (data) {
            addToast("Parabens seu negócio foi cadastrado com sucesso", {
              appearance: "success"
            });

            setTimeout(() => {
              history.push("/dashboard");
            });
          }
        })
        .catch(() => {
          return addToast("Não foi possível fazer o cadastro momento", {
            appearance: "error"
          });
        })
        .finally(() => {
          setLoadingData(false);
        });
    } catch (error) {
      setLoadingData(false);

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
  };

  const updatePosition = () => {
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
          {loading || loadingData ? (
            <div style={{ minHeight: "300px" }}>
              <Loader type="TailSpin" color="#f9b411" height={18} width={18} />
            </div>
          ) : (
            <form onSubmit={e => e.preventDefault()}>
              <div className="button-address">
                <ButtonDefault onClick={() => setShowMap(true)}>
                  Definir no mapa?
                </ButtonDefault>
                <p>ou</p>
                <ButtonDefault onClick={handleSubmit}>
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
                <span
                  style={{ padding: "10px", display: "flex" }}
                  onClick={toggleDraggable}
                >
                  Sua localização atual
                </span>
              </Popup>
            </Marker>
          </Map>
        )}
        <div className="btn-save-address">
          <ButtonDefault onClick={handleSubmit}>
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
