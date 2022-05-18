import React from "react";
import "./tile.css";

export const Tile = (props) => {
  const style = {
    width: "80px",
    height: "80px",
    borderWidth: "0.1px",
    color: "#000000",
    fontSize: "30px",
    backgroundColor: "#FFFFFF"
  };

  if (props.tile.isMiddle) {
    style["backgroundColor"] = "#FFFF77";
  }

  return (
    <button
      style={style}
      value={props.tile.value}
      onClick={(e) => {
        props.isValidAnswer(Number(e.target.value));
      }}
    >
      {props.tile.value}
    </button>
  );
};
