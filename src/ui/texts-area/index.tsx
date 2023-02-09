import React from "react";
import Css from "./index.css";

type PropsTextArea = {
  idTextArea: string;
  nameTextArea: string;
};

type PropsTextAreaEditPet = {
  idTextArea: string;
  nameTextArea: string;
  descriptionValue?;
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

export function TextAreaEditPet(props: PropsTextAreaEditPet) {
  return props.descriptionValue ? (
    <textarea
      defaultValue={props.descriptionValue || ""}
      className={Css.mainTextarea}
      id={props.idTextArea}
      name={props.nameTextArea}
      cols={10}
      rows={30}
    />
  ) : (
    <textarea
      className={Css.mainTextarea}
      id={props.idTextArea}
      name={props.nameTextArea}
      cols={10}
      rows={30}
    />
  );
}
