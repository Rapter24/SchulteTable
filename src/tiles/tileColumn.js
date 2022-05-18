import React from "react";
import { Tile } from "./tile";

export const TileColumn = (props) => {
  const tiles = props.tiles;
  return tiles.map((tile) => {
    return <Tile tile={tile} isValidAnswer={props.isValidAnswer} />;
  });
};
