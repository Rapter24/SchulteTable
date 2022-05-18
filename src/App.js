import "./styles.css";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Tiles } from "./tiles/tiles.js";
import { Answer } from "./answer/answer.js";
import { ANSWER } from "./type.js";
import { ResultModal } from "./result/resultModal";

export default function App() {
  const [tileCount, setTileCount] = useState(0);
  const [tilesArray, setTilesArray] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answerNumber, setAnswerNumber] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStart) {
        setCount((count) => count + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count, isStart]);

  const options = [
    { value: 3, label: "3 × 3" },
    { value: 5, label: "5 × 5" },
    { value: 7, label: "7 × 7" }
  ];

  const selectStyle = {
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto"
  };

  const tileCreatorStyle = {
    marginTop: "20px"
  };

  const startStyle = {
    marginTop: "20px"
  };

  const answerStyle = {
    marginTop: "20px"
  };

  const startButtonStyle = {
    marginRight: "5px"
  };

  const overlayStyle = {
    /*　画面全体を覆う設定　*/
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",

    /*　画面の中央に要素を表示させる設定　*/
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const modalContentStyle = {
    zIndex: "2",
    width: "50%",
    padding: "1em",
    background: "#fff"
  };

  const generateRandomValues = (maxValue) => {
    let ramdomArray = [];
    for (let i = 0; i < maxValue; i++) {
      ramdomArray.push(i + 1);
    }

    let length = ramdomArray.length;

    //シャッフルアルゴリズム
    while (length) {
      let random = Math.floor(Math.random() * length);
      let temp = ramdomArray[--length];
      ramdomArray[length] = ramdomArray[random];
      ramdomArray[random] = temp;
    }

    return ramdomArray;
  };

  const assingNumberToTile = (tileCount) => {
    let newTilesArray = [];
    const randomValues = generateRandomValues(tileCount * tileCount);
    for (let i = 0; i < tileCount; i++) {
      let tiles = [];
      for (let j = 0; j < tileCount; j++) {
        let value = randomValues[i * tileCount + j];
        const isMiddle = isMiddleTile(tileCount, i, j + 1);
        const tile = { value, isMiddle };
        tiles.push(tile);
      }
      newTilesArray.push(tiles);
    }

    setTilesArray(newTilesArray);
  };

  // 真ん中のタイルの場合trueを返す
  // ループの回数がゼロの場合、trueを返す
  const isMiddleTile = (tileCount, rowNum, columnNum) => {
    let isMiddle = false;
    const loopCount = rowNum * tileCount + columnNum;
    if (loopCount === Math.floor((tileCount * tileCount) / 2) + 1) {
      isMiddle = true;
    }
    return isMiddle;
  };

  const isValidAnswer = (selectedNumber) => {
    if (
      selectedNumber === answerNumber &&
      tileCount * tileCount === answerNumber
    ) {
      setAnswer(ANSWER.COMPLETE);
    } else if (selectedNumber === answerNumber) {
      setNextAnswer(answerNumber);
      setAnswer(ANSWER.VALID);
    } else {
      setAnswer(ANSWER.INVALID);
    }
  };

  const setNextAnswer = () => {
    if (answerNumber < tileCount * tileCount) {
      setAnswerNumber(answerNumber + 1);
    }
  };

  const handleSelectChange = (e) => {
    assingNumberToTile(e.value);
    setTileCount(e.value);
    setAnswerNumber(1);
    setAnswer();
    setIsStart(true);
  };

  const handleStartClick = (e) => {};

  const handleOpenResult = (e) => {
    setIsShowResult(!isShowResult);
  };

  return (
    <div className="App">
      <div className="tile-number-select" style={selectStyle}>
        <Select options={options} onChange={handleSelectChange} />
      </div>
      {isStart && (
        <div className="tile-start" style={startStyle}>
          <button
            className="start-button"
            onClick={handleStartClick}
            style={startButtonStyle}
          >
            スタート
          </button>
          <button className="reset-button">リセット</button>
        </div>
      )}
      <div className="tile-creator" style={tileCreatorStyle}>
        <Tiles
          tilesArray={tilesArray}
          tileCount={tileCount}
          isValidAnswer={isValidAnswer}
        />
      </div>
      <div className="answer" style={answerStyle}>
        <Answer
          answer={answer}
          answerNumber={answerNumber}
          handleOpenResult={handleOpenResult}
          isStart={isStart}
        />
      </div>
      {isShowResult && (
        <div className="modal" style={overlayStyle}>
          <div className="content" style={modalContentStyle}>
            <ResultModal handleOpenResult={handleOpenResult} count={count} />
          </div>
        </div>
      )}
    </div>
  );
}
