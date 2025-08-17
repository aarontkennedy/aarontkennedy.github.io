import React, { useRef, useState, useEffect } from "react";
import "./EllipsisText.scss";

const EllipsisText = ({ text }: { text: string }) => {
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check for overflow when the component mounts and on text changes
  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (isOverflowing) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="ellipsis-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={textRef} className="ellipsis-text">
        {text}
      </span>
      {showTooltip && isOverflowing && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default EllipsisText;
