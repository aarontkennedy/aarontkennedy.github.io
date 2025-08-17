import { LatLngExpression } from "leaflet";

export interface Url {
  date: string;
  url: string;
  notes: string;
}

export interface Paddle {
  name: string;
  urls: Url[];
  route: LatLngExpression[];
}
