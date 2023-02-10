import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { FieldSetTextArea } from "../../ui/fields-sets";
import { useRecoilState } from "recoil";
import { mailUser } from "../../atoms/atoms";
import { useCrearTexto } from "../../api-hooks/api-hooks-reportar-pet";
import { useEnviarMail } from "../../api-hooks/api-hooks-reportar-pet";

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
  onSubmit?: {};
};

export function FormReportPet(props: PropsFormReportPet) {
  const [mailUserOwner, setMailUserOwner] = useRecoilState(mailUser);
  const navigate = useNavigate();

  //si el fetch sale bien entonces mostramos con una alerta el msj
  const callbackEnviarMail = (respuesta) => {
    alert(respuesta.message);
    navigate("/", { replace: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const name = e.target.nombre.value;
    const tel = e.target.telefono.value;
    const telCheck = parseInt(e.target.telefono.value, 10);
    const msj = e.target.msj.value;

    //primero se checkea que exista todos los datos
    if (
      Number.isInteger(telCheck) &&
      tel.length >= 10 &&
      name.length > 0 &&
      msj.length > 0
    ) {
      //luego se crea el texto en base a los datos del form
      const text = useCrearTexto(name, tel, msj);
      console.log(
        "este es el texto a envia: ",
        text,
        " este es el mail: ",
        mailUserOwner.mail
      );
      //se envia el mail con el fetch
      useEnviarMail(mailUserOwner.mail, text, callbackEnviarMail);
    } else {
      alert(
        "Recuerde que deben completarse todos los datos para enviar el reporte y el número de teléfono debe contener carecterística y número"
      );
    }
  };

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
      <FieldSetTextArea
        idTextArea={props.idTextArea}
        nameTextArea={props.nameTextArea}
        labelName={props.labelNameTres}
      ></FieldSetTextArea>
      <MainButton>{props.buttonChildren}</MainButton>
    </form>
  );
}
