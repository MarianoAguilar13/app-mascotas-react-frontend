import React, { useState, useEffect } from "react";
import Css from "./index.css";
import { FormEditMisDatos } from "../../components/form-edit-mis-datos";
import { useCheckTokenValido } from "../../api-hooks/api-hooks-mis-datos";
import { useNavigate } from "react-router-dom";
import { checkToken, misDatos } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import {
  useCheckNewPasswords,
  useEditarMisDatos,
} from "../../api-hooks/api-hooks-mis-datos";
import { myData } from "../../api-hooks/api-hooks";
import { useCheckTokenCompleto } from "../../api-hooks/api-hooks";

function MisDatos() {
  const [misDatos, setMisDatos] = useState({
    name: "",
    password: "",
    newPassword: "",
    newPasswordRepetido: "",
  });
  const navigate = useNavigate();
  const resultCheckNewsPass = useCheckNewPasswords(misDatos);

  //con este hook chequeamos que sea un token valido
  useCheckTokenCompleto();

  //este callback se va a ejecutar cuando termine el fetch de
  //la api de editarMisDatos
  const callbackEditarMisDatos = (respuesta) => {
    if (respuesta.error) {
      alert(respuesta.error);
      navigate("/mis-datos", { replace: true });
    } else {
      alert(respuesta.aviso);
      console.log("Nuevo nombre: ", respuesta.nuevoName);
      navigate("/", { replace: true });
    }
  };

  //escucha los cambios de mis datos, los cuales ocurren cuando se envian
  //los datos del form
  useEffect(() => {
    if (misDatos.name || misDatos.newPassword) {
      console.log("dataLogin: ", misDatos);

      if (resultCheckNewsPass) {
        //el crear cuenta nos permite envia los datos del state userCreateData
        //y con esos datos intenta crear la cuenta, despendiendo lo que devuelva la api
        //es lo que ejecutara el callback
        useEditarMisDatos(
          misDatos.name,
          misDatos.password,
          misDatos.newPassword,
          callbackEditarMisDatos
        );
      } else {
        alert(
          "Las contraseñas ingresadas no coinciden, por favor ingrese los datos nuevamente"
        );
      }
    }
  }, [misDatos]);

  return (
    <div className={Css.container}>
      <h3 className={Css.containerTitulo}>Mis Datos</h3>
      <h3 className={Css.containerSubTitulo}>
        si desea cambiar la contraseña ingrese la nueva contraseña y repitala,
        si solo desea cambiar el nombre, deje vacio nueva contraseña.
      </h3>
      <FormEditMisDatos
        nameValue={true}
        onEdit={setMisDatos}
        idInputUno="name-input"
        nameInputUno="name"
        typeInputUno="name"
        labelNameUno="NOMBRE"
        idInputDos="password-input"
        nameInputDos="password"
        typeInputDos="password"
        labelNameDos="CONTRASEÑA"
        idInputTres="new-password-input"
        nameInputTres="newPassword"
        typeInputTres="password"
        labelNameTres="NUEVA CONTRASEÑA"
        idInputCuatro="new-password-repetido-input"
        nameInputCuatro="newPasswordRepetido"
        typeInputCuatro="password"
        labelNameCuatro="REPETIR NUEVA CONTRASEÑA"
        buttonChildren="Enviar"
      ></FormEditMisDatos>
    </div>
  );
}

export { MisDatos };
