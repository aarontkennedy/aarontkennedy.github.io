import { describe, it, expect, vi } from "vitest";

vi.mock("leaflet", () => {
  const MockClass = vi.fn().mockImplementation(() => ({}));
  return {
    default: {
      Icon: MockClass,
      DivIcon: MockClass,
      divIcon: vi.fn().mockReturnValue({}),
    },
    Icon: MockClass,
    DivIcon: MockClass,
    Marker: class {},
  };
});

vi.mock("../../../images/running/GrandMesa50.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/RockinK.jpg", () => ({ default: "img.jpg" }));
vi.mock("../../../images/running/aaronCrossCountry.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/mountainmist.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/paavonurmi.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/pikes50.jpg", () => ({ default: "img.jpg" }));
vi.mock("../../../images/running/twinCities1Mile2007.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/zumbro.jpg", () => ({ default: "img.jpg" }));
vi.mock("../../../images/running/zumbroDark.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/bearBrook.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/bemidji.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/blazePioneer.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/boston.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/dafunskie.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/ely.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/eugene.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/grandmas.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/leanhorse.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/moosalamoo.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/oldPueblo.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/philadelphia.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/psychoWyco.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/rocky.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/rehoboth.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/superior.jpg", () => ({
  default: "img.jpg",
}));
vi.mock("../../../images/running/medals/zumbro.jpg", () => ({
  default: "img.jpg",
}));

vi.mock("react-leaflet", () => ({
  TileLayer: () => null,
  ZoomControl: () => null,
  Marker: () => null,
  Popup: () => null,
  Tooltip: () => null,
}));
vi.mock("react-leaflet/MapContainer", () => ({
  MapContainer: ({ children }: any) => children,
}));
vi.mock("react-leaflet/hooks", () => ({ useMap: () => ({}) }));
vi.mock("react-leaflet-cluster", () => ({
  default: ({ children }: any) => children,
}));
vi.mock("../../../components/map/MinimapControl", () => ({
  default: () => null,
}));

import { formatIfTime, convertRunToColor } from "./Running";
import { Run } from "../data/run";

// ---------------------------------------------------------------------------
// formatIfTime
// ---------------------------------------------------------------------------

describe("formatIfTime", () => {
  it("formats a colon-separated time string by removing leading zero", () => {
    expect(formatIfTime("04:51:04")).toBe("4:51:04");
    expect(formatIfTime("03:15:48")).toBe("3:15:48");
  });

  it("preserves times with hours >= 10", () => {
    expect(formatIfTime("10:30:00")).toBe("10:30:00");
  });

  it("returns the original string when it contains no colon", () => {
    expect(formatIfTime("Ran Bandit")).toBe("Ran Bandit");
    expect(formatIfTime("DNF")).toBe("DNF");
    expect(formatIfTime("DNS")).toBe("DNS");
  });
});

// ---------------------------------------------------------------------------
// convertRunToColor
// ---------------------------------------------------------------------------

const run = (distanceMiles: number | number[]): Run => {
  const distances = Array.isArray(distanceMiles)
    ? distanceMiles
    : [distanceMiles];
  return {
    name: "Test Race",
    location: "Test City, MN",
    results: distances.map((d, i) => ({
      date: `2023-0${i + 1}-15`,
      distanceMiles: d,
      time: "1:00:00",
    })),
    url: "",
    latLng: [44.0, -93.0],
    tags: [],
    notes: "",
  };
};

describe("convertRunToColor", () => {
  it("returns #000000 for an empty results array (bug guard)", () => {
    expect(convertRunToColor({ ...run(0), results: [] })).toBe("#000000");
  });

  it("returns #FF0000 for a 5k (3.1 miles)", () => {
    expect(convertRunToColor(run(3.1))).toBe("#FF0000");
  });

  it("returns #FFA500 for a 10k (6.2 miles)", () => {
    expect(convertRunToColor(run(6.2))).toBe("#FFA500");
  });

  it("returns #8B4513 for a 10-miler (10.0 miles)", () => {
    expect(convertRunToColor(run(10.0))).toBe("#8B4513");
  });

  it("returns #FF1493 for a half marathon (13.1 miles)", () => {
    expect(convertRunToColor(run(13.1))).toBe("#FF1493");
  });

  it("returns #008000 for a 25k (15.5 miles)", () => {
    expect(convertRunToColor(run(15.5))).toBe("#008000");
  });

  it("returns #000080 for a marathon (26.2 miles)", () => {
    expect(convertRunToColor(run(26.2))).toBe("#000080");
  });

  it("returns #800080 for a 50k (31 miles)", () => {
    expect(convertRunToColor(run(31.0))).toBe("#800080");
  });

  it("returns #4B0082 for a 50-miler (50 miles)", () => {
    expect(convertRunToColor(run(50.0))).toBe("#4B0082");
  });

  it("returns #0000FF for a 100-miler (100 miles)", () => {
    expect(convertRunToColor(run(100.0))).toBe("#0000FF");
  });

  it("returns #000000 for an unrecognized distance", () => {
    expect(convertRunToColor(run(20.0))).toBe("#000000");
  });

  it("uses the longest result when a race has multiple results", () => {
    // 5k and marathon entries — should use marathon color
    expect(convertRunToColor(run([3.1, 26.2]))).toBe("#000080");
  });
});
