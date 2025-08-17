import { useMemo } from "react";
import { TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { useMap } from "react-leaflet/hooks";
import MinimapBounds from "../map/MinimapBounds";

interface PositionClassMap {
  [key: string]: string | undefined;
}

// Classes used by Leaflet to position controls
const POSITION_CLASSES: PositionClassMap = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const MinimapControl = ({
  position,
  zoom = 0,
}: {
  position: string;
  zoom?: number | null;
}) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};

export default MinimapControl;
