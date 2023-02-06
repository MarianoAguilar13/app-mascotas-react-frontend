import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckTokenCompleto } from "../../hooks/hooks";
import { misPets } from "../../hooks/hooks";
import { CardMisPets } from "../../components/card-mis-pets";
import Css from "./index.css";

function MisPets() {
  useCheckTokenCompleto();

  const [comenzar, setComenzar] = useState(true);
  const [myPets, setMyPets] = useState([]);

  const navigate = useNavigate();

  const callbackMyPets = (respuesta) => {
    if (respuesta[0]) {
      setMyPets(respuesta);
    } else {
      alert("No has publicado mascotas por el momento");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    misPets(callbackMyPets);
  }, [comenzar]);

  return myPets ? (
    <div className={Css.container}>
      <h1 className={Css.containerTitle}>Mis mascotas perdidas</h1>
      <div className={Css.containerCard}>
        {myPets.map((r) => (
          <CardMisPets key={r.id} name={r.name} urlImagen={r.picURL} />
        ))}
      </div>
    </div>
  ) : (
    <div className={Css.container}>
      <h1 className={Css.containerTitle}>Mis mascotas perdidas</h1>
    </div>
  );
}

export { MisPets };
