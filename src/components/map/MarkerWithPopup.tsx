import { useRef } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { DivIcon, Icon, LatLngExpression } from "leaflet";

const MarkerWithPopup = ({
  position,
  popUpContents,
  toolTipContents,
  icon,
}: {
  position: LatLngExpression;
  popUpContents?: JSX.Element | string;
  toolTipContents?: JSX.Element | string;
  icon: DivIcon | Icon;
}) => {
  const markerRef = useRef(null);
  return (
    <Marker ref={markerRef} position={position} icon={icon}>
      {popUpContents && <Popup>{popUpContents}</Popup>}
      {toolTipContents && <Tooltip>{toolTipContents}</Tooltip>}
    </Marker>
  );
};

export default MarkerWithPopup;
