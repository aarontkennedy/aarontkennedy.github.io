import { describe, it, expect, vi } from "vitest";

vi.mock("leaflet", () => {
  const MockClass = vi.fn().mockImplementation(() => ({}));
  return {
    default: { Icon: MockClass, DivIcon: MockClass, divIcon: vi.fn().mockReturnValue({}) },
    Icon: MockClass,
    Marker: class {},
  };
});

vi.mock("react-leaflet", () => ({ TileLayer: () => null, ZoomControl: () => null, Marker: () => null, Popup: () => null, Tooltip: () => null, Polyline: () => null }));
vi.mock("react-leaflet/MapContainer", () => ({ MapContainer: ({ children }: any) => children }));
vi.mock("react-leaflet/hooks", () => ({ useMap: () => ({}) }));
vi.mock("react-leaflet-cluster", () => ({ default: ({ children }: any) => children }));
vi.mock("leaflet-geosearch", () => ({ GeoSearchControl: vi.fn().mockImplementation(() => ({})), OpenStreetMapProvider: vi.fn().mockImplementation(() => ({})) }));
vi.mock("../assets/icons8-canoe-48.png", () => ({ default: "canoe.png" }));
vi.mock("../../../components/map/MinimapControl", () => ({ default: () => null }));

import { convertYoutubeUrlToThumbnailUrl } from "./Paddling";

describe("convertYoutubeUrlToThumbnailUrl", () => {
  it("converts a standard watch?v= URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl(
        "https://www.youtube.com/watch?v=ABC123xyz"
      )
    ).toBe("https://img.youtube.com/vi/ABC123xyz/mqdefault.jpg");
  });

  it("strips extra query params from watch?v= URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl(
        "https://www.youtube.com/watch?v=ABC123xyz&t=30&list=PL123"
      )
    ).toBe("https://img.youtube.com/vi/ABC123xyz/mqdefault.jpg");
  });

  it("converts a youtu.be short URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl("https://youtu.be/TvRROpHPh3E")
    ).toBe("https://img.youtube.com/vi/TvRROpHPh3E/mqdefault.jpg");
  });

  it("strips query params from a youtu.be URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl("https://youtu.be/TvRROpHPh3E?t=45")
    ).toBe("https://img.youtube.com/vi/TvRROpHPh3E/mqdefault.jpg");
  });

  it("converts a /shorts/ URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl(
        "https://www.youtube.com/shorts/XYZ789abc"
      )
    ).toBe("https://img.youtube.com/vi/XYZ789abc/mqdefault.jpg");
  });

  it("strips query params from a /shorts/ URL", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl(
        "https://www.youtube.com/shorts/XYZ789abc?feature=share"
      )
    ).toBe("https://img.youtube.com/vi/XYZ789abc/mqdefault.jpg");
  });

  it("returns the original URL when it is not a recognized YouTube format", () => {
    expect(
      convertYoutubeUrlToThumbnailUrl("https://vimeo.com/123456")
    ).toBe("https://vimeo.com/123456");
  });
});
