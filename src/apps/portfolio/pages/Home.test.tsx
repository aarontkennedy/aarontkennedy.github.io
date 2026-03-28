import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

vi.mock("../../../images/soraMeCanoeingAndProgramming.mp4", () => ({
  default: "mock-video.mp4",
}));

describe("Home", () => {
  it("displays name and title", () => {
    render(<Home />);
    expect(screen.getByText("Aaron Kennedy")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("has a working email link", () => {
    render(<Home />);
    const emailLink = screen.getByRole("link", {
      name: "aarontkennedy@gmail.com",
    });
    expect(emailLink).toHaveAttribute("href", "mailto:aarontkennedy@gmail.com");
  });

  it("has a resume link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /resumé/i })).toBeInTheDocument();
  });

  it("has LinkedIn, YouTube, and GitHub links", () => {
    render(<Home />);
    const hrefs = screen
      .getAllByRole("link")
      .map((l) => l.getAttribute("href"));
    expect(hrefs).toContain(
      "http://www.linkedin.com/in/aaron-kennedy-6a221a156"
    );
    expect(hrefs).toContain(
      "https://www.youtube.com/channel/UC3NtgCyX7qGbdKblxWGRwSw"
    );
    expect(hrefs).toContain("https://github.com/aarontkennedy");
  });

  it("renders the background video with autoplay and loop", () => {
    render(<Home />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video.muted).toBe(true); // muted is a DOM property, not an HTML attribute
  });

  it("renders the summary paragraphs", () => {
    render(<Home />);
    expect(screen.getByText(/Lone Wolf/)).toBeInTheDocument();
    expect(screen.getByText(/canoeing or trail running/)).toBeInTheDocument();
  });
});
