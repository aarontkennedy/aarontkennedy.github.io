import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("leaflet", () => {
  const MockClass = vi.fn().mockImplementation(() => ({}));
  const latLng = vi.fn().mockImplementation((a: any) => {
    if (Array.isArray(a)) return { lat: a[0], lng: a[1] };
    return { lat: a, lng: 0 };
  });
  return {
    default: {
      Icon: MockClass,
      DivIcon: MockClass,
      divIcon: vi.fn().mockReturnValue({}),
      latLng,
    },
    Icon: MockClass,
    DivIcon: MockClass,
    Marker: class {},
    LatLngExpression: {},
    Map: class {},
  };
});

vi.mock("react-leaflet", () => ({
  TileLayer: () => null,
  ZoomControl: () => null,
}));

vi.mock("react-leaflet/MapContainer", () => ({
  MapContainer: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
}));

vi.mock("react-leaflet/hooks", () => ({
  useMap: () => ({
    getCenter: () => ({ lat: 46, lng: -94 }),
    addControl: vi.fn(),
    removeControl: vi.fn(),
    on: vi.fn(),
    eachLayer: vi.fn(),
  }),
}));

vi.mock("leaflet-geosearch", () => ({
  GeoSearchControl: vi.fn().mockImplementation(() => ({})),
  OpenStreetMapProvider: vi.fn().mockImplementation(() => ({})),
}));

import LatLongRecorder from "./LatLongRecorder";

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <LatLongRecorder />
    </MemoryRouter>
  );

describe("LatLongRecorder", () => {
  it("renders without crashing", () => {
    renderWithRouter();
    expect(document.body).toBeInTheDocument();
  });

  it("renders the map", () => {
    renderWithRouter();
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("shows the START button initially", () => {
    renderWithRouter();
    expect(screen.getByRole("button", { name: "START" })).toBeInTheDocument();
  });

  it("shows instructions when in stopped state", () => {
    renderWithRouter();
    expect(screen.getByText(/First, search for a location/i)).toBeInTheDocument();
  });

  it("switches to STOP button after clicking START", () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: "START" }));
    expect(screen.getByRole("button", { name: "STOP" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "START" })).not.toBeInTheDocument();
  });

  it("hides instructions after clicking START", () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: "START" }));
    expect(
      screen.queryByText(/First, search for a location/i)
    ).not.toBeInTheDocument();
  });

  it("returns to START button after clicking STOP", () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: "START" }));
    fireEvent.click(screen.getByRole("button", { name: "STOP" }));
    expect(screen.getByRole("button", { name: "START" })).toBeInTheDocument();
  });

  it("renders RESET, UNDO, and COPY buttons alongside START/STOP", () => {
    renderWithRouter();
    expect(screen.getByRole("button", { name: "RESET" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "UNDO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "COPY" })).toBeInTheDocument();
  });

  it("renders the attribution link", () => {
    renderWithRouter();
    expect(screen.getByText("Aaron")).toBeInTheDocument();
  });
});
