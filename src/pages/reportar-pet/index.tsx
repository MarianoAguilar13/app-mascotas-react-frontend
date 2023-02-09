import React, { useState, useEffect } from "react";
import Css from "./index.css";
import { FormReportPet } from "../../components/form-report-pet";
import { useRecoilState } from "recoil";
import { idPet, mailUser } from "../../atoms/atoms";
import {
  useMailUser,
  usePetDataReport,
} from "../../api-hooks/api-hooks-reportar-pet";
import { log } from "console";

function ReportarPet(props) {
  const [petAReportar, setPetAReportar] = useRecoilState(idPet);
  const [mailUserOwner, setMailUserOwner] = useRecoilState(mailUser);
  const [comenzar, setComenzar] = useState(true);

  const idPetNumber = parseInt(petAReportar.id, 10);

  //con el id de la pet, se obtiene el id del user y con ese id
  //se obtiene el mail del dueño de esa pet

  //se ejecuta el segundo fetch con el callback
  const callbackPetData = (userId) => {
    console.log("Este es el id del usuario dueño de la mascota: ", userId);
    useMailUser(userId, callbackMailUser);
  };

  //por ultimo se ejecuta el callback para settear el mail obtenido
  const callbackMailUser = (mail) => {
    console.log("Este se setea en el setMailUserOwner: ", mail);
    setMailUserOwner({ mail: mail });
  };

  //se ejecuta una vez cuando comienza el componente
  //ejecuta el fetch que tiene un callback que dentro tiene un fetch
  //lo hice de esta forma para encadenar las llamadas sino estaba
  //undefined los datos que queria utilizar en la segunda llamada
  //porque la primera no se habia terminado de ejecutar
  useEffect(() => {
    usePetDataReport(idPetNumber, callbackPetData);
  }, [comenzar]);

  return (
    <div className={Css.containerForm}>
      <h3 className={Css.containerFormTitle}>
        Reportar info de {petAReportar.name}
      </h3>
      <FormReportPet
        idInputUno="name-input"
        nameInputUno="nombre"
        typeInputUno="text"
        labelNameUno="TU NOMBRE"
        idInputDos="telefono-input"
        nameInputDos="telefono"
        typeInputDos="text"
        labelNameDos="TU TELÉFONO"
        idTextArea="message-input"
        nameTextArea="msj"
        labelNameTres="¿DONDE LO VISTE?"
        buttonChildren="Enviar"
      ></FormReportPet>
    </div>
  );
}

export { ReportarPet };
