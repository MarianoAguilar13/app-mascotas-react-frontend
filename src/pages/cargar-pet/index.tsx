import React, { useState, useEffect } from "react";
import { MapboxSeach } from "../../components/mapbox-search";
import Css from "./index.css";
import { MainFieldSet } from "../../ui/fields-sets";
import { FieldSetTextArea } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useCheckTokenCompleto } from "../../hooks/hooks";
import { cargarPet } from "../../hooks/hooks";

function CargarPet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ mapbox: { coords: [] } });
  const [fileUrl, setFileUrl] = useState();
  const [enviarData, setEnviarData] = useState(false);

  useCheckTokenCompleto();

  //esta funcion me permite transformar imagenes en texto plano
  // base64url
  const encodeFileAsBase64URL = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  };

  const callbackCargarPet = (result) => {
    if (result.petId) {
      console.log("id pet: ", result.petId);

      alert("Tu mascota se ha cargado correctamente");
      navigate("/", { replace: true });
    } else {
      alert(result.error);
      navigate("/cargar-pet", { replace: true });
    }
  };

  function submitHandler(e) {
    console.log("El evento submit no se ha disparado");
    e.preventDefault();
    if (enviarData) {
      e.preventDefault();
      const allData = {
        name: e.target["name"].value,
        type: e.target["tipoPet"].value,
        description: e.target["descripcion"].value,
        pictureDataURL: fileUrl,
        lat: formData.mapbox.coords[1],
        lng: formData.mapbox.coords[0],
        lost: true,
      };

      if (allData.pictureDataURL && allData.lat && allData.lng) {
        cargarPet(
          allData.name,
          allData.type,
          allData.description,
          allData.pictureDataURL,
          allData.lat,
          allData.lng,
          allData.lost,
          callbackCargarPet
        );
      } else {
        alert(
          "Por favor recuerde que es necesario ingresar una foto de su mascota y una ubicación donde se avisto por última vez "
        );
        navigate("/cargar-pet", { replace: true });
      }
      console.log("El evento submit se disparó");
      console.log(allData);
    } else {
      console.log("El evento submit no se ha disparado");
    }
  }

  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  return (
    <div className={Css.container}>
      <h3 className={Css.containerTitle}>Reportar mascota perdida</h3>
      <form className={Css.containerForm} onSubmit={submitHandler}>
        <MainFieldSet
          idInput="name-input"
          nameInput="name"
          typeInput="text"
          labelName="NOMBRE"
        ></MainFieldSet>
        <MainFieldSet
          idInput="tipo-pet-input"
          nameInput="tipoPet"
          typeInput="text"
          labelName="TIPO DE MASCOTA"
        ></MainFieldSet>
        <Dropzone
          onDrop={async (file) => {
            const base64URL = (await encodeFileAsBase64URL(file[0])) as any;

            //Ahora que transforme la imagen en data base64URL la guardo en
            //los datos
            setFileUrl(base64URL);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={Css.containerDropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <p className={Css.containerDropzoneP}>
                  Haz click en el fondo violeta para subir una foto
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <FieldSetTextArea
          idTextArea="descripcion"
          nameTextArea="descripcion"
          labelName="DESCRIPCION"
        ></FieldSetTextArea>
        <MapboxSeach onChange={handleMapboxChange} />
        <MainButton
          onClick={() => {
            setEnviarData(true);
          }}
        >
          ENVIAR
        </MainButton>
      </form>
    </div>
  );
}

export { CargarPet };
