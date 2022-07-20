import { FC, useEffect, useState } from "react";
import { convertMSFormate } from "../utils/utils";
import Heading from "./Heading";
import { GameState, HeadingVariant } from "./types";

type TimerProps = {
  isWrongKeyPress: boolean;
  gameState: GameState;
  setIsWrongKeyPress: (state: boolean) => void;
  handelEnd: (playerTime: number) => void;
};

const Timer: FC<TimerProps> = ({
  gameState,
  isWrongKeyPress,
  setIsWrongKeyPress,
  handelEnd,
}) => {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === GameState.start) {
      interval = setInterval(() => setTime((state) => state + 1), 10);
    }
    if (gameState === GameState.reset) {
      setTime(0);
    }
    if (gameState === GameState.end) {
      handelEnd(time);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  useEffect(() => {
    if (isWrongKeyPress) {
      setTime((state) => state + 50);
      setIsWrongKeyPress(false);
    }
  }, [isWrongKeyPress]);

  return (
    <Heading
      text={`Timer: ${convertMSFormate(time)}`}
      variant={HeadingVariant.subtitle}
    />
  );
};
export default Timer;
