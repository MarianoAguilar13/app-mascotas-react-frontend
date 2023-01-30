import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilValue, selector, useRecoilState } from "recoil";
import {
  queryState,
  resultsState,
  idResultState,
  idState,
} from "../atoms/atoms";

// mi custom hook
//este se encarga de escuchar cuando cambia el params.busqueda que
//es la query y guardar esa query en el queryState
//luego cuando cambia el queryState el resultState se vuelve a
//ejecutar llamando a la api con el valor de query
//esos resultsState lo guardo en una variable y la funcion useSerchResults
//la retorna en una variable en el componente, la cual esta usa los resultados
//para mostrarlos dentro del componente
export function useSearchResults() {
  //con el useParams va a tener acceso a los parametro enviados por
  //la url, dependiendo de la page en la que se invoco esta funcion
  //useSearchResults

  // paso 1) escuchar los cambios en la url
  const params = useParams();
  const [query, setQuery] = useRecoilState(queryState);

  // paso 3) - reacciona al cambio de la query y realiza la llamada a la api
  //guardando los resultados de la api
  const results = useRecoilValue(resultsState);

  //paso 2) - avisarle a recoil (useEffect)
  // escucho cambios en los params con useEffect
  useEffect(() => {
    console.log("el router me dice que query cambió");
    // guardar el valor de la query en el átomo: queryState
    //aca voy a modificar el a query con el valor de params

    if (params.busqueda) {
      setQuery(params.busqueda);
      console.log("query: ", params.busqueda);
    }
  }, [params]);

  return results;
}

export function useIdSearchResult() {
  const params = useParams();
  const [id, setId] = useRecoilState(idState);

  // escucho cambios en los params con useEffect
  useEffect(() => {
    console.log("el router me dice que query cambió");
    // guardar el valor de la query en el átomo: queryState
    //aca voy a modificar el a query con el valor de params

    if (params.id) {
      console.log("este es el id: ", params.id);

      setId(params.id);
    }
  }, [params]);

  // finalmente me engancho a los cambios de resultState

  const results = useRecoilValue(idResultState);

  return results;
}
