import { React } from "react";
import "./tile.css";

export const Tile = (props) => {
  const style = {
    width: "40px",
    height: "40px",
    borderWidth: "0.1px",
    color: "#000000",
    backgroundColor: "#FFFFFF"
  };

  return (
    <button
      style={style}
      value={props.number}
      onClick={(e) => {
        console.log("test");
        style["backgroundColor"] = "red";
        props.isValidAnswer(Number(e.target.value));
      }}
    >
      {props.number}
    </button>
  );
};
