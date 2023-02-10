import React, { useState, useEffect } from "react";
import { MapboxSeach } from "../../components/mapbox-search";
import Css from "./index.css";
import { FieldSetEditPet } from "../../ui/fields-sets";
import { FieldSetTextAreaEditPet } from "../../ui/fields-sets";
import { MainButton } from "../../ui/buttons";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useCheckTokenCompleto } from "../../api-hooks/api-hooks";
import { getOnePet, editarPet } from "../../api-hooks/api-hooks";
import { idPetEditar } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

function EditarPet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ mapbox: { coords: [] } });
  const [fileUrl, setFileUrl] = useState();
  const [enviarData, setEnviarData] = useState(false);
  const [comenzar, setComenzar] = useState(true);
  const [petEditar, setPetEditar] = useRecoilState(idPetEditar);
  const [petData, setPetData] = useState({
    id: 0,
    name: "",
    type: "",
    description: "",
    picURL: "",
    lat: 0,
    lng: 0,
    lost: true,
    userId: 0,
  });
  //este state sirve para mostrar la pseudo url creada para mostrar
  //la imagen que se quiere cargar
  const [imagenMostrar, setImagenMostrar] = useState("");

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

  useEffect(() => {
    getOnePet(petEditar.id, callbackOnePet);
  }, [comenzar]);

  const callbackOnePet = (pet) => {
    if (pet.id) {
      setPetData(pet);
    } else {
      alert("La mascota a la que quiere acceder ya no existe");
      navigate("/", { replace: true });
    }
  };

  //este callback verifica si se cargo correctamente la pet
  const callbackEditPet = (result) => {
    if (result) {
      alert("Tu mascota se ha cargado correctamente");
      navigate("/", { replace: true });
    } else {
      alert(result.error);
      navigate("/cargar-pet", { replace: true });
    }
  };

  //le envio el submitHandler por props al form y checkea todos
  //los campos y si esta todo ok, guarda la nueva pet con un fetch
  //a la api
  function submitHandler(e) {
    e.preventDefault();
    if (enviarData) {
      e.preventDefault();

      if (petData.name != e.target["name"].value && e.target["name"].value) {
        petData.name = e.target["name"].value;
      }
      if (
        petData.type != e.target["tipoPet"].value &&
        e.target["tipoPet"].value
      ) {
        petData.type = e.target["tipoPet"].value;
      }
      if (
        petData.description != e.target["descripcion"].value &&
        e.target["descripcion"].value
      ) {
        petData.description = e.target["descripcion"].value;
      }
      if (fileUrl) {
        petData.picURL = fileUrl;
      }
      if (formData.mapbox.coords[1]) {
        petData.lat = formData.mapbox.coords[1];
      }
      if (formData.mapbox.coords[0]) {
        petData.lng = formData.mapbox.coords[0];
      }

      editarPet(
        petData.name,
        petData.type,
        petData.description,
        petData.picURL,
        petData.lat,
        petData.lng,
        petData.lost,
        petData.id,
        callbackEditPet
      );
    }
  }

  //este handle settea la data de las coordenadas de la ubicacion
  //buscada por mapbox mas la data del resto del form
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
        <FieldSetEditPet
          nameValue={petData.name}
          idInput="name-input"
          nameInput="name"
          typeInput="text"
          labelName="NOMBRE"
        ></FieldSetEditPet>
        <FieldSetEditPet
          typeValue={petData.type}
          idInput="tipo-pet-input"
          nameInput="tipoPet"
          typeInput="text"
          labelName="TIPO DE MASCOTA"
        ></FieldSetEditPet>
        <img
          className={Css.mostrarImagen}
          src={imagenMostrar || petData.picURL}
          alt="Imagen de la pet a cargar"
        />
        <Dropzone
          onDrop={async (file) => {
            const base64URL = (await encodeFileAsBase64URL(file[0])) as any;

            //aca voy asignar una url al archivo cargado en dropzone
            //asi lo puedo mostrar como una imagen
            const fileMostrar = Object.assign(file[0], {
              preview: URL.createObjectURL(file[0]),
            });
            //setteo la url creada
            setImagenMostrar(fileMostrar.preview);
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

        <FieldSetTextAreaEditPet
          descriptionValue={petData.description}
          idTextArea="descripcion"
          nameTextArea="descripcion"
          labelName="DESCRIPCION"
        ></FieldSetTextAreaEditPet>
        <MapboxSeach onChange={handleMapboxChange} />
        <MainButton
          onClick={() => {
            //cuando apreto el click de enviar, recien ahi pongo el state
            //de enviarData en true para que se active lo del handleSubmit
            setEnviarData(true);
          }}
        >
          ENVIAR
        </MainButton>
      </form>
    </div>
  );
}

export { EditarPet };
