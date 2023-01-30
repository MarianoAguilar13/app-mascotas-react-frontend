import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router";

//BrowserRouter tiene que contener al AppRoutes donde estan todas las
//rutas para renderizar
//Suspense es para que entienda lo asyncronico dentro de los state
//RecoilRoot es para que la app entera entiende del state "global"
//los atomos, recoil, etc

ReactDOM.render(
  <Suspense fallback={null}>
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>,
  document.getElementById("insertar")
);
