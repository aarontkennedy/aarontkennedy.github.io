import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUrlViewer from "./ImageUrlViewer";

describe("ImageUrlViewer", () => {
  it("renders the header", () => {
    render(<ImageUrlViewer />);
    expect(screen.getByText("Image Url Viewer")).toBeInTheDocument();
  });

  it("shows no images initially", () => {
    render(<ImageUrlViewer />);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("shows no Load more button initially", () => {
    render(<ImageUrlViewer />);
    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  it("parses newline-delimited URLs and renders images", () => {
    render(<ImageUrlViewer />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: {
        value: "http://example.com/a.jpg\nhttp://example.com/b.jpg",
      },
    });
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("shows the URL as the image src", () => {
    render(<ImageUrlViewer />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "http://example.com/test.jpg" },
    });
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://example.com/test.jpg");
  });

  it("parses comma-delimited URLs when delimiter is set to comma", () => {
    render(<ImageUrlViewer />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "comma" } });
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: {
        value: "http://a.com/1.jpg,http://b.com/2.jpg,http://c.com/3.jpg",
      },
    });
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("parses semicolon-delimited URLs when delimiter is set to semicolon", () => {
    render(<ImageUrlViewer />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "semicolon" },
    });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "http://a.com/1.jpg;http://b.com/2.jpg" },
    });
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("shows only 10 images and a Load more button when more than 10 URLs are entered", () => {
    render(<ImageUrlViewer />);
    const urls = Array.from(
      { length: 15 },
      (_, i) => `http://example.com/${i}.jpg`
    ).join("\n");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: urls } });
    expect(screen.getAllByRole("img")).toHaveLength(10);
    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("loads the next batch when Load more is clicked", () => {
    render(<ImageUrlViewer />);
    const urls = Array.from(
      { length: 15 },
      (_, i) => `http://example.com/${i}.jpg`
    ).join("\n");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: urls } });
    fireEvent.click(screen.getByText("Load more"));
    expect(screen.getAllByRole("img")).toHaveLength(15);
    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  it("clears images when the textarea is emptied", () => {
    render(<ImageUrlViewer />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "http://example.com/a.jpg" },
    });
    expect(screen.getAllByRole("img")).toHaveLength(1);
    fireEvent.change(textarea, { target: { value: "" } });
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("re-parses with new delimiter when delimiter is changed after input", () => {
    render(<ImageUrlViewer />);
    const textarea = screen.getByRole("textbox");
    // Enter comma-separated URLs with newline delimiter active (won't parse as 3)
    fireEvent.change(textarea, {
      target: { value: "http://a.com/1.jpg,http://b.com/2.jpg" },
    });
    expect(screen.getAllByRole("img")).toHaveLength(1); // treated as one URL
    // Switch to comma delimiter — should re-parse as 2
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "comma" },
    });
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
