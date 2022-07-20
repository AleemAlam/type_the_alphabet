import { FC } from "react";

type ScreenProps = {
  text: string;
};

const Screen: FC<ScreenProps> = ({ text }) => {
  return <div className={"screen"}>{text}</div>;
};
export default Screen;
