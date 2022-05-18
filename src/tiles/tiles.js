import React from "react";
import { TileColumn } from "./tileColumn.js";

export const Tiles = (props) => {
  let tileCount = props.tileCount;
  const tilesArray = props.tilesArray;
  if (tileCount) {
    return tilesArray.map((tiles) => {
      return (
        <div className="tile-column">
          <TileColumn
            tiles={tiles}
            isValidAnswer={props.isValidAnswer}
            tileCount={tileCount}
          />
        </div>
      );
    });
  } else {
    return <div>コマ数を選んでね！</div>;
  }
};
