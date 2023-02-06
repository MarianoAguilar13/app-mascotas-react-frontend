import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { userCreate, misDatos } from "../../atoms/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { valueName } from "../../atoms/atoms";

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
  onEdit?: any;
  nameValue?: boolean;
};

export function FormEditMisDatos(props: PropsFormReportPet) {
  const setMisDatos = props.onEdit;
  const [dataValue, setDataValue] = useRecoilState(valueName);

  const submitHandler = (e) => {
    e.preventDefault();

    //se settea el nuevo name para que el input lo muestre en mis datos
    setDataValue(e.target.name.value);

    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      newPasswordRepetido: e.target.newPasswordRepetido.value,
    };
    setMisDatos(data);
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
        nameValue={true}
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
