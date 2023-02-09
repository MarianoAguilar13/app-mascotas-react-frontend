import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckTokenValido } from "./api-hooks-mis-datos";

const API_BASE_URL = "https://app-mascotas-backend.onrender.com";

//crea el token del usuario cuando inicia sesion y lo guarda en
//el local storage
export async function iniciarSesionCrearToken(
  mail: string,
  password: string,
  callback
) {
  const fetchApi = fetch(API_BASE_URL + "/auth/token", {
    method: "post",
    //necesita este header para que funcione
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      mail: mail,
      password: password,
    }),
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();
    console.log(resultado.respuesta);
    localStorage.setItem("Token", resultado.respuesta);
    console.log(localStorage.getItem("Token"));
    callback(resultado);
  } catch (resultado) {
    callback(resultado);
  }
}

//este fetch nos permite crear un nuevo usuario
export async function crearCuenta(
  mail: string,
  password: string,
  name: string,
  callback
) {
  const fetchApi = fetch(API_BASE_URL + "/auth", {
    method: "post",
    //necesita este header para que funcione
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      mail: mail,
      password: password,
      name: name,
    }),
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    console.log("respuesta del try crear cuenta: ", resultado);
    callback(resultado);
  } catch (r) {
    console.log("respuesta del catch crear cuenta: ", r);
    callback(r);
  }
}

//este fetch devuelve los datos de un usario utilizando el token
//guardado en el local storage
export async function myData(callback) {
  const token = "bearer " + localStorage.getItem("Token");
  const fetchApi = fetch(API_BASE_URL + "/me", {
    method: "GET",
    //necesita este header para que funcione
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  });
  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    callback(resultado);
  } catch (r) {
    console.log("respuesta del catch crear cuenta: ", r);
    callback(r);
  }
}

//este hook nos permite verificar el token guardado en localstorage
//luego si esta todo ok continua normalmente en esa page y sino
//lo envia a sign-in
export const useCheckTokenCompleto = () => {
  const navigate = useNavigate();

  const [checkToken, setCheckToken] = useState({
    valido: false,
    terminoElChequeo: false,
  });
  const [inicializar, setInicializar] = useState(true);

  const callbackCheckToken = (respuesta) => {
    if (respuesta.error) {
      //el checktokenvalid tiene dos atributos, si es valido o no el token
      //y si se termino el cheaque
      setCheckToken({ valido: false, terminoElChequeo: true });
    } else {
      setCheckToken({ valido: true, terminoElChequeo: true });
    }
  };

  //este estado de inicializar lo cree para que solo se ejecute una vez el
  //chequeo del tengo de la api
  useEffect(() => {
    useCheckTokenValido(callbackCheckToken);
  }, [inicializar]);

  //cada vez que cambia el stado del chequeo se ejecuta
  useEffect(() => {
    //si el chequeo termino entonces entro en el if
    if (checkToken.terminoElChequeo) {
      //si fue valido no hay problema, pero sino fue valido, entonces
      //te notificara que no estas conectado y que vayas al sign-in
      if (checkToken.valido) {
      } else {
        alert(
          "No esta conectado a alguna cuenta, por favor inicie sesión para acceder a esta opción"
        );
        navigate("/sign-in", { replace: true });
      }
    }
  }, [checkToken]);
};

//este fetch nos permite cargar una pet, la cual los otros usuarios
//podran verla si estan cerca de su ubicacion, para que puedan crear un reporte
export const cargarPet = async (
  name: string,
  type: string,
  description: string,
  pictureDataURL: string,
  lat: number,
  lng: number,
  lost: boolean,
  callback
) => {
  const token = "bearer " + localStorage.getItem("Token");
  //si existe un email en el state va a hacer el fetch-post
  const fetchApi = fetch(API_BASE_URL + "/pets", {
    method: "post",

    headers: {
      Authorization: token,
      "content-type": "application/json",
    },

    body: JSON.stringify({
      name,
      type,
      description,
      pictureDataURL,
      lat,
      lng,
      lost,
    }),
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    callback(resultado);
  } catch (resultado) {
    callback(resultado);
  }
};

//esta funcion me permite obtener las pets que subio un usuarios
//para asi luego poder mostrarselas en la page
export const misPets = async (callback) => {
  const token = "bearer " + localStorage.getItem("Token");

  const fetchApi = fetch(API_BASE_URL + "/me/pets", {
    method: "GET",

    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    const mascotas = resultado;

    let arrayMascotas = [] as any;
    //Ahora itero y agrego todas las cards de mis mascotas perdidas
    if (mascotas[0]) {
      for (const pet of mascotas) {
        const newPet = {
          id: pet.id,
          picURL: pet.picURL,
          name: pet.name,
        };
        arrayMascotas.push(newPet);
      }

      callback(arrayMascotas);
    } else {
      callback(resultado);
    }
  } catch (resultado) {
    callback(resultado);
  }
};

//este fetch nos trar la pets perdidas que estan cerca de nuestra
//ubicacion actual, en un radio de 5km
export const petsConLocationCercana = async (
  lat: number,
  lng: number,
  callback
) => {
  const fetchApi = fetch(
    API_BASE_URL + "/pets/cercanas?lat=" + lat + "&lng=" + lng,
    {
      method: "GET",

      headers: {
        "content-type": "application/json",
      },
    }
  );

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();

    const mascotas = resultado;

    let arrayMascotas = [] as any;
    //Ahora itero y agrego todas las cards de las mascotas perdidas
    if (mascotas[0]) {
      for (const pet of mascotas) {
        if (pet) {
          const newPet = {
            id: pet.id,
            picURL: pet.picURL,
            name: pet.name,
            description: pet.description,
          };
          arrayMascotas.push(newPet);
        }
      }

      callback(arrayMascotas);
    } else {
      callback(resultado);
    }
  } catch (resultado) {
    callback(resultado);
  }
};

//con este fetch obtenemos los datos de una pet si tenemos el id de la pet
export const getOnePet = async (idPet: number, callback) => {
  const token = "bearer " + localStorage.getItem("Token");

  const fetchApi = fetch(API_BASE_URL + "/pets?idPet=" + idPet, {
    method: "GET",

    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  });

  try {
    const res = await fetchApi;
    //console.log("nombre del usuario: ", resultado.name);
    const resultado = await res.json();
    const pet = resultado;
    console.log("esta es la pet: ", pet);
    callback(pet);
  } catch (resultado) {
    callback(resultado);
  }
};

export const editarPet = async (
  name: string,
  type: string,
  description: string,
  pictureDataURL,
  lat: number,
  lng: number,
  lost: boolean,
  petId: number,
  callback
) => {
  const token = "bearer " + localStorage.getItem("Token");

  const fetchApi = fetch(API_BASE_URL + "/pets", {
    method: "PATCH",
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },

    body: JSON.stringify({
      name,
      type,
      description,
      pictureDataURL,
      lat,
      lng,
      lost,
      petId,
    }),
  });

  try {
    const res = await fetchApi;
    const resultado = await res.json();
    console.log("resultado de editar la pet: ", resultado);
    callback(resultado);
  } catch (resultado) {
    callback(resultado);
  }
};
