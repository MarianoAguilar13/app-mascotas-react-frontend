import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { FieldSetTextArea } from "../../ui/fields-sets";

type PropsFormReportPet = {
  idInputUno: string;
  nameInputUno: string;
  typeInputUno: string;
  labelNameUno: string;
  idInputDos: string;
  nameInputDos: string;
  typeInputDos: string;
  labelNameDos: string;
  idTextArea: string;
  nameTextArea: string;
  labelNameTres: string;
  buttonChildren: string;
  onSubmit: {};
};

export function FormReportPet(props: PropsFormReportPet) {
  return (
    <form className={Css.form}>
      <MainFieldSet
        idInput={props.idInputUno}
        nameInput={props.nameInputUno}
        typeInput={props.typeInputUno}
        labelName={props.labelNameUno}
      ></MainFieldSet>
      <MainFieldSet
        idInput={props.idInputDos}
        nameInput={props.nameInputDos}
        typeInput={props.typeInputDos}
        labelName={props.labelNameDos}
      ></MainFieldSet>
      <FieldSetTextArea
        idTextArea={props.idTextArea}
        nameTextArea={props.nameTextArea}
        labelName={props.labelNameTres}
      ></FieldSetTextArea>
      <MainButton>{props.buttonChildren}</MainButton>
    </form>
  );
}
