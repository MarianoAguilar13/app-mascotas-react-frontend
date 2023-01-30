import React from "react";
import css from "./boton-buscador.css";

export function BotonBuscador(props) {
  return <button className={css.botonBuscador}>{props.children} </button>;
}
