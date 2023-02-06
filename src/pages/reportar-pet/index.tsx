import React from "react";
import Css from "./index.css";
import { FormReportPet } from "../../components/form-report-pet";

function ReportarPet(props) {
  return (
    <div className={Css.containerForm}>
      <h3 className={Css.containerFormTitle}>
        Reportar info de "ACA VA EL NAME DE LA PET"
      </h3>
      <FormReportPet
        onSubmit={() => {
          console.log("HOLA que hace");
        }}
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
