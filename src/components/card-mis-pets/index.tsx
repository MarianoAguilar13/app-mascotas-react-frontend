import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./index.css";
import { idPetEditar } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

type PropsFormReportPet = {
  urlImagen: string;
  name: string;
  id;
};

export function CardMisPets(props: PropsFormReportPet) {
  const [petEditar, setPetEditar] = useRecoilState(idPetEditar);
  const pet = { id: props.id };

  const navigate = useNavigate();

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
        <button
          className={Css.buttonMisPets}
          onClick={() => {
            //cuando hacen click en el boton de reportar a una determinada
            //mascota, se settea el id de esa mascota para utilizarlo en la
            //page reportarPet
            console.log("id de mascota a reportar: ", props.id);
            setPetEditar(pet);
            navigate("/editar-pet", { replace: true });
          }}
        >
          {" "}
          EDITAR INFO
        </button>
      </div>
    </div>
  );
}
