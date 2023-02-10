import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";

function Layout() {
  //el componente Outlet, significa que ahi van a ir todos los
  //componentes que esten dentro de la rutas en la AppRouter
  //el layout se utiliza cuando se repite mucho, ej: header nav footer, etc

  return (
    <div className="container-layout">
      <Header></Header>
      <div className="contenido-layout">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export { Layout };
