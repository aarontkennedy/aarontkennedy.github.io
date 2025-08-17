import { useEffect } from "react";
import { useMap } from "react-leaflet/hooks";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "node_modules/leaflet-geosearch/dist/geosearch.css";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";
import { LatLngExpression, Marker } from "leaflet";

const SearchField = ({
  setDragEnd,
}: {
  setDragEnd?: (ll: LatLngExpression) => void;
}) => {
  const provider = new OpenStreetMapProvider({
    params: {
      countrycodes: "us,ca",
    },
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "button",
    searchLabel: "Enter place",
    keepResult: true,
    position: "topleft",
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", () => {
      // if (marker) {
      //   map.removeControl(marker);
      // }
      // The marker class extends the layer class,
      // so you can search for it among the layers
      map.eachLayer((item) => {
        if (item instanceof Marker) {
          // Once you found it, set the properties
          item.options.draggable = true;
          item.options.autoPan = true;
          item.unbindPopup();
          // Then enable the dragging. Without this, it wont work
          // @ts-ignore
          item.dragging.enable();
          item.addEventListener("dragend", () => {
            const marker = item;
            if (marker != null) {
              const ll = marker.getLatLng();
              if (setDragEnd) {
                setDragEnd(ll);
              }
            }
          });
        }
      });
    });
    return () => {
      map.removeControl(searchControl);
    };
  }, [setDragEnd]);

  return null;
};

export default SearchField;
