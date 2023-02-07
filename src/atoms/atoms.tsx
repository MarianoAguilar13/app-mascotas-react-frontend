import { atom, useRecoilValue, selector } from "recoil";

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

export const coordenadasBusquedaCercanas = atom({
  key: "coordenadasBusquedaCercanas",
  default: { lat: 0, lng: 0 },
});
