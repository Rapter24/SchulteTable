import React from "react";

export const ResultModal = (props) => {
  return (
    <>
      <p>かかった時間: {props.count}</p>
      <button className="close-button" onClick={props.handleOpenResult}>
        閉じる
      </button>
    </>
  );
};
