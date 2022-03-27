import React from "react";
import { TileColumn } from "./tileColumn.js";

export const Tiles = (props) => {
  let number = props.number;
  const tilesArray = props.tilesArray;
  if (number) {
    return tilesArray.map((tiles) => {
      return (
        <div className="tile-column">
          <TileColumn tiles={tiles} isValidAnswer={props.isValidAnswer} />
        </div>
      );
    });
  } else {
    return <div>コマ数を選んでね！</div>;
  }
};
