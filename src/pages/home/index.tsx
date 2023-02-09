import React, { useState, useEffect } from "react";
import { CardPetPerdida } from "../../components/card-pet-perdida";
import { CardMisPets } from "../../components/card-mis-pets";
import Css from "./index.css";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/buttons";
import { coordenadasBusquedaCercanas } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

function Home() {
  const [coordenadas, setCoordenadas] = useRecoilState(
    coordenadasBusquedaCercanas
  );
  const [comenzar, setComenzar] = useState(true);
  const navigate = useNavigate();
  //cuando se crea el componente se pide la geolocalizacion en el
  //navegador y la settea en el state del recoil del atom coordenadas
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geoLocationPosition) => {
      const lat = geoLocationPosition.coords.latitude;
      const lng = geoLocationPosition.coords.longitude;

      setCoordenadas({ lat: lat, lng: lng });

      console.log("lat: ", lat + "... lng: ", lng);
    });
  }, [comenzar]);

  return (
    <div className={Css.container}>
      <h1 className={Css.containerTitle}>Mascotas perdidas cerca tuyo</h1>
      <div className={Css.containerLocationContainer}>
        <p className={Css.containerLocationContainerDesciption}>
          Apretar en el boton buscar y le apareceran las mascotas perdidas en
          las cercanías.
        </p>
        <div className={Css.containerLocationContainerButtonContainer}>
          <MainButton
            onClick={() => {
              navigate("/pets-cercanas", { replace: true });
            }}
          >
            Buscar
          </MainButton>
        </div>
      </div>
    </div>
  );
}

export { Home };
