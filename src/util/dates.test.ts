import { describe, it, expect } from "vitest";
import { getYear, formatDate, formatTime } from "./dates";

describe("getYear", () => {
  it("extracts the year from an ISO date string", () => {
    expect(getYear("2022-10-29")).toBe(2022);
    expect(getYear("2000-04-01")).toBe(2000);
    expect(getYear("2024-06-15")).toBe(2024);
  });

  it("handles year boundaries correctly regardless of local timezone", () => {
    expect(getYear("2023-01-01")).toBe(2023);
    expect(getYear("2023-12-31")).toBe(2023);
  });
});

describe("formatDate", () => {
  it("formats a date as Month Year in en-US locale", () => {
    expect(formatDate("2022-10-15")).toBe("October 2022");
    expect(formatDate("2024-06-15")).toBe("June 2024");
    expect(formatDate("2000-04-15")).toBe("April 2000");
  });

  it("returns the original string when given an invalid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("formatTime", () => {
  it("removes leading zero from hours under 10", () => {
    expect(formatTime("04:51:04")).toBe("4:51:04");
    expect(formatTime("03:15:48")).toBe("3:15:48");
    expect(formatTime("09:00:00")).toBe("9:00:00");
  });

  it("preserves hours of 10 or greater", () => {
    expect(formatTime("10:30:00")).toBe("10:30:00");
    expect(formatTime("13:05:22")).toBe("13:05:22");
  });

  it("preserves minutes and seconds exactly", () => {
    expect(formatTime("02:08:05")).toBe("2:08:05");
  });
});
