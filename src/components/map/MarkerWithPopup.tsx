import { useRef } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const MarkerWithPopup = ({
  position,
  popUpContents,
  toolTipContents,
}: {
  position: LatLngExpression;
  popUpContents?: JSX.Element | string;
  toolTipContents?: JSX.Element | string;
}) => {
  const markerRef = useRef(null);
  return (
    <Marker ref={markerRef} position={position}>
      {popUpContents && <Popup>{popUpContents}</Popup>}
      {toolTipContents && <Tooltip>{toolTipContents}</Tooltip>}
    </Marker>
  );
};

export default MarkerWithPopup;
