import React, { useState, useEffect } from "react";
import { CardPetPerdida } from "../../components/card-pet-perdida";
import Css from "./index.css";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/buttons";
import { coordenadasBusquedaCercanas } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { petsConLocationCercana } from "../../api-hooks/api-hooks";

function PetsCercanas() {
  //las coordenadas que se obtuvieron del navegador
  const [coordenadas, setCoordenadas] = useRecoilState(
    coordenadasBusquedaCercanas
  );
  const [comenzar, setComenzar] = useState(true);

  const [lasPetsCercanas, setLasPetsCercanas] = useState([]);

  const navigate = useNavigate();

  //ejecuta el callback luego de que finalice el fetch
  //si encontro mascotas se settearan en el state y sino
  //se dara una alerta y lo redirigira al home
  const callbackPetsCercanas = (respuesta) => {
    if (respuesta[0]) {
      setLasPetsCercanas(respuesta);
    } else {
      alert("No hay mascotas cerca de tu hubicación");
      navigate("/", { replace: true });
    }
  };

  //se ejecuta una unica vez cuando se icicia el componente
  useEffect(() => {
    //busca con la api a las pets cercanas a su ubicacion
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
            id={r.id}
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
