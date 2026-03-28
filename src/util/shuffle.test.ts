import { describe, it, expect } from "vitest";
import { shuffleArray } from "./shuffle";

describe("shuffleArray", () => {
  it("returns an array of the same length", () => {
    expect(shuffleArray([1, 2, 3, 4, 5])).toHaveLength(5);
    expect(shuffleArray([])).toHaveLength(0);
    expect(shuffleArray(["a"])).toHaveLength(1);
  });

  it("contains the same elements after shuffling", () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffleArray([...original]);
    expect(result.sort()).toEqual([...original].sort());
  });

  it("mutates and returns the original array reference", () => {
    const arr = [1, 2, 3];
    const result = shuffleArray(arr);
    expect(result).toBe(arr);
  });

  it("handles a single element array without error", () => {
    expect(shuffleArray(["only"])).toEqual(["only"]);
  });

  it("handles an empty array without error", () => {
    expect(shuffleArray([])).toEqual([]);
  });
});
