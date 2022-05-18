import React from "react";
import { ANSWER } from "../type";

export const Answer = (props) => {
  let answer = "";
  const style = {
    width: "400px",
    height: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: "20px"
  };
  if (props.answer === ANSWER.COMPLETE) {
    answer = "コンプリートです！";
    props.isStart = false;
  } else if (props.answer === ANSWER.VALID) {
    style["backgroundColor"] = "#99FF99";
    answer = `正解！！ 次の値は${props.answerNumber}です`;
  } else if (props.answer === ANSWER.INVALID) {
    style["backgroundColor"] = "#FF3366";
    answer = `間違えています！ ${props.answerNumber}を選択してください`;
  }
  return (
    <>
      <label style={style}>{answer}</label>
      <div>
        {props.answer === ANSWER.COMPLETE && (
          <button
            onClick={(e) => {
              props.handleOpenResult();
            }}
          >
            結果を見る
          </button>
        )}
      </div>
    </>
  );
};
