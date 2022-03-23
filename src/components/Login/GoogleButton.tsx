import type { HTMLAttributes } from "react";
import { ReactComponent as Icon } from "./GoogleButtonIcon.svg";

type Props = {
  disabled?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  type?: "light" | "dark";
};

type Style<T> = HTMLAttributes<T>["style"];

const baseStyle: Style<HTMLButtonElement> = {
  height: "50px",
  width: "240px",
  border: "none",
  textAlign: "center",
  verticalAlign: "center",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,.25)",
  fontSize: "16px",
  lineHeight: "48px",
  display: "block",
  borderRadius: "1px",
  transition: "background-color .218s, border-color .218s, box-shadow .218s",
  fontFamily: "Roboto,arial,sans-serif",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "#4285f4",
  color: "#fff",
};
const iconStyle: Style<HTMLDivElement> = {
  width: "48px",
  height: "48px",
  textAlign: "center",
  verticalAlign: "center",
  display: "block",
  marginTop: "1px",
  marginLeft: "1px",
  float: "left",
  backgroundColor: "#fff",
  borderRadius: "1px",
  whiteSpace: "nowrap",
};
const svgStyle: Style<HTMLDivElement> = {
  width: "48px",
  height: "48px",
  display: "block",
};

const emptyFunction = () => {};

export default function GoogleButton({
  disabled = false,
  onClick = emptyFunction,
}: Props) {
  return (
    <button
      disabled={disabled}
      style={baseStyle}
      type="button"
      onClick={onClick}
    >
      <div style={iconStyle}>
        <Icon style={svgStyle} />
      </div>
      <span>Sign in with Google</span>
    </button>
  );
}
