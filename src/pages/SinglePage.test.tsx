import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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

vi.mock("../images/soraMeCanoeingAndProgramming.mp4", () => ({
  default: "mock-video.mp4",
}));
vi.mock("../apps/canoe/assets/icons8-canoe-48.png", () => ({
  default: "canoe.png",
}));

vi.mock("../components/map/MinimapControl", () => ({
  default: () => null,
}));

// Mock all running images
vi.mock("../images/running/GrandMesa50.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/RockinK.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/aaronCrossCountry.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/mountainmist.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/paavonurmi.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/pikes50.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/twinCities1Mile2007.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/zumbro.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/zumbroDark.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/bearBrook.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/bemidji.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/blazePioneer.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/boston.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/dafunskie.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/ely.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/eugene.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/grandmas.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/leanhorse.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/moosalamoo.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/oldPueblo.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/philadelphia.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/psychoWyco.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/rocky.jpg", () => ({ default: "img.jpg" }));
vi.mock("../images/running/medals/rehoboth.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/superior.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../images/running/medals/zumbro.jpg", () => ({ default: "img.jpg" }));

import SinglePage from "./SinglePage";

describe("SinglePage", () => {
  it("renders without crashing", () => {
    render(<SinglePage />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders the Home section with name and title", () => {
    render(<SinglePage />);
    // "Aaron Kennedy" appears in h1, header nav, and footer — target the heading
    expect(
      screen.getByRole("heading", { name: "Aaron Kennedy", level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders all three page sections", () => {
    render(<SinglePage />);
    expect(document.getElementById("software")).toBeInTheDocument();
    expect(document.getElementById("paddling")).toBeInTheDocument();
    expect(document.getElementById("running")).toBeInTheDocument();
  });

  it("renders the paddling hero text", () => {
    render(<SinglePage />);
    expect(screen.getAllByText(/10,000 lakes/i).length).toBeGreaterThan(0);
  });

  it("renders the running favorite races", () => {
    render(<SinglePage />);
    expect(screen.getByText("Favorite Road Marathons")).toBeInTheDocument();
  });

  it("renders the header navigation", () => {
    render(<SinglePage />);
    expect(screen.getByRole("link", { name: "Aaron Kennedy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Paddling" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Running" })).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<SinglePage />);
    expect(screen.getByText(/Aaron Kennedy © 2024/i)).toBeInTheDocument();
  });
});
