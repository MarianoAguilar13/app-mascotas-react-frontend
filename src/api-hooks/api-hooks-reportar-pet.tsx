const API_BASE_URL = "https://app-mascotas-backend.onrender.com";

export const useMailUser = async (id: number, callback) => {
  const fetchApi = fetch(API_BASE_URL + "/user-mail?id=" + id, {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();
    //aca mos devuelve el mail
    console.log("este es lo que devuelve useMailUser: ", resultado);
    callback(resultado);
  } catch (resultado) {
    callback(resultado);
  }
};

//primero obtenemos el id del usuario dueño de la mascota con el id de la pet,
//para luego obtener el mail de ese usuario y poder enviarle un mail
//con los datos que aporta la persona que reporta
export const usePetDataReport = async (idPet: number, callback) => {
  //si existe un email en el state va a hacer el fetch-post
  const fetchApi = fetch(API_BASE_URL + "/pet-data-report?idPet=" + idPet, {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();
    //aca mos devuelve el el userId dueño de la mascota
    console.log("este es el userId que devuelve: ", resultado.userId);
    callback(resultado.userId);
  } catch (resultado) {
    callback(resultado);
  }
};

//crea el texto para enviar por el mail, en base a unos parametros
export const useCrearTexto = (name, tel, msj) => {
  const texto =
    "Nombre de la persona que lo avisto: " +
    name +
    ".<br> Telefono de contacto: " +
    tel +
    ".<br> Mensaje: " +
    msj;

  return texto;
};

//este fetch nos permite enviar el mail al usuario dueño de la pet
//que se reporto
export const useEnviarMail = async (
  mailUser: string,
  texto: string,
  callback
) => {
  const fetchApi = fetch(API_BASE_URL + "/reports/enviar-mail", {
    method: "POST",

    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      mailUser,
      texto,
    }),
  });

  try {
    const res = await fetchApi;

    const resultado = await res.json();
    //aca mos devuelve el el userId dueño de la mascota

    callback(resultado);
  } catch (resultado) {
    callback(resultado);
  }
};
