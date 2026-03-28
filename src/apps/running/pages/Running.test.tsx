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

// Mock all image imports
vi.mock("../../../images/running/GrandMesa50.jpg", () => ({
  default: "GrandMesa50.jpg",
}));
vi.mock("../../../images/running/RockinK.jpg", () => ({
  default: "RockinK.jpg",
}));
vi.mock("../../../images/running/aaronCrossCountry.jpg", () => ({
  default: "aaronCrossCountry.jpg",
}));
vi.mock("../../../images/running/mountainmist.jpg", () => ({
  default: "mountainmist.jpg",
}));
vi.mock("../../../images/running/paavonurmi.jpg", () => ({
  default: "paavonurmi.jpg",
}));
vi.mock("../../../images/running/pikes50.jpg", () => ({
  default: "pikes50.jpg",
}));
vi.mock("../../../images/running/twinCities1Mile2007.jpg", () => ({
  default: "twinCities1Mile2007.jpg",
}));
vi.mock("../../../images/running/zumbro.jpg", () => ({
  default: "zumbro.jpg",
}));
vi.mock("../../../images/running/zumbroDark.jpg", () => ({
  default: "zumbroDark.jpg",
}));
vi.mock("../../../images/running/medals/bearBrook.jpg", () => ({
  default: "bearBrook.jpg",
}));
vi.mock("../../../images/running/medals/bemidji.jpg", () => ({
  default: "bemidji.jpg",
}));
vi.mock("../../../images/running/medals/blazePioneer.jpg", () => ({
  default: "blazePioneer.jpg",
}));
vi.mock("../../../images/running/medals/boston.jpg", () => ({
  default: "boston.jpg",
}));
vi.mock("../../../images/running/medals/dafunskie.jpg", () => ({
  default: "dafunskie.jpg",
}));
vi.mock("../../../images/running/medals/ely.jpg", () => ({
  default: "ely.jpg",
}));
vi.mock("../../../images/running/medals/eugene.jpg", () => ({
  default: "eugene.jpg",
}));
vi.mock("../../../images/running/medals/grandmas.jpg", () => ({
  default: "grandmas.jpg",
}));
vi.mock("../../../images/running/medals/leanhorse.jpg", () => ({
  default: "leanhorse.jpg",
}));
vi.mock("../../../images/running/medals/moosalamoo.jpg", () => ({
  default: "moosalamoo.jpg",
}));
vi.mock("../../../images/running/medals/oldPueblo.jpg", () => ({
  default: "oldPueblo.jpg",
}));
vi.mock("../../../images/running/medals/philadelphia.jpg", () => ({
  default: "philadelphia.jpg",
}));
vi.mock("../../../images/running/medals/psychoWyco.jpg", () => ({
  default: "psychoWyco.jpg",
}));
vi.mock("../../../images/running/medals/rocky.jpg", () => ({
  default: "rocky.jpg",
}));
vi.mock("../../../images/running/medals/rehoboth.jpg", () => ({
  default: "rehoboth.jpg",
}));
vi.mock("../../../images/running/medals/superior.jpg", () => ({
  default: "superior.jpg",
}));
vi.mock("../../../images/running/medals/zumbro.jpg", () => ({
  default: "zumbroBuckle.jpg",
}));

vi.mock("../../../components/map/MinimapControl", () => ({
  default: () => null,
}));

import Running from "./Running";

describe("Running", () => {
  it("renders without crashing", () => {
    render(<Running />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders the map", () => {
    render(<Running />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("renders favorite race sections", () => {
    render(<Running />);
    expect(screen.getByText("Favorite Road Marathons")).toBeInTheDocument();
    expect(screen.getByText("Favorite Trail Races")).toBeInTheDocument();
    expect(screen.getByText("Favorite Trail Ultras")).toBeInTheDocument();
  });

  it("renders the Philadelphia Marathon in favorite road marathons", () => {
    render(<Running />);
    // Title appears as "Philadelphia Marathon, PA" in FavoriteRaces
    expect(screen.getByText("Philadelphia Marathon, PA")).toBeInTheDocument();
  });

  it("renders the Zumbro Endurance Run in favorite trail races", () => {
    render(<Running />);
    expect(screen.getByText(/Zumbro Endurance Run/i)).toBeInTheDocument();
  });

  it("renders carousel navigation buttons", () => {
    render(<Running />);
    const prevButtons = screen.getAllByRole("button", { name: "Previous" });
    const nextButtons = screen.getAllByRole("button", { name: "Next" });
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });
});
