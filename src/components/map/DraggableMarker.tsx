import { useState, useRef, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const DraggableMarker = ({
  initialPosition,
  setDragEnd,
}: {
  initialPosition: LatLngExpression;
  setDragEnd?: (ll: LatLngExpression) => void;
}) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const ll = marker.getLatLng();
          setPosition(ll);
          if (setDragEnd) {
            setDragEnd(ll);
          }
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
