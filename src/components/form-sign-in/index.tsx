import React, { useState, useEffect } from "react";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import { atom, useRecoilValue, selector, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

type PropsFormReportPet = {
  idInputUno: string;
  nameInputUno: string;
  typeInputUno: string;
  labelNameUno: string;
  idInputDos: string;
  nameInputDos: string;
  typeInputDos: string;
  labelNameDos: string;
  buttonChildren: string;
  onLogin?: any;
};

export function FormSignIn(props: PropsFormReportPet) {
  const setUserLogin = props.onLogin;

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      mail: e.target.mail.value,
      password: e.target.password.value,
    };

    setUserLogin(userData);
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
      <MainButton>{props.buttonChildren}</MainButton>
    </form>
  );
}
