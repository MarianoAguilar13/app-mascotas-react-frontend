import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Css from "./index.css";
import { ButtonMapBox } from "../../ui/buttons";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFyaWFub3JhbGl1Z2ExMyIsImEiOiJjbDhodGJqZHYwaWo4M3dxcHV5cjUxaXZkIn0.HWomT8jl3x56PClLxd1Tlw",
});

type MapBoxSearchProps = {
  onChange?: (any) => any;
};

function MapboxSeach(props: MapBoxSearchProps) {
  const { onChange } = props;
  const [query, setQuery] = useState("");
  // lo seteo any porque la prop "center" de Map se queja
  const initialCoords: any = [-58.3857976, -34.6037388];
  const [coords, setCoords] = useState(initialCoords);

  async function search() {
    // esta API la saqué de por ahi
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${query}&format=json`
    ).then((r) => r.json());
    console.log(data);
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    const newCoords = [lon, lat];
    setCoords(newCoords);

    // lo "tiro" hacia arriba para que reciban las coordenadas desde "afuera"
    if (onChange) {
      onChange({
        query: query,
        coords: newCoords,
      });
    }
  }

  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }

  function keydownInputHandler(e) {
    // si no es con form, tengo que agregar esto
    if (e.key == "Enter") {
      // evito que se dispare el submit
      e.preventDefault();
      search();
    }
  }

  return (
    <div className={Css.container}>
      <label className={Css.containerLabel} htmlFor="input-mapbox">
        ¿DONDE SE VIO POR ULTIMA VEZ?
      </label>
      <input
        id="input-mapbox"
        className={Css.containerInput}
        type="text"
        onChange={inputChangeHandler}
        onKeyDown={keydownInputHandler}
        value={query}
      />

      <ButtonMapBox onClick={search}> Buscar</ButtonMapBox>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "350px",
          width: "350px",
          marginTop: "50px",
        }}
        zoom={[15]}
        center={coords}
        movingMethod="easeTo"
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={coords} />
        </Layer>
      </Map>
    </div>
  );
}

export { MapboxSeach };
