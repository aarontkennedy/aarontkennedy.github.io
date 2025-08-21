import { useState, useRef } from "react";
import { Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import { LatLngExpression, PathOptions } from "leaflet";
import { Icon } from "leaflet";

const MarkerWithPolyline = ({
  position,
  icon,
  popUpContents,
  path,
  pathOptions,
  toolTipContents,
}: {
  position: LatLngExpression;
  icon: Icon;
  popUpContents?: JSX.Element | string;
  path: LatLngExpression[];
  pathOptions: PathOptions;
  toolTipContents?: JSX.Element | string;
}) => {
  const markerRef = useRef(null);
  const [showPolyline, setShowPolyline] = useState(true);
  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      // eventHandlers={{
      //   mouseover() {
      //     setShowPolyline(true);
      //   },
      //   mouseout() {
      //     setShowPolyline(false);
      //   },
      // }}
    >
      {popUpContents && <Popup>{popUpContents}</Popup>}
      {toolTipContents && <Tooltip>{toolTipContents}</Tooltip>}
      {showPolyline && <Polyline pathOptions={pathOptions} positions={path} />}
    </Marker>
  );
};

export default MarkerWithPolyline;
