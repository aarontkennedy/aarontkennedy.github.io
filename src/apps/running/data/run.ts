import { LatLngExpression } from "leaflet";

export interface Result {
  date: string;
  distanceMiles: number;
  time: string;
}

export interface Run {
  name: string;
  location: string;
  results: Result[];
  url: string;
  latLng: LatLngExpression;
  tags: string[];
  notes: string;
}
