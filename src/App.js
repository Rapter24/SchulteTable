import "./styles.css";
import React, { useState } from "react";
import Select from "react-select";
import { Tiles } from "./tiles/tiles.js";
import { Result } from "./result/result.js";

export default function App() {
  const [tileCount, setTileCount] = useState(0);
  const [tilesArray, setTilesArray] = useState([]);
  const [result, setResult] = useState();
  const [answerNumber, setAnswerNumber] = useState(1);

  const options = [
    { value: 3, label: "3 × 3" },
    { value: 5, label: "5 × 5" },
    { value: 7, label: "7 × 7" }
  ];

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
        tiles.push(value);
      }
      newTilesArray.push(tiles);
    }

    setTilesArray(newTilesArray);
  };

  const isValidAnswer = (selectedNumber) => {
    if (
      selectedNumber === answerNumber &&
      tileCount * tileCount === answerNumber
    ) {
      setResult("コンプリートです！");
    } else if (selectedNumber === answerNumber) {
      setNextAnswer(answerNumber);
      setResult("正解！！");
    } else {
      setResult("間違えています");
    }
  };

  const setNextAnswer = () => {
    if (answerNumber < tileCount * tileCount) {
      setAnswerNumber(answerNumber + 1);
    }
  };

  return (
    <div className="App">
      <div className="tile-number-select">
        <Select
          options={options}
          onChange={(e) => {
            assingNumberToTile(e.value);
            setTileCount(e.value);
          }}
        />
      </div>
      <div className="tile-creator">
        <Tiles
          tilesArray={tilesArray}
          number={tileCount}
          isValidAnswer={isValidAnswer}
        />
      </div>
      <div className="result">
        <Result result={result} />
      </div>
    </div>
  );
}
