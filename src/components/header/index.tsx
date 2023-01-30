import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
//import { InputBuscador } from "../ui/input-buscador/InputBuscador";
//import { BotonBuscador } from "../ui/boton-buscador/BotonBuscador";

function Header(props) {
  //aca utilizo el useNavigate, un hook de react-router, que me permite
  //poder ir a otra ruta, en este caso paso el valor ingresado en el input
  //a la url que esta el componente page que se encarga de realizar la busqueda
  const BaseUrl = props.BaseUrl;

  const navigate = useNavigate();

  //este state lo utilizo para saber si aprete el boton para cerrar
  //o abrir la ventana, dependiendo si es true o false
  const [openWindow, setOpenWindow] = useState(false);

  const desplegarVentana = () => {
    setOpenWindow(true);
  };

  const cerrarVentana = () => {
    setOpenWindow(false);
  };

  return (
    <div className={Css.header}>
      <div className={Css.headerVisible}>
        <div className={Css.headerVisibleLogoContainer}>
          <img
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className={Css.headerVisibleLogoContainerLogo}
            src="https://res.cloudinary.com/druokk1hc/image/upload/v1666023904/huella_iyr42s.png"
            alt="Icono mascotas"
          />
        </div>
        <div className={Css.headerLinks}>
          <a
            onClick={() => {
              navigate("/mis-datos", { replace: true });
            }}
            className={Css.headerLinksLink}
            target=""
          >
            Mis Datos
          </a>
          <a
            onClick={() => {
              navigate("/mis-pets-perdidas", { replace: true });
            }}
            className={Css.headerLinksLink}
            target=""
          >
            Mis mascotas perdidas
          </a>
          <a
            onClick={() => {
              navigate("/cargar-pet-perdida", { replace: true });
            }}
            className={Css.headerLinksLink}
            target=""
          >
            Reportar mascota
          </a>
          <a
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className={Css.headerLinksLink}
            target=""
          >
            Cerrar sesión
          </a>
        </div>
        <div className={Css.headerVisibleBotonDesplegarContainer}>
          <button
            onClick={desplegarVentana}
            className={Css.headerVisibleBotonDesplegar}
          >
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
            <div className={Css.headerVisibleBotonDesplegarBarras}></div>
          </button>
        </div>
      </div>
      <div
        className={Css.ventanaLinks}
        style={{ display: openWindow ? "flex" : "none" }}
      >
        <button onClick={cerrarVentana} className={Css.ventanaLinksBotonCerrar}>
          x
        </button>
        <a
          onClick={() => {
            navigate("/mis-datos", { replace: true });
            cerrarVentana();
          }}
          className={Css.ventanaLinksLink + " " + Css.linkUno}
          target=""
        >
          Mis Datos
        </a>
        <a
          onClick={() => {
            navigate("/mis-pets-perdidas", { replace: true });
            cerrarVentana();
          }}
          className={Css.ventanaLinksLink + " " + Css.linkDos}
          target=""
        >
          Mis mascotas perdidas
        </a>
        <a
          onClick={() => {
            navigate("/cargar-pet-perdida", { replace: true });
            cerrarVentana();
          }}
          className={Css.ventanaLinksLink + " " + Css.linkTres}
          target=""
        >
          Reportar mascota
        </a>
        <a
          onClick={() => {
            navigate("/", { replace: true });
            cerrarVentana();
          }}
          className={Css.ventanaLinksLink + " " + Css.linkCuatro}
          target=""
        >
          Cerrar sesion
        </a>
      </div>
    </div>
  );
}

export { Header };
