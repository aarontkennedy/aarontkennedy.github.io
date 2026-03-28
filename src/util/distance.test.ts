import { describe, it, expect } from "vitest";
import {
  is5k,
  is10k,
  is10miler,
  isHalfMarathon,
  is25k,
  isMarathon,
  is50k,
  is50miler,
  is100miler,
} from "./distance";

describe("is5k", () => {
  it("returns true for 5k distance (3.1 miles)", () => {
    expect(is5k(3.1)).toBe(true);
    expect(is5k(3.0)).toBe(true);
  });
  it("returns false for shorter or longer distances", () => {
    expect(is5k(2.9)).toBe(false);
    expect(is5k(3.2)).toBe(false);
    expect(is5k(6.2)).toBe(false);
  });
});

describe("is10k", () => {
  it("returns true for 10k distance (6.2 miles)", () => {
    expect(is10k(6.2)).toBe(true);
    expect(is10k(6.0)).toBe(true);
  });
  it("returns false outside the 10k range", () => {
    expect(is10k(5.9)).toBe(false);
    expect(is10k(6.4)).toBe(false);
  });
});

describe("is10miler", () => {
  it("returns true for 10-mile distance", () => {
    expect(is10miler(10.0)).toBe(true);
    expect(is10miler(9.8)).toBe(true);
  });
  it("returns false outside the 10-mile range", () => {
    expect(is10miler(9.7)).toBe(false);
    expect(is10miler(10.2)).toBe(false);
  });
});

describe("isHalfMarathon", () => {
  it("returns true for half marathon distance (13.1 miles)", () => {
    expect(isHalfMarathon(13.1)).toBe(true);
    expect(isHalfMarathon(12.9)).toBe(true);
  });
  it("returns false outside the half marathon range", () => {
    expect(isHalfMarathon(12.8)).toBe(false);
    expect(isHalfMarathon(13.5)).toBe(false);
  });
});

describe("is25k", () => {
  it("returns true for 25k distance (15.5 miles)", () => {
    expect(is25k(15.5)).toBe(true);
    expect(is25k(15.0)).toBe(true);
  });
  it("returns false outside the 25k range", () => {
    expect(is25k(14.9)).toBe(false);
    expect(is25k(16.1)).toBe(false);
  });
});

describe("isMarathon", () => {
  it("returns true for marathon distance (26.2 miles)", () => {
    expect(isMarathon(26.2)).toBe(true);
    expect(isMarathon(25.9)).toBe(true);
  });
  it("returns false outside the marathon range", () => {
    expect(isMarathon(25.8)).toBe(false);
    expect(isMarathon(27.0)).toBe(false);
    expect(isMarathon(27.1)).toBe(false);
  });
});

describe("is50k", () => {
  it("returns true for 50k distance (31 miles)", () => {
    expect(is50k(31.0)).toBe(true);
    expect(is50k(30.0)).toBe(true);
  });
  it("returns false outside the 50k range", () => {
    expect(is50k(29.9)).toBe(false);
    expect(is50k(35.0)).toBe(false);
  });
});

describe("is50miler", () => {
  it("returns true for 50-mile distance", () => {
    expect(is50miler(50.0)).toBe(true);
    expect(is50miler(49.0)).toBe(true);
  });
  it("returns false outside the 50-mile range", () => {
    expect(is50miler(48.9)).toBe(false);
    expect(is50miler(55.0)).toBe(false);
  });
});

describe("is100miler", () => {
  it("returns true for 100-mile distance", () => {
    expect(is100miler(100.0)).toBe(true);
    expect(is100miler(99.0)).toBe(true);
  });
  it("returns false outside the 100-mile range", () => {
    expect(is100miler(98.9)).toBe(false);
    expect(is100miler(110.0)).toBe(false);
    expect(is100miler(111.0)).toBe(false);
  });
});
