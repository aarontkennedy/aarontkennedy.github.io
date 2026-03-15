import React, { useState } from "react";
import "./ImageUrlViewer.scss";

const ImageUrlViewer = () => {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState("newline");
  const [urls, setUrls] = useState<string[]>([]);
  const [displayedCount, setDisplayedCount] = useState(0);

  const getDelimiter = (del: string) => {
    if (del === "comma") return ",";
    if (del === "semicolon") return ";";
    if (del === "space") return " ";
    return "\n";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const del = getDelimiter(delimiter);
      const newUrls = value
        .split(del)
        .map((u) => u.trim())
        .filter((u) => u);
      setUrls(newUrls);
      setDisplayedCount(Math.min(10, newUrls.length));
    } else {
      setUrls([]);
      setDisplayedCount(0);
    }
  };

  const handleDelimiterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDelimiter(e.target.value);
    // Re-parse with new delimiter
    if (input) {
      const del = getDelimiter(e.target.value);
      const newUrls = input
        .split(del)
        .map((u) => u.trim())
        .filter((u) => u);
      setUrls(newUrls);
      setDisplayedCount(Math.min(10, newUrls.length));
    }
  };

  const loadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 10, urls.length));
  };

  return (
    <div className="image-url-viewer">
      <header className="header">
        <h1>Image Url Viewer</h1>
        <div>
          <label htmlFor="delimiter">Delimiter</label>
          <select
            name="delimiter"
            value={delimiter}
            onChange={handleDelimiterChange}
          >
            <option value="newline">newline</option>
            <option value="comma">comma</option>
            <option value="semicolon">semicolon</option>
            <option value="space">space</option>
          </select>
        </div>
      </header>
      <div className="content">
        <textarea
          className="url-input"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter image URLs separated by the selected delimiter"
        />
        <ul className="url-display">
          {urls.slice(0, displayedCount).map((url, index) => (
            <li key={index}>
              <p>{url}</p>
              <img src={url} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
        {displayedCount < urls.length && (
          <div className="url-load-more__wrapper">
            <button className="url-load-more" onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
      <footer></footer>
    </div>
  );
};

export default ImageUrlViewer;
