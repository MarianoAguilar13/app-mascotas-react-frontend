import React from "react";
import Css from "./index.css";
import { MainInput } from "../inputs";
import { MainLabel } from "../labels";
import { MainTextArea } from "../texts-area";

type PropsFielSet = {
  idInput: string;
  nameInput: string;
  typeInput: string;
  labelName: string;
  nameValue?: boolean;
};

type PropsFieldSetTextArea = {
  idTextArea: string;
  nameTextArea: string;
  labelName: string;
};

export function MainFieldSet(props: PropsFielSet) {
  return (
    <div className={Css.contenedorFieldset}>
      <MainLabel id={props.idInput}>{props.labelName}</MainLabel>
      <MainInput
        nameValue={props.nameValue}
        idInput={props.idInput}
        nameInput={props.nameInput}
        typeInput={props.typeInput}
      ></MainInput>
    </div>
  );
}

export function FieldSetTextArea(props: PropsFieldSetTextArea) {
  return (
    <div className={Css.contenedorFieldset}>
      <MainLabel id={props.idTextArea}>{props.labelName}</MainLabel>
      <MainTextArea
        idTextArea={props.idTextArea}
        nameTextArea={props.nameTextArea}
      ></MainTextArea>
    </div>
  );
}
