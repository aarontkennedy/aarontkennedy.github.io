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
}));

vi.mock("react-leaflet/MapContainer", () => ({
  MapContainer: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
}));

vi.mock("react-leaflet/hooks", () => ({
  useMap: () => ({
    getCenter: () => ({ lat: 39, lng: -98 }),
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

vi.mock("../../../../components/map/MinimapControl", () => ({
  default: () => null,
}));

import Parks from "./Parks";

describe("Parks", () => {
  it("renders without crashing", () => {
    render(<Parks />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders the page title", () => {
    render(<Parks />);
    expect(screen.getByText("Roadtrip planner")).toBeInTheDocument();
  });

  it("renders the map", () => {
    render(<Parks />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("renders all three checkboxes checked by default", () => {
    render(<Parks />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it("has National, State, and Roadside Attractions checkbox labels", () => {
    render(<Parks />);
    expect(screen.getByRole("checkbox", { name: /national/i })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /state/i })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /roadside attractions/i })).toBeInTheDocument();
  });

  it("unchecks the National checkbox when clicked", () => {
    render(<Parks />);
    const nationalCheckbox = screen.getByRole("checkbox", { name: /national/i });
    expect(nationalCheckbox).toBeChecked();
    fireEvent.click(nationalCheckbox);
    expect(nationalCheckbox).not.toBeChecked();
  });

  it("unchecks the State checkbox when clicked", () => {
    render(<Parks />);
    const stateCheckbox = screen.getByRole("checkbox", { name: /state/i });
    fireEvent.click(stateCheckbox);
    expect(stateCheckbox).not.toBeChecked();
  });

  it("unchecks the Roadside Attractions checkbox when clicked", () => {
    render(<Parks />);
    const roadsideCheckbox = screen.getByRole("checkbox", {
      name: /roadside attractions/i,
    });
    fireEvent.click(roadsideCheckbox);
    expect(roadsideCheckbox).not.toBeChecked();
  });

  it("re-checks a checkbox when clicked again", () => {
    render(<Parks />);
    const nationalCheckbox = screen.getByRole("checkbox", { name: /national/i });
    fireEvent.click(nationalCheckbox);
    expect(nationalCheckbox).not.toBeChecked();
    fireEvent.click(nationalCheckbox);
    expect(nationalCheckbox).toBeChecked();
  });

  it("renders the header and footer", () => {
    render(<Parks />);
    expect(screen.getByText("Aaron Kennedy")).toBeInTheDocument();
    expect(screen.getByText(/Aaron Kennedy © 2024/i)).toBeInTheDocument();
  });
});
