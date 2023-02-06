import React from "react";
import Css from "./index.css";

type PropsTextArea = {
  idTextArea: string;
  nameTextArea: string;
};

export function MainTextArea(props: PropsTextArea) {
  return (
    <textarea
      className={Css.mainTextarea}
      id={props.idTextArea}
      name={props.nameTextArea}
      cols={10}
      rows={30}
    />
  );
}
