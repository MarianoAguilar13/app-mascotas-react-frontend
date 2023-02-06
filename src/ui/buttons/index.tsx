import React from "react";
import Css from "./index.css";

export function MainButton(props) {
  return (
    <button onClick={props.onClick} className={Css.mainButton}>
      {props.children}{" "}
    </button>
  );
}

export function ButtonMapBox(props) {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      className={Css.mainButton}
    >
      {props.children}{" "}
    </button>
  );
}

export function ButtonCard(props) {
  return (
    <button onClick={props.onClick} className={Css.buttonCard}>
      {props.children}{" "}
    </button>
  );
}
