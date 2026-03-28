import { useState, useRef } from "react";
import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression, Map, Marker } from "leaflet";
import SearchField from "../../../components/map/SearchField";
import "./LatLongRecorder.scss";
import { Link } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useMap } from "react-leaflet/hooks";
import * as L from "leaflet";

const ResetButton = ({ reset }: { reset: () => void }) => {
  const map = useMap();
  return (
    <button
      className="latLongRecorder__button"
      onClick={() => {
        reset();
        map.eachLayer((item) => {
          if (item instanceof Marker) {
            item.remove();
          }
        });
      }}
    >
      RESET
    </button>
  );
};

const LatLongRecorder = () => {
  const mapRef = useRef<Map>(null);
  const centerOfMinnesota: LatLngExpression = [46.7296, -94.6859];
  const [latLongList, setLatLongList] = useState<LatLngExpression[] | false>(
    false,
  );

  const push = (ll: LatLngExpression) => {
    setLatLongList((prevState) => {
      if (prevState === false) {
        return false;
      }
      let lastElement = prevState[prevState.length - 1];
      if (!lastElement || lastElement.toString() !== ll.toString()) {
        return [...prevState, ll];
      }
      return prevState;
    });
  };

  const remove = () => {
    setLatLongList((prevState) => {
      if (prevState === false) {
        return false;
      }
      if (prevState.length <= 0) {
        return [];
      }
      const arrayCopy = [...prevState];
      arrayCopy.pop();
      return arrayCopy;
    });
  };

  const reset = (): void => {
    setLatLongList((prevState) => {
      if (prevState === false) {
        return false;
      }
      return [];
    });
  };

  return (
    <>
      <Header />
      <MapContainer
        ref={mapRef}
        center={centerOfMinnesota}
        zoom={6}
        scrollWheelZoom={false}
        style={{
          height: `100vh`,
          width: `100vw`,
        }}
        zoomControl={false}
        className="latLongRecorder"
      >
        <SearchField
          setDragEnd={(ll: LatLngExpression) => {
            push(ll);
          }}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
        <div className="latLongRecorder__container">
          <div className="latLongRecorder__button-wrap">
            <button
              className="latLongRecorder__button"
              onClick={() => {
                setLatLongList((prevState) => {
                  if (prevState === false) {
                    return [];
                  }
                  return false;
                });
              }}
            >
              {latLongList === false ? "START" : "STOP"}
            </button>
            <ResetButton reset={reset} />
            <button
              className="latLongRecorder__button"
              onClick={() => {
                remove();
              }}
            >
              UNDO
            </button>
            <button
              className="latLongRecorder__button"
              onClick={() => {
                if (!latLongList) {
                  return;
                }

                const stringArray = latLongList.map((ll) => {
                  // const { lat, lng } = ll;
                  const latLngObject = L.latLng(ll);
                  return `[${latLngObject.lat},${latLngObject.lng}]`;
                });
                const finalString = `[\n${stringArray.join(",\n")}\n]`;

                navigator.clipboard.writeText(finalString);
              }}
            >
              COPY
            </button>
          </div>
          <ol className="latLongRecorder__list">
            {latLongList &&
              latLongList.map((ll, index) => {
                const latLngObject = L.latLng(ll);
                return (
                  <li key={`${index}-${ll.toString()}`}>
                    {latLngObject.lat},{latLngObject.lng}
                  </li>
                );
              })}
            {!latLongList && (
              <div>
                <p>Instructions:</p>
                <p>
                  First, search for a location on the map. Then click "START".
                  Drag the marker to record lat/long coordinates. You can use
                  "COPY" to copy the recorded coordinates to your clipboard.
                </p>
              </div>
            )}
          </ol>
          <div className="latLongRecorder__back-link">
            LatLongRecorder by <Link to="/">Aaron</Link>
          </div>
        </div>
      </MapContainer>
    </>
  );
};

export default LatLongRecorder;
