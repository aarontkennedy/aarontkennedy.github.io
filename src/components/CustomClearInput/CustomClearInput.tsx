import React, { useState } from "react";

const CustomClearInput = ({ inputValue, setInputValue, name }) => {
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div
      className={name}
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        name={name}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
        style={{ paddingRight: "30px" }} // Make space for the button
      />
      {inputValue && ( // Only show the button if there's text
        <button
          onClick={handleClear}
          style={{
            height: "1em",
            width: "1em",
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "gray",
            borderRadius: "50%", // or '100%' as you had
            border: "none",
            cursor: "pointer",
            fontSize: "1em",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          x
        </button>
      )}
    </div>
  );
};

export default CustomClearInput;
