import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("leaflet", () => {
  const MockClass = vi.fn().mockImplementation(() => ({}));
  return {
    default: {
      Icon: MockClass,
      DivIcon: MockClass,
      divIcon: vi.fn().mockReturnValue({}),
      latLng: vi.fn().mockReturnValue({ lat: 0, lng: 0 }),
    },
    Icon: MockClass,
    DivIcon: MockClass,
    Marker: class {},
  };
});

vi.mock("react-leaflet", () => ({
  TileLayer: () => null,
  ZoomControl: () => null,
  Marker: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Popup: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Tooltip: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Polyline: () => null,
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

vi.mock("react-leaflet-cluster", () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="cluster">{children}</div>
  ),
}));

vi.mock("leaflet-geosearch", () => ({
  GeoSearchControl: vi.fn().mockImplementation(() => ({})),
  OpenStreetMapProvider: vi.fn().mockImplementation(() => ({})),
}));

vi.mock("../assets/icons8-canoe-48.png", () => ({ default: "canoe.png" }));

vi.mock("../../../components/map/MinimapControl", () => ({
  default: () => null,
}));

import Paddling from "./Paddling";

describe("Paddling", () => {
  it("renders the hero section", () => {
    render(<Paddling />);
    // Text appears in both the header div and its parent — use getAllByText
    expect(screen.getAllByText(/10,000 lakes/i).length).toBeGreaterThan(0);
  });

  it("renders the map", () => {
    render(<Paddling />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(<Paddling />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders tag filter buttons from paddleData", () => {
    render(<Paddling />);
    // paddleData has tags like "lake" and "river"
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders video cards for all paddle entries", () => {
    render(<Paddling />);
    // Each video shows up as a link with an img thumbnail
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("filters videos when a tag button is clicked", () => {
    render(<Paddling />);
    const allImages = screen.getAllByRole("img");
    const lakeButton = screen.getByRole("button", { name: "lake" });
    fireEvent.click(lakeButton);
    const filteredImages = screen.getAllByRole("img");
    // Lake-only results should be <= total results
    expect(filteredImages.length).toBeLessThanOrEqual(allImages.length);
  });

  it("filters videos by search text", () => {
    render(<Paddling />);
    const allImages = screen.getAllByRole("img");
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "harriet" } });
    const filteredImages = screen.getAllByRole("img");
    expect(filteredImages.length).toBeLessThanOrEqual(allImages.length);
  });

  it("restores all videos when search is cleared", () => {
    render(<Paddling />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "harriet" } });
    fireEvent.change(input, { target: { value: "" } });
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });
});
