import React from "react";
import { CardPetPerdida } from "../../components/card-pet-perdida";
import { CardMisPets } from "../../components/card-mis-pets";
import Css from "./index.css";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/buttons";

function Home() {
  const urlImagen =
    "https://res.cloudinary.com/druokk1hc/image/upload/v1668976728/hvthv819ax94z71hj76d.jpg";
  const name = "Michi";
  const description = "Se me perdio por 4 de febrero al 752";

  const navigate = useNavigate();
  return (
    <div>
      <h1>Soy el home</h1>
    </div>
  );
}

export { Home };
