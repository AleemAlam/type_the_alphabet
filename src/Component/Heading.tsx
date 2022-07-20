import { FC } from "react";
import { HeadingVariant } from "./types";

type HeadingProps = {
  text: string;
  variant: HeadingVariant;
};

const Heading: FC<HeadingProps> = ({ text, variant }) => {
  return <div className={variant}>{text}</div>;
};
export default Heading;
