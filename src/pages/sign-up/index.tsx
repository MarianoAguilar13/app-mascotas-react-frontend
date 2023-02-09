import React, { useState, useEffect } from "react";
import { FormSignUp } from "../../components/form-sign-up";
import Css from "./index.css";
import { crearCuenta } from "../../api-hooks/api-hooks";
import { useNavigate } from "react-router-dom";
import {
  useCheckPasswords,
  useValidateEmail,
} from "../../api-hooks/api-hooks-create-account";

export function SignUp() {
  //contiene el state de los datos para crear una cuenta
  const [userCreateData, setUserCreateData] = useState({
    mail: "",
    password: "",
    name: "",
    passwordRepetida: "",
  });
  const navigate = useNavigate();

  //el callback para enviar al fetch de la api para crear la cuenta
  //cuando se termine de ejecutar el fetch va a correr este callback
  const callbackCrearCuenta = (resultado) => {
    if (resultado.error) {
      alert(resultado.error);
      alert("Por favor ingrese valores validos para poder crear su cuenta");
      navigate("/sign-up", { replace: true });
    } else {
      alert("Su cuenta se ha creado correctamente");
      navigate("/sign-in", { replace: true });
    }
  };

  //checkea que las contraseñas sean iguales usando los datos del state userCreateData
  const resultCheckPass = useCheckPasswords(userCreateData);
  //checkea que el mail en el state userCreateData tenga formato de mail
  const resultValidateMail = useValidateEmail(userCreateData);

  //cada vez que se modifica el state userCreateData hacer la llamada de la api
  useEffect(() => {
    if (userCreateData.mail) {
      console.log("dataLogin: ", userCreateData);

      if (resultCheckPass) {
        if (resultValidateMail) {
          //el crear cuenta nos permite envia los datos del state userCreateData
          //y con esos datos intenta crear la cuenta, despendiendo lo que devuelva la api
          //es lo que ejecutara el callback
          crearCuenta(
            userCreateData.mail,
            userCreateData.password,
            userCreateData.name,
            callbackCrearCuenta
          );
        } else {
          alert(
            "El mail ingresado, no tiene formato de mail, por favor ingrese un mail válido"
          );
        }
      } else {
        alert(
          "Las contraseñas ingresadas no coinciden, por favor ingrese los datos nuevamente"
        );
      }
    }
  }, [userCreateData]);

  return (
    <div className={Css.container}>
      <h3 className={Css.containerTitulo}>Crear cuenta</h3>
      <FormSignUp
        onSignUp={setUserCreateData}
        idInputUno="mail-input"
        nameInputUno="mail"
        typeInputUno="email"
        labelNameUno="MAIL"
        idInputDos="name-input"
        nameInputDos="name"
        typeInputDos="text"
        labelNameDos="NAME"
        idInputTres="password-input"
        nameInputTres="password"
        typeInputTres="password"
        labelNameTres="CONTRASEÑA"
        idInputCuatro="password-repetida-input"
        nameInputCuatro="passwordRepetida"
        typeInputCuatro="password"
        labelNameCuatro="REPETIR CONTRASEÑA"
        buttonChildren="Enviar"
      ></FormSignUp>
    </div>
  );
}
