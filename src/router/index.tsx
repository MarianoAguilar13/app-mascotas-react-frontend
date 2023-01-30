import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/home";
import { MisPets } from "../pages/mis-pets";
import { CargarPet } from "../pages/cargar-pet";
import { MisDatos } from "../pages/mis-datos";

//aca esta el componente appRoutes el cual contiene todas las rutas
//y los componentes pages que muestran esas rutas,
//busqueda y id son props que se envian en la url y se las puede
//llamar dentro del componente
//el path="/" engloba a las demas rutas, asi que todos los demas
//componentes se van a mostrar dentro de Layout
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="cargar-pet-perdida" element={<CargarPet />}></Route>
        <Route path="mis-pets-perdidas" element={<MisPets />}></Route>
        <Route path="mis-datos" element={<MisDatos />}></Route>
      </Route>
    </Routes>
  );
}

export { AppRoutes };
