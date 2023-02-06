import React, { useState, useEffect } from "react";
import { MainButton } from "../../ui/buttons";
import { FormSignIn } from "../../components/form-sign-in";
import Css from "./index.css";
import { atom, useRecoilValue, selector, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { iniciarSesionCrearToken } from "../../hooks/hooks";

export function SignIn(params) {
  //este state usa el atom userLogin que tiene los datos para iniciar sesion
  const [userLogin, setUserLogin] = useState({
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const callbackSignIn = (respuesta) => {
    if (respuesta.error) {
      alert(respuesta.error);
      navigate("/sign-in", { replace: true });
    } else {
      alert("Se ingresó correctamente a tu cuenta");
      navigate("/", { replace: true });
    }
  };

  //este useEffect escucha los cambios del userLoginState
  //y cuando cambien se va a a ejecutar si existe un mail, la funcion
  //iniciarSesionCrearToken el cual crea un token para ese ususario
  //y de ahora en mas se usara ese token para identificarse
  useEffect(() => {
    if (userLogin.mail) {
      console.log("dataLogin: ", userLogin);

      iniciarSesionCrearToken(
        userLogin.mail,
        userLogin.password,
        callbackSignIn
      );
    }
  }, [userLogin]);

  return (
    <div className={Css.container}>
      <h3 className={Css.containerTitulo}>Inicio de Sesión</h3>
      <FormSignIn
        onLogin={setUserLogin}
        idInputUno="mail-input"
        nameInputUno="mail"
        typeInputUno="email"
        labelNameUno="MAIL"
        idInputDos="password-input"
        nameInputDos="password"
        typeInputDos="password"
        labelNameDos="CONTRASEÑA"
        buttonChildren="Enviar"
      ></FormSignIn>
      <div className={Css.containerOptions}>
        <MainButton
          onClick={() => {
            navigate("/sign-up", { replace: true });
          }}
        >
          Crear una cuenta
        </MainButton>
      </div>
    </div>
  );
}
