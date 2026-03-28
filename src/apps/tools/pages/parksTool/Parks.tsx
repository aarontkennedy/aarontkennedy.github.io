import { useState, useMemo } from "react";
import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import useScreenSize from "../../../../hooks/useScreenSize";
import MinimapControl from "../../../../components/map/MinimapControl";
import MarkerWithPopup from "../../../../components/map/MarkerWithPopup";
import { default as stateParksData } from "./data/stateParks.json";
import { default as nationalParksData } from "./data/nationalParks.json";
import { default as roadsideAttractionsData } from "./data/roadsideAttractions.json";
import L from "leaflet";
import Header from "../../../../components/header/Header";
import SearchField from "../../../../components/map/SearchField";
import "./Parks.scss";
import Footer from "../../../../components/footer/Footer";

export interface Park {
  name: string;
  location: string; // country/parish/island
  state: string;
  country: string;
  // yearEstablished
  address: string;
  longitudeLatitude: number[] | null;
  imageURL: string | null;
  remarks: string | null;
}

const getMarkerHtmlStyles = (color: string): string => `
  background-color: ${color};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const centerOfUsa: LatLngExpression = [39.8283, -98.5795];

const createParkMarkers = (parksData: Park[]) => {
  if (!Array.isArray(parksData)) {
    console.error("Invalid parks data format:", parksData);
    return [];
  }

  return parksData
    .filter((park) => validateParkData(park))
    .map((park: Park, index: number) => {
      const id = park.name + index;
      const contents = convertParkDataToHtml(park);
      if (!park.longitudeLatitude || park.longitudeLatitude.length !== 2) {
        console.warn("Invalid coordinates for park:", park.name);
        return null;
      }

      return (
        <MarkerWithPopup
          key={id}
          position={[park.longitudeLatitude[1], park.longitudeLatitude[0]]}
          popUpContents={contents}
          icon={L.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: `<span style="${getMarkerHtmlStyles(convertToColor(park)).replace(/"/g, '"')}" />`,
          })}
        ></MarkerWithPopup>
      );
    })
    .filter((marker) => marker !== null) as JSX.Element[];
};

export const validateParkData = (park: any): park is Park => {
  if (!park || typeof park !== "object") return false;
  if (typeof park.name !== "string" || park.name.trim() === "") return false;
  if (typeof park.location !== "string" || park.location.trim() === "")
    return false;
  if (typeof park.state !== "string" || park.state.trim() === "") return false;
  if (typeof park.country !== "string" || park.country.trim() === "")
    return false;
  if (park.address && typeof park.address !== "string") return false;
  if (park.remarks && typeof park.remarks !== "string") return false;
  if (park.imageURL && typeof park.imageURL !== "string") return false;
  if (park.longitudeLatitude !== null) {
    if (
      !Array.isArray(park.longitudeLatitude) ||
      park.longitudeLatitude.length !== 2
    )
      return false;
    if (
      typeof park.longitudeLatitude[0] !== "number" ||
      typeof park.longitudeLatitude[1] !== "number"
    )
      return false;
  }
  return true;
};

const convertParkDataToHtml = (park: Park): JSX.Element => {
  const name = park.name || "Unknown";
  const location = park.location || "Unknown location";
  const state = park.state || "Unknown state";
  const address = park.address || "Address not available";
  const remarks = park.remarks || "No remarks available";

  return (
    <div>
      <div>{name}</div>
      <div>
        {location}, {state}
      </div>
      <div>{address}</div>
      <div>{remarks}</div>
    </div>
  );
};

export const convertToColor = (park: Park): string => {
  if (!park.name) return "red";
  const name = park.name.toLocaleLowerCase();
  if (name.includes("national park")) {
    return "#005000";
  }
  if (name.includes("national monument")) {
    return "#007000";
  }
  if (name.includes("national historic site")) {
    return "#009000";
  }
  if (name.includes("national seashore")) {
    return "#00A000";
  }
  if (name.includes("national battlefield")) {
    return "#00c000";
  }
  if (name.includes("national")) {
    return "#00e000";
  }
  if (name.includes("state park")) {
    return "#000050";
  }
  if (
    name.includes("state natural") ||
    name.includes("wildlife area") ||
    name.includes("state forest")
  ) {
    return "#000070";
  }
  if (name.includes("state historic")) {
    return "#000090";
  }
  if (name.includes("recreation area")) {
    return "#0000A0";
  }
  if (name.includes("state")) {
    return "#0000D0";
  }
  return "red";
};

const Parks = () => {
  const screenSize = useScreenSize();
  const [showNational, setShowNational] = useState(true);
  const [showState, setShowState] = useState(true);
  const [showRoadsideAttractions, setShowRoadsideAttractions] = useState(true);

  const stateMarkers = useMemo(() => createParkMarkers(stateParksData), []);
  const nationalMarkers = useMemo(
    () => createParkMarkers(nationalParksData),
    [],
  );
  const attractionMarkers = useMemo(
    () => createParkMarkers(roadsideAttractionsData),
    [],
  );

  const toggleNational = () => {
    setShowNational((prev) => !prev);
  };

  const toggleState = () => {
    setShowState((prev) => !prev);
  };
  const toggleRoadsideAttractions = () => {
    setShowRoadsideAttractions((prev) => !prev);
  };

  return (
    <div className="parks">
      <Header />
      <div className="parks__title">Roadtrip planner</div>
      <MapContainer
        center={centerOfUsa}
        zoom={4}
        scrollWheelZoom={false}
        style={{
          minHeight: `calc(100vh - 150px)`,
          width: `100%`,
        }}
        zoomControl={false}
        className="parks__map"
      >
        <SearchField />
        <ZoomControl position="topleft" />
        <div className="parks__legend">
          <label className="parks__legend-label">
            <input
              type="checkbox"
              name="national"
              checked={showNational}
              onChange={toggleNational}
            />
            National
          </label>
          <label className="parks__legend-label">
            <input
              type="checkbox"
              name="state"
              checked={showState}
              onChange={toggleState}
            />
            State
          </label>
          <label className="parks__legend-label">
            <input
              type="checkbox"
              name="roadsideAttractions"
              checked={showRoadsideAttractions}
              onChange={toggleRoadsideAttractions}
            />
            Roadside Attractions
          </label>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          maxClusterRadius={25}
          polygonOptions={{
            opacity: 0,
            fillOpacity: 0,
          }}
          chunkedLoading
        >
          {showState && stateMarkers}
          {showNational && nationalMarkers}
          {showRoadsideAttractions && attractionMarkers}
        </MarkerClusterGroup>
        {screenSize.width > 480 && (
          <MinimapControl position="topright" zoom={2} />
        )}
      </MapContainer>
      <Footer />
    </div>
  );
};

export default Parks;
