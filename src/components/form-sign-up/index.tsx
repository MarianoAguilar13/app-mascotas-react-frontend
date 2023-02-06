import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { userCreate, misDatos } from "../../atoms/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

type PropsFormReportPet = {
  idInputUno: string;
  nameInputUno: string;
  typeInputUno: string;
  labelNameUno: string;
  idInputDos: string;
  nameInputDos: string;
  typeInputDos: string;
  labelNameDos: string;
  idInputTres: string;
  nameInputTres: string;
  typeInputTres: string;
  labelNameTres: string;
  idInputCuatro: string;
  nameInputCuatro: string;
  typeInputCuatro: string;
  labelNameCuatro: string;
  buttonChildren: string;
  onSubmit?: {};
  onSignUp?: any;
};

export function FormSignUp(props: PropsFormReportPet) {
  const setUserCreateData = props.onSignUp;

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      mail: e.target.mail.value,
      password: e.target.password.value,
      name: e.target.name.value,
      passwordRepetida: e.target.passwordRepetida.value,
    };

    setUserCreateData(data);
  };
  /*
  const [hiddenButton, setHiddenButton] = useState(false);

  const mostrarBoton = () => {
    setHiddenButton(false);
  };

  const ocultarBoton = () => {
    setHiddenButton(true);
  };*/

  return (
    <form onSubmit={submitHandler} className={Css.form}>
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
      <MainFieldSet
        idInput={props.idInputTres}
        nameInput={props.nameInputTres}
        typeInput={props.typeInputTres}
        labelName={props.labelNameTres}
      ></MainFieldSet>
      <MainFieldSet
        idInput={props.idInputCuatro}
        nameInput={props.nameInputCuatro}
        typeInput={props.typeInputCuatro}
        labelName={props.labelNameCuatro}
      ></MainFieldSet>
      <MainButton
      /*
        onClick={setHiddenButton}
        style={{ display: hiddenButton ? "flex" : "none" }}*/
      >
        {props.buttonChildren}
      </MainButton>
    </form>
  );
}
