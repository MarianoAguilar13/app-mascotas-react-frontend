import React, { useState, useEffect } from "react";
import { CardPetPerdida } from "../../components/card-pet-perdida";
import Css from "./index.css";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/buttons";
import { coordenadasBusquedaCercanas } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { petsConLocationCercana } from "../../hooks/hooks";

function PetsCercanas() {
  const [coordenadas, setCoordenadas] = useRecoilState(
    coordenadasBusquedaCercanas
  );
  const [comenzar, setComenzar] = useState(true);

  const [lasPetsCercanas, setLasPetsCercanas] = useState([]);

  const navigate = useNavigate();

  const callbackPetsCercanas = (respuesta) => {
    if (respuesta[0]) {
      setLasPetsCercanas(respuesta);
    } else {
      alert("No hay mascotas cerca de tu hubicación");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    petsConLocationCercana(
      coordenadas.lat,
      coordenadas.lng,
      callbackPetsCercanas
    );
  }, [comenzar]);

  return lasPetsCercanas ? (
    <div className={Css.container}>
      <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
      <div className={Css.containerCard}>
        {lasPetsCercanas.map((r) => (
          <CardPetPerdida
            key={r.id}
            name={r.name}
            urlImagen={r.picURL}
            description={r.description}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={Css.container}>
      <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
    </div>
  );
}

export { PetsCercanas };
