import { FC, useEffect, useState } from "react";
import { getData, setData } from "../utils/localstorage";
import {
  convertMSFormate,
  getRandomAlphabets,
  lettersWithKeyCode,
} from "../utils/utils";
import Heading from "./Heading";
import Screen from "./Screen";
import Timer from "./Timer";
import { GameMessages, GameState, HeadingVariant } from "./types";

export type GameProps = {};

const Game: FC<GameProps> = () => {
  const [index, setIndex] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.notStart);
  const [isWrongKeyPress, setIsWrongKeyPress] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<string>(getData("bestScore"));
  const [letter, setLetter] = useState<{ letter: string }>(
    getRandomAlphabets()
  );
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState<GameMessages | undefined>(undefined);

  const handelEnd = (playerTime: number) => {
    if (bestScore !== "") {
      if (Number(bestScore) > playerTime) {
        setData("bestScore", playerTime.toString());
        setBestScore(playerTime.toString());
        setMsg(GameMessages.bestScore);
        setShowMsg(true);
        return;
      }
      setMsg(GameMessages.gameEnd);
      setShowMsg(true);
    } else {
      setData("bestScore", playerTime.toString());
      setBestScore(playerTime.toString());
      setMsg(GameMessages.bestScore);
      setShowMsg(true);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameState === GameState.notStart || gameState === GameState.reset) {
      setGameState(GameState.start);
    }
    const keyCode =
      e.keyCode >= 97 && e.keyCode <= 122 ? e.keyCode - 32 : e.keyCode;
    if (keyCode === lettersWithKeyCode[letter.letter]) {
      setInput((state) => state + String.fromCharCode(keyCode));
      if (index === 19) {
        setGameState(GameState.end);
        document.removeEventListener("keypress", handleKeyPress);
        return;
      }
      setLetter(getRandomAlphabets());
      setIndex(index + 1);
    } else {
      setIsWrongKeyPress(true);
      setMsg(GameMessages.wrongKey);
      setShowMsg(true);
    }
  };

  const handleReset = () => {
    setGameState(GameState.reset);
    setLetter(getRandomAlphabets());
    setInput("");
    setIndex(0);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [letter]);

  useEffect(() => {
    if (msg === undefined) {
      return;
    }
    const timeId = setTimeout(() => {
      setShowMsg(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showMsg]);

  return (
    <div>
      <Heading text="Type The Alphabet" variant={HeadingVariant.title} />
      <Heading
        text="Typing game to se how fast you type. Timer starts when you do :)"
        variant={HeadingVariant.subtitle}
      />
      <Screen text={letter.letter} />
      <Timer
        gameState={gameState}
        isWrongKeyPress={isWrongKeyPress}
        setIsWrongKeyPress={setIsWrongKeyPress}
        handelEnd={handelEnd}
      />
      <div className="user-input">
        You Typed: {input === "" ? "Nothing" : input}
      </div>
      <button className="button" onClick={handleReset}>
        Reset
      </button>
      {bestScore && (
        <div className="best-score">
          {"Best Score: " + convertMSFormate(+bestScore)}
        </div>
      )}
      {showMsg === true && msg !== undefined && (
        <Heading text={msg} variant={HeadingVariant.subtitle} />
      )}
    </div>
  );
};

export default Game;
