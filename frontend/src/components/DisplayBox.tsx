import type { JSX } from "react";

export type DisplayBoxProps = {
  display: boolean;
  children: JSX.Element;
};

export const DisplayBox = ({ display, children }: DisplayBoxProps) => {
  return <span className={display ? "" : "hidden"}>{children}</span>;
};
