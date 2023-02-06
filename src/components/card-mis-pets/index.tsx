import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";

type PropsFormReportPet = {
  urlImagen: string;
  name: string;
};

export function CardMisPets(props: PropsFormReportPet) {
  return (
    <div className={Css.cardPet}>
      <img
        className={Css.cardPetImagen}
        src={props.urlImagen}
        alt="Imagen mascota"
      />
      <div className={Css.cardPetInfo}>
        <div className={Css.cardPetInfoContainer}>
          <h4 className={Css.cardPetInfoSubContainerName}>{props.name}</h4>
        </div>
        <button className={Css.buttonMisPets}> EDITAR INFO</button>
      </div>
    </div>
  );
}
