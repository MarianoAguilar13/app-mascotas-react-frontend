import { atom } from "recoil";

export const userLogin = atom({
  key: "userLogin",
  default: {
    mail: "",
    password: "",
  },
});

export const token = atom({
  key: "token",
  default: {
    token: "",
  },
});

export const userCreate = atom({
  key: "userCreate",
  default: {
    mail: "",
    password: "",
    name: "",
    passwordRepetida: "",
  },
});

export const checkToken = atom({
  key: "checkToken",
  default: {
    valido: false,
    terminoElChequeo: false,
  },
});

export const misDatos = atom({
  key: "misDatos",
  default: {
    name: "",
    password: "",
    newPassword: "",
    newPasswordRepetido: "",
  },
});

export const valueName = atom({
  key: "valueName",
  default: "",
});

//son las coordenas que se utilizan para buscar
export const coordenadasBusquedaCercanas = atom({
  key: "coordenadasBusquedaCercanas",
  default: { lat: 0, lng: 0 },
});

//es el id de la pet que se quiere reportar
export const idPet = atom({
  key: "idPet",
  default: { id: "", name: "" },
});

export const idPetEditar = atom({
  key: "idPetEditar",
  default: { id: 1 },
});

//este atom es para guardar el mail de usuario dueño de la pet
export const mailUser = atom({
  key: "mailUser",
  default: { mail: "" },
});
