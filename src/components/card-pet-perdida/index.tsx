import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { ButtonCard } from "../../ui/buttons";

type PropsFormReportPet = {
  urlImagen: string;
  name: string;
  description: string;
};

export function CardPetPerdida(props: PropsFormReportPet) {
  return (
    <div className={Css.cardPet}>
      <img
        className={Css.cardPetImagen}
        src={props.urlImagen}
        alt="Imagen mascota"
      />
      <div className={Css.cardPetInfo}>
        <div className={Css.cardPetInfoSubContainer}>
          <div className={Css.cardPetInfoSubContainerNameContainer}>
            <h4 className={Css.cardPetInfoSubContainerNameContainerName}>
              {props.name}
            </h4>
          </div>
          <ButtonCard>REPORTAR INFORMACION</ButtonCard>
        </div>
        <div className={Css.cardPetInfoDescriptionContainer}>
          <h4 className={Css.cardPetInfoDescriptionContainerDescription}>
            {props.description}
          </h4>
        </div>
      </div>
    </div>
  );
}
