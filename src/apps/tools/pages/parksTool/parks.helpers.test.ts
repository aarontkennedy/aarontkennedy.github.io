import { describe, it, expect, vi } from "vitest";

vi.mock("leaflet", () => {
  const MockClass = vi.fn().mockImplementation(() => ({}));
  return {
    default: { Icon: MockClass, DivIcon: MockClass, divIcon: vi.fn().mockReturnValue({}) },
    Icon: MockClass,
    Marker: class {},
  };
});

vi.mock("react-leaflet", () => ({ TileLayer: () => null, ZoomControl: () => null, Marker: () => null, Popup: () => null, Tooltip: () => null }));
vi.mock("react-leaflet/MapContainer", () => ({ MapContainer: ({ children }: any) => children }));
vi.mock("react-leaflet/hooks", () => ({ useMap: () => ({}) }));
vi.mock("react-leaflet-cluster", () => ({ default: ({ children }: any) => children }));
vi.mock("leaflet-geosearch", () => ({ GeoSearchControl: vi.fn().mockImplementation(() => ({})), OpenStreetMapProvider: vi.fn().mockImplementation(() => ({})) }));
vi.mock("../../../../components/map/MinimapControl", () => ({ default: () => null }));

import { convertToColor, validateParkData, Park } from "./Parks";

// ---------------------------------------------------------------------------
// convertToColor
// ---------------------------------------------------------------------------

const park = (name: string): Park => ({
  name,
  location: "Test",
  state: "MN",
  country: "USA",
  address: "123 Test St",
  longitudeLatitude: [-93.0, 44.0],
  imageURL: null,
  remarks: null,
});

describe("convertToColor", () => {
  it('returns #005000 for "National Park"', () => {
    expect(convertToColor(park("Yellowstone National Park"))).toBe("#005000");
  });

  it('returns #007000 for "National Monument"', () => {
    expect(convertToColor(park("Devils Tower National Monument"))).toBe(
      "#007000"
    );
  });

  it('returns #009000 for "National Historic Site"', () => {
    expect(
      convertToColor(park("Ford's Theatre National Historic Site"))
    ).toBe("#009000");
  });

  it('returns #00A000 for "National Seashore"', () => {
    expect(convertToColor(park("Cape Cod National Seashore"))).toBe("#00A000");
  });

  it('returns #00c000 for "National Battlefield"', () => {
    expect(convertToColor(park("Gettysburg National Battlefield"))).toBe(
      "#00c000"
    );
  });

  it('returns #00e000 for any other "National" unit', () => {
    expect(convertToColor(park("Blue Ridge Parkway National"))).toBe("#00e000");
  });

  it('returns #000050 for "State Park"', () => {
    expect(convertToColor(park("Itasca State Park"))).toBe("#000050");
  });

  it('returns #000070 for "State Natural", "Wildlife Area", or "State Forest"', () => {
    expect(convertToColor(park("Boundary Waters State Natural Area"))).toBe(
      "#000070"
    );
    expect(convertToColor(park("Carlos Avery Wildlife Area"))).toBe("#000070");
    expect(convertToColor(park("Superior State Forest"))).toBe("#000070");
  });

  it('returns #000090 for "State Historic"', () => {
    expect(convertToColor(park("Fort Snelling State Historic Site"))).toBe(
      "#000090"
    );
  });

  it('returns #0000A0 for "Recreation Area"', () => {
    expect(convertToColor(park("Minnesota Valley Recreation Area"))).toBe(
      "#0000A0"
    );
  });

  it('returns #0000D0 for any other "State" unit', () => {
    expect(convertToColor(park("Lake Elmo State"))).toBe("#0000D0");
  });

  it("returns red for an unrecognized park name", () => {
    expect(convertToColor(park("Wall Drug"))).toBe("red");
  });

  it("returns red for a park with no name", () => {
    expect(convertToColor({ ...park(""), name: "" })).toBe("red");
  });

  it("prioritizes more specific national categories over the generic national catch-all", () => {
    // "National Historic Site" should match before "national"
    expect(
      convertToColor(park("Lincoln Home National Historic Site"))
    ).toBe("#009000");
    // "National Park" should match before "national"
    expect(convertToColor(park("Grand Canyon National Park"))).toBe("#005000");
  });
});

// ---------------------------------------------------------------------------
// validateParkData
// ---------------------------------------------------------------------------

const validPark = {
  name: "Itasca State Park",
  location: "Clearwater",
  state: "Minnesota",
  country: "USA",
  address: "36750 Main Park Dr, Park Rapids, MN 56470",
  longitudeLatitude: [-95.19, 47.23],
  imageURL: null,
  remarks: null,
};

describe("validateParkData", () => {
  it("returns true for a fully valid park", () => {
    expect(validateParkData(validPark)).toBe(true);
  });

  it("returns true when longitudeLatitude is null", () => {
    expect(validateParkData({ ...validPark, longitudeLatitude: null })).toBe(
      true
    );
  });

  it("returns true with optional string fields as null", () => {
    expect(
      validateParkData({ ...validPark, imageURL: null, remarks: null })
    ).toBe(true);
  });

  it("returns false for null input", () => {
    expect(validateParkData(null)).toBe(false);
  });

  it("returns false for non-object input", () => {
    expect(validateParkData("a string")).toBe(false);
    expect(validateParkData(42)).toBe(false);
  });

  it("returns false when name is missing", () => {
    expect(validateParkData({ ...validPark, name: "" })).toBe(false);
    expect(validateParkData({ ...validPark, name: 123 })).toBe(false);
  });

  it("returns false when location is missing", () => {
    expect(validateParkData({ ...validPark, location: "" })).toBe(false);
  });

  it("returns false when state is missing", () => {
    expect(validateParkData({ ...validPark, state: "" })).toBe(false);
  });

  it("returns false when country is missing", () => {
    expect(validateParkData({ ...validPark, country: "" })).toBe(false);
  });

  it("returns false when longitudeLatitude has wrong length", () => {
    expect(
      validateParkData({ ...validPark, longitudeLatitude: [-95.19] })
    ).toBe(false);
    expect(
      validateParkData({ ...validPark, longitudeLatitude: [-95.19, 47.23, 0] })
    ).toBe(false);
  });

  it("returns false when longitudeLatitude contains non-numbers", () => {
    expect(
      validateParkData({ ...validPark, longitudeLatitude: ["a", "b"] })
    ).toBe(false);
  });

  it("returns false when imageURL is a non-string truthy value", () => {
    expect(validateParkData({ ...validPark, imageURL: 123 })).toBe(false);
  });

  it("returns false when remarks is a non-string truthy value", () => {
    expect(validateParkData({ ...validPark, remarks: true })).toBe(false);
  });
});
