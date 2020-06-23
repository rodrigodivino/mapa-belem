import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import { geoPath } from "d3-geo";
import Overlay from "./Overlay.js";
import { SVGOverlay } from "react-leaflet";

import bairros from "./belem.json";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [zoom, setZoom] = useState(13);

  return (
    <div className="App">
      <h1> Leaflet + D3 Integration in React </h1>
      <Map
        center={[-1.445833, -48.463887]}
        zoom={13}
        onzoomend={(d) => setZoom(d.target.getZoom())}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SVGOverlay
          bounds={[
            [-1.445833 - 0.1, -48.463887 - 0.1],
            [-1.445833 + 0.1, -48.463887 + 0.1],
          ]}
        >
          <Overlay bairros={bairros.flatMap((b) => b.features)} />
        </SVGOverlay>
      </Map>
      <p> Geocoding provided by the Nominatim API</p>
    </div>
  );
}

export default App;

/**
 * 
 * <Marker
          key={point.properties.place_id}
          position={[
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
          ]}
        />
 * 
const bairros: string[] = [
  "Sacramenta",
  "Reduto",
  "Pedreira",
  "Telégrafo",
  "Marco",
  "Umarizal",
  "Fátima",
  "Reduto",
  "Campina",
  "Nazare",
  "Batista%20Campos",
  "Jurunas",
  "Condor",
  "Guamá",
  "Curió-Utinga",
];
 * To fetch the data:
 * const [bairrosJson, setBairrosJson] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      const jsons = [];
      for (let bairro of bairros) {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search/${bairro},Belem,Para,Brasil?&format=geojson&polygon_geojson=1`,
          {
            cache: "force-cache",
          }
        );
        const json = await res.json();
        jsons.push(json);
      }
      setBairrosJson(jsons);
    };
    fetchData();
  }, []);
 * 
 */
