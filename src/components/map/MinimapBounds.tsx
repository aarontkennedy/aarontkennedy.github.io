import { useMemo, useCallback, useState } from "react";
import { useMapEvent, Rectangle } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { useEventHandlers, useLeafletContext } from "@react-leaflet/core";

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds = ({
  parentMap,
  zoom,
}: {
  parentMap: any;
  zoom: number;
}) => {
  const minimap = useMap();
  const context = useLeafletContext();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: any) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap, context }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

export default MinimapBounds;
