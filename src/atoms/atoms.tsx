import { atom, useRecoilValue, selector } from "recoil";

export const queryState = atom({
  key: "query",
  default: "",
});

export const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const valorDeQuery = get(queryState);
    // ### TU CÓDIGO
    // hago la búsqueda usando la API de mercadolibre

    //hago el if, porque sino se va a ejecutar al principio cuando
    //la query del buscador no tiene nada
    if (valorDeQuery) {
      const promesaML = fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + valorDeQuery
      );

      try {
        const res = await promesaML;

        const data = await res.json();

        console.log("resultados: ", data.results);

        return data.results;
      } catch (err) {
        alert(err);
      }
    }
  },
});

export const idState = atom({
  key: "id",
  default: "",
});

export const idResultState = selector({
  key: "idSearchResult",
  get: async ({ get }) => {
    const valorDeId = get(idState);
    // ### TU CÓDIGO
    // hago la búsqueda usando la API de mercadolibre
    const promesaML = fetch("https://api.mercadolibre.com/items/" + valorDeId);

    try {
      const res = await promesaML;

      const data = await res.json();

      console.log("resultados: ", data);

      return data;
    } catch (err) {
      alert(err);
    }
  },
});
